var snowStorm = null;

function SnowStorm() {
  this.flakesMax = 200;
  this.flakesMaxActive = 60;
  this.animationInterval = 30;
  this.flakeBottom = null;
  this.targetElement = null;
  this.followMouse = false;
  this.snowColor = '#f5f5f5';
  this.snowCharacter = '&bull;';
  this.snowStick = true;
  this.useMeltEffect = true;
  this.useTwinkleEffect = false;
  this.usePositionFixed = false;
  this.flakeWidth = 8;
  this.flakeHeight = 8;
  this.vMaxX = 5;
  this.vMaxY = 4;
  this.zIndex = 0;

  var s = this;
  this.timers = [];
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  var screenX = null;
  var screenY = null;
  var scrollY = null;
  var vRndX = null;
  var vRndY = null;

  function rnd(n, min) {
    return (Math.random() * n) + (min || 0);
  }

  function plusMinus(n) {
    return (parseInt(rnd(2), 10) == 1 ? n * -1 : n);
  }

  this.randomizeWind = function() {
    vRndX = plusMinus(rnd(s.vMaxX, 0.5));
    vRndY = rnd(s.vMaxY, 0.5);
  };

  this.resizeHandler = function() {
    screenX = window.innerWidth;
    screenY = window.innerHeight;
  };

  this.SnowFlake = function(parent, type, x, y) {
    var s = this;
    this.x = x || parseInt(rnd(screenX), 10);
    this.y = (!isNaN(y) ? y : -rnd(screenY) - 12);
    this.vX = null;
    this.vY = null;
    this.active = 1;
    this.o = document.createElement('div');
    this.o.innerHTML = parent.snowCharacter;
    this.o.style.color = parent.snowColor;
    this.o.style.position = 'absolute';
    this.o.style.width = parent.flakeWidth + 'px';
    this.o.style.height = parent.flakeHeight + 'px';
    this.o.style.fontSize = '16px';
    this.o.style.pointerEvents = 'none';
    this.o.style.userSelect = 'none';
    this.o.style.zIndex = parent.zIndex;
    this.o.style.opacity = '0.8';

    this.refresh = function() {
      this.o.style.left = this.x + 'px';
      this.o.style.top = this.y + 'px';
    };

    this.move = function() {
      this.x += this.vX;
      this.y += this.vY;
      if (this.y >= screenY) {
        this.recycle();
      }
      this.refresh();
    };

    this.setVelocities = function() {
      this.vX = plusMinus(rnd(parent.vMaxX * 0.3, 0.1));
      this.vY = vRndY + rnd(parent.vMaxY * 0.3, 0.1);
    };

    this.recycle = function() {
      this.x = parseInt(rnd(screenX), 10);
      this.y = -parent.flakeHeight;
      this.setVelocities();
      this.refresh();
    };

    this.setVelocities();
    this.refresh();
    document.body.appendChild(this.o);
  };

  this.snow = function() {
    for (var i = s.flakes.length; i--;) {
      if (s.flakes[i].active === 1) {
        s.flakes[i].move();
      }
    }
  };

  this.createSnow = function(limit) {
    for (var i = 0; i < limit; i++) {
      s.flakes[s.flakes.length] = new s.SnowFlake(s, parseInt(rnd(6), 10));
    }
  };

  this.init = function() {
    s.randomizeWind();
    s.createSnow(s.flakesMax);
    window.addEventListener('resize', s.resizeHandler);
    s.resizeHandler();
    setInterval(s.snow, s.animationInterval);
  };

  this.start = function() {
    s.init();
    s.active = true;
  };
}

snowStorm = new SnowStorm();
snowStorm.start();
