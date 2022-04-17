$(function(){
  let isFirstTime = true;
  let windowWidth = 0;
  let windowHeight = 0;
  let lsBikeType = null;
  let lsBikeColor = null;

  const _map = $('.map');
  const _city = $('.city');
  let tl_car;
  let tl_bus;
  let tl_talk;

  $.html5Loader({
    filesToLoad: 'assets.json',
    onBeforeLoad: function () {
      init();
    },
    onComplete: function () {
      TweenMax.to($(".loading"), 0.5, {autoAlpha:0, delay:1, onComplete:function(){          
        start();
      }});
    },
    onElementLoaded: function ( obj, elm) {
      //console.log(elm);
    },
    onUpdate: function ( percentage ) {
      console.log(percentage);
    }
  });

  function init(){
    $(window).on('resize', onResize);
    onResize();
    
    initNav();
    initSelectBike();
    initBikeAnimate();
    initCarAnimate();
    initBusAnimate();
    initCityAnimate();
    initPopup();
  }

  function start(){
    lsBikeType = localStorage.getItem('bikeType');
    lsBikeColor = localStorage.getItem('bikeColor');

    console.log('車款：', lsBikeType);
    console.log('車色：', lsBikeColor);

    if(!lsBikeType || !lsBikeColor){
      openSelectBike();
    }else{
      changeBikeColor();
    }
  }
  
  function onResize(){
    windowWidth = $(window).innerWidth();
    windowHeight = $(window).innerHeight();
    // console.log('width:', windowWidth, 'height:', windowHeight);

    // 2800 / 1302 = 2.15
    let ratioWidth = $('.ratio-container').innerHeight() * 2.15;

    $('.ratio-container').css({
      'width': ratioWidth
    });

    scrollToCenter();
  }

  function scrollToCenter(){
    let headerHeight = windowWidth < 992 ? 40 : 80;
    let scrollWidth = windowWidth;
    let scrollHeight = windowHeight - headerHeight;
    let centerX = (scrollWidth - _city.innerWidth()) * 0.5;
    let centerY = (scrollHeight - _city.innerHeight()) * 0.5;

    _map.stop().scrollTo({top:'50%', left:'50%'}, 800);

    if(scrollWidth > _city.innerWidth()){
      _city.css({'left': centerX});
    }else{
      _city.css({'left': 'auto'});
    }

    if(scrollHeight > _city.innerHeight()){
      _city.css({'top': centerY});
    }else{
      _city.css({'top': 'auto'});
    }
  }

  function initNav(){
    $('.menu').on('click', function(e){
      e.preventDefault();
      switchNav();
    });

    // $('.logo').on('click', function(e){
    //   e.preventDefault();
    //   localStorage.clear();
    // });

    $('.btn-change-color').on('click', function(e){
      e.preventDefault();
      switchNav();
      openSelectBike();
    });

    $('.navigate a').on('click', function(e){
      clickPopup($(this), e);
      switchNav();
    })

    function switchNav(){
      $('.menu').toggleClass('open');
      $('nav').toggleClass('open');
    }
  }

  function clickPopup(ele, e){
    var popup = ele.data('popup');

    if(popup){
      e.preventDefault();
      // console.log(popup);
      $('.popup').toggleClass('open');

      if(popup == "good_home"){
        playPopupGoodHome();
      }else{
        scrollToCenter();

        $('.popup-basic .pic').css('display', 'none');
        $('.popup-basic .pic-'+lsBikeType+'-'+popup).css('display', 'block');

        $('.popup-basic .des').css('display', 'none');
        $('.popup-basic .des-'+lsBikeType+'-'+popup).css('display', 'block');

        TweenMax.set($('.popup-basic'),  {scale: 0.5, autoAlpha: 0});
        TweenMax.to($('.popup-basic'), 0.5, {scale: 1, autoAlpha: 1, ease: Back.easeOut, delay: 0.4});
      }
    }
  }

  // 改變車款、顏色
  function changeBikeColor(){
    console.log(`重設車款：${lsBikeType}, 車色：${lsBikeColor}`);

    for(let i=1; i<=9; i++){
      let path = $('.bike-road-' + i).data('path');
      $('.bike-road-' + i + ' img').attr('src', `images/bike_${lsBikeType}_${lsBikeColor}_${path}.png`);
    }

    // 選單上的車色
    $('header .btn-change-color .pic img').attr('src', `images/bike_${lsBikeType}_${lsBikeColor}_t.png`)

    if(isFirstTime){
      isFirstTime = false;

      playCityAnimate();
      playBikeAnimate();
    }
  }

  // 選擇車款、顏色
  function initSelectBike(){
    $('.select-bike .step-1 li').on('click', function(){
      $('.select-bike .step-1 li').removeClass('active');
      $(this).addClass('active');
    });

    $('.select-bike .step-2 li').on('click', function(){
      $('.select-bike .step-2 li').removeClass('active');
      $(this).addClass('active');
    });

    $('.select-bike .step-1 a').on('click', function(e){
      e.preventDefault();

      let step1 = $('.select-bike .step-1').find('.active').index();
      localStorage.setItem('bikeType', step1);
      lsBikeType = step1;
      
      if(step1 < 0){
        alert('請選擇您的愛車！');
      } else {
        $('.select-bike .step-1').css('display', 'none');
        $('.select-bike .step-2').css('display', 'flex');

        // $('.select-bike .talk-1').css('display', 'none');
        // $('.select-bike .talk-2').css('display', 'block');

        if(step1 == 0){
          $('.select-bike .step-2 .color-1').css('display', 'flex');
        }else{
          $('.select-bike .step-2 .color-2').css('display', 'flex');
        }
      }
    });

    $('.select-bike .step-2 a').on('click', function(e){
      e.preventDefault();

      let step2 = $('.select-bike .step-2').find('.active').index();
      localStorage.setItem('bikeColor', step2);
      lsBikeColor = step2;

      if(step2 < 0){
        alert('請選擇愛車顏色！');
      } else {
        TweenMax.to($('.select-bike .select-container'), 0.5, {scale: 0.5, autoAlpha: 0, ease: Back.easeIn});
        TweenMax.to($('.select-bike'), 0.3, {autoAlpha: 0, delay: 0.3});

        tl_talk.seek('start').pause();
      }

      changeBikeColor();
    });

    tl_talk = new TimelineMax({paused: true});
    tl_talk.addLabel('start');
    tl_talk.fromTo($('.man-talk .man-1'), 0.3, {alpha: 0, y: 10}, {alpha: 1, y: 0, ease: Back.easeIn, delay: 0.5});
    tl_talk.fromTo($('.man-talk .talk-1'), 0.6, {alpha: 0, x: -10}, {alpha: 1, x: 0, ease: Back.easeOut});
    tl_talk.to($('.man-talk .man-1'), 0.3, {alpha: 0, y: 10, ease: Back.easeIn, delay: 2});
    tl_talk.to($('.man-talk .talk-1'), 0.3, {alpha: 0, x: -10, ease: Back.easeOut, delay: -0.3});
    tl_talk.fromTo($('.man-talk .man-2'), 0.3, {alpha: 0, y: 10}, {alpha: 1, y: 0, ease: Back.easeIn});
    tl_talk.fromTo($('.man-talk .talk-2'), 0.6, {alpha: 0, x: 10}, {alpha: 1, x: 0, ease: Back.easeOut});
    tl_talk.to($('.man-talk .man-2'), 0.3, {alpha: 0, y: 10, ease: Back.easeIn, delay: 2});
    tl_talk.to($('.man-talk .talk-2'), 0.3, {alpha: 0, x: 10, ease: Back.easeOut, delay: -0.3});
    tl_talk.addCallback(function(){
      // 播放汽車動畫
      tl_talk.seek('start').play();
    });
  }

  function openSelectBike(){
    $('.select-bike .step-1 li').removeClass('active');
    $('.select-bike .step-2 li').removeClass('active');
    $('.select-bike .step-1').css('display', 'flex');
    $('.select-bike .step-2').css('display', 'none');
    $('.select-bike .step-2 ul').css('display', 'none');

    TweenMax.set($('.select-bike .select-container'),  {scale: 0.5, autoAlpha: 0});
    TweenMax.to($('.select-bike .select-container'), 0.5, {scale: 1, autoAlpha: 1, ease: Back.easeOut, delay: 0.4});
    TweenMax.to($('.select-bike'), 0.3, {autoAlpha: 1, delay: 0.1});

    tl_talk.seek('start').play();
  }

  // 設置 popup
  function initPopup(){
    $('.flag').on('click', function(e){
      clickPopup($(this), e);
    });

    $('.popup-basic .btn-close').on('click', function(){
        TweenMax.to($('.popup-basic'), 0.5, {scale: 0.5, autoAlpha: 0, ease: Back.easeOut, onComplete: function(){
        $('.popup').toggleClass('open');
      }});
    });

    $('.popup-good-home .btn-close').on('click', function(){
      closePopupGoodHome();
    });
  }

  // play popup good home
  function playPopupGoodHome(){
    TweenMax.set($('.popup-good-home .man-1'), {autoAlpha: 0, scale: 0.5});
    TweenMax.set($('.popup-good-home .man-2'), {autoAlpha: 0, scale: 0.5});
    TweenMax.set($('.popup-good-home .man-3'), {autoAlpha: 0, scale: 0.5});
    TweenMax.set($('.popup-good-home .man-4'), {autoAlpha: 0, scale: 0.5});
    TweenMax.set($('.popup-good-home .man-5'), {autoAlpha: 0, scale: 0.5});
    TweenMax.set($('.popup-good-home .man-talk'), {autoAlpha: 0, scale: 0.5, y: 20});
    TweenMax.set($('.popup-good-home .btn-close'), {autoAlpha: 0, scale: 0.5});

    TweenMax.to($('.popup-good-home .man-1'), 0.1, {autoAlpha: 1, scale: 1, delay: 0.05, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-2'), 0.1, {autoAlpha: 1, scale: 1, delay: 0.05, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-3'), 0.1, {autoAlpha: 1, scale: 1, delay: 0.07, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-4'), 0.1, {autoAlpha: 1, scale: 1, delay: 0.09, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-5'), 0.1, {autoAlpha: 1, scale: 1, delay: 0.09, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-talk'), 0.3, {autoAlpha: 1, scale: 1, y: 0, delay: 0.2, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .btn-close'), 0.3, {autoAlpha: 1, scale: 1, delay: 0.25, ease: Back.easeOut});
  }

  // close popup good home
  function closePopupGoodHome(){
    TweenMax.to($('.popup-good-home .man-1'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-2'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-3'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-4'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-5'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .man-talk'), 0.3, {autoAlpha: 0, scale: 0.5, y: 20, ease: Back.easeOut});
    TweenMax.to($('.popup-good-home .btn-close'), 0.3, {autoAlpha: 0, scale: 0.5, ease: Back.easeOut, onComplete: function(){
      $('.popup').toggleClass('open');
    }});
  }

  // 設置機車動畫
  function initBikeAnimate(){
    TweenMax.set($('.bike-road-1'), {left: '40.6%', top: '67%', y: -10, alpha: 0});
    TweenMax.set($('.bike-road-2'), {alpha: 0});
    TweenMax.set($('.bike-road-3'), {alpha: 0});
    TweenMax.set($('.bike-road-4'), {alpha: 0});
    TweenMax.set($('.bike-road-5'), {alpha: 0});
    TweenMax.set($('.bike-road-6'), {alpha: 0});
    TweenMax.set($('.bike-road-7'), {alpha: 0});
    TweenMax.set($('.bike-road-8'), {alpha: 0});
    TweenMax.set($('.bike-road-9'), {alpha: 0});
  }

  // 設置汽車動畫
  function initCarAnimate(){
    TweenMax.set($('.car-r'), {alpha: 0});

    let addSpeed = 0.8;
    tl_car = new TimelineMax({paused: true});
    
    tl_car.addLabel('start');
    tl_car.to($('.car-l'), 10 * addSpeed, {left: '52.6%', top: '36%', ease: Linear.easeNone});
    tl_car.to($('.car-l'), 0, {alpha: 0});
    tl_car.to($('.car-r'), 0, {alpha: 1});
    tl_car.to($('.car-r'), 10 * addSpeed, {left: '79.8%', top: '1.6%', ease: Linear.easeNone});
  }

  // 設置巴士動畫
  function initBusAnimate(){
    TweenMax.set($('.bus-t'), {alpha: 0});

    let addSpeed = 1.2;
    tl_bus = new TimelineMax({paused: true});

    tl_bus.addLabel('start');
    tl_bus.to($('.bus-r'), 6 * addSpeed, {left: '27%', top: '39.6%', ease: Linear.easeNone});
    tl_bus.to($('.bus-r'), 0, {alpha: 0});
    tl_bus.to($('.bus-t'), 0, {alpha: 1});
    tl_bus.addCallback(function(){
      $('.building-community').css('zIndex', 54);
      $('.farm-house-2').css('zIndex', 56);
    });
    tl_bus.to($('.bus-t'), 16 * addSpeed, {left: '78.4%', top: '100%', ease: Linear.easeNone});
  }

  // 播放機車動畫
  function playBikeAnimate(){
    let addSpeed = 0.9;
    let tl = new TimelineMax();

    tl.to($('.bike-road-1'), 0.5, {y: 0, alpha: 1, ease: Bounce.easeOut, delay: 2});
    tl.to($('.bike-road-1'), 1 * addSpeed, {left: '42.8%', top: '69.6%', ease: Linear.easeNone});
    tl.to($('.bike-road-1'), 0, {alpha: 0});
    tl.addLabel('restart');
    tl.addCallback(function(){
      $('.building-community').css('zIndex', 70);
    });
    tl.to($('.bike-road-2'), 0, {alpha: 1});
    tl.to($('.bike-road-2'), 7 * addSpeed, {left: '61.2%', top: '46.6%', ease: Linear.easeNone});
    
    tl.to($('.bike-road-2'), 0, {alpha: 0});
    tl.to($('.bike-road-3'), 0, {alpha: 1});
    tl.addCallback(function(){
      // 播放巴士動畫
      tl_bus.seek('start').play();
    });
    tl.to($('.bike-road-3'), 2.5 * addSpeed, {left: '55.9%', top: '38%', ease: Linear.easeNone});
    tl.to($('.bike-road-3'), 0, {alpha: 0});
    tl.to($('.bike-road-4'), 0, {alpha: 1});
    tl.to($('.bike-road-4'), 2.5 * addSpeed, {left: '61.4%', top: '29.2%', ease: Linear.easeNone});
    tl.to($('.bike-road-4'), 0, {alpha: 0});
    tl.to($('.bike-road-5'), 0, {alpha: 1});
    tl.to($('.bike-road-5'), 1 * addSpeed, {left: '60.4%', top: '26%', ease: Linear.easeNone});
    tl.to($('.bike-road-5'), 0, {alpha: 0});
    tl.to($('.bike-road-6'), 0, {alpha: 1});
    tl.addCallback(function(){
      // 播放汽車動畫
      tl_car.seek('start').play();
    });
    tl.to($('.bike-road-6'), 2.5 * addSpeed, {left: '52.3%', top: '33.8%', ease: Linear.easeNone});
    tl.to($('.bike-road-6'), 0, {alpha: 0});
    tl.to($('.bike-road-7'), 0, {alpha: 1});
    tl.to($('.bike-road-7'), 1 * addSpeed, {left: '50.2%', top: '31%', ease: Linear.easeNone});
    tl.to($('.bike-road-7'), 0, {alpha: 0});
    tl.to($('.bike-road-8'), 0, {alpha: 1});
    tl.addCallback(function(){
      $('.farm-house-2').css('zIndex', 10);
    });
    tl.to($('.bike-road-8'), 7 * addSpeed, {left: '30.5%', top: '53.5%', ease: Linear.easeNone});
    tl.to($('.bike-road-8'), 0, {alpha: 0});
    tl.to($('.bike-road-9'), 0, {alpha: 1});
    tl.to($('.bike-road-9'), 5 * addSpeed, {left: '42.8%', top: '69.6%', ease: Linear.easeNone});
    tl.to($('.bike-road-9'), 0, {alpha: 0});
    tl.addCallback(function(){
      tl.seek('restart').play();
    });
  }

  // 設置機車動畫
  function initCityAnimate(){
    var buildingY = 20;
    TweenMax.set($('.building-center'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-school'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-ysp'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-stadium'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-cinemas'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-gas-station'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-mall'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-community'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-street'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-good-home'), {autoAlpha: 0, y: buildingY});
    TweenMax.set($('.building-store'), {autoAlpha: 0, y: buildingY});

    TweenMax.set($('.flag'), {autoAlpha: 0, y: -50});
    TweenMax.set($('.flag-main'), {autoAlpha: 0, y: -50});
  }

  // 播放進場動畫
  function playCityAnimate(){
    TweenMax.to($('.building-center'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.1});
    TweenMax.to($('.building-school'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.2});
    TweenMax.to($('.building-ysp'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.3});
    TweenMax.to($('.building-stadium'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.4});
    TweenMax.to($('.building-cinemas'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.5});
    TweenMax.to($('.building-gas-station'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.6});
    TweenMax.to($('.building-mall'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.7});
    TweenMax.to($('.building-community'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.8});
    TweenMax.to($('.building-street'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 0.9});
    TweenMax.to($('.building-good-home'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 1});
    TweenMax.to($('.building-store'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 1.1});

    TweenMax.to($('.flag'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 1.3});
    TweenMax.to($('.flag-main'), 0.6, {autoAlpha: 1, y: 0, ease: Back.easeOut, delay: 1.5});
  }

});