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

  function init(){
    $(window).on('resize', onResize);
    onResize();

    lsBikeType = localStorage.getItem('bikeType');
    lsBikeColor = localStorage.getItem('bikeColor');

    console.log('車款：', lsBikeType);
    console.log('車色：', lsBikeColor);

    if(!lsBikeType || !lsBikeColor){
      openSelectBike();
    }else{
      initBikeColor();
    }
    
    initNav();
    initSelectBike();
    initBikeAnimate();
    initCarAnimate();
    initBusAnimate();
  }
  init();
  
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

    $('.logo').on('click', function(e){
      e.preventDefault();
      localStorage.clear();
    });

    $('.btn-change-color').on('click', function(e){
      e.preventDefault();
      switchNav();
      openSelectBike();
    });

    function switchNav(){
      $('.menu').toggleClass('open');
      $('nav').toggleClass('open');
    }
  }

  function initBikeColor(){
    lsBikeType = localStorage.getItem('bikeType');
    lsBikeColor = localStorage.getItem('bikeColor');
    console.log(`重設車款：${lsBikeType}, 車色：${lsBikeColor}`);

    for(let i=1; i<=9; i++){
      let path = $('.bike-road-' + i).data('path');
      $('.bike-road-' + i + ' img').attr('src', `images/bike_${lsBikeType}_${lsBikeColor}_${path}.png`);
    }

    if(isFirstTime){
      isFirstTime = false;
      playBikeAnimate();
    }
  }

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
      localStorage.setItem('bikeType', step1)
      
      if(step1 < 0){
        alert('請選擇您的愛車！');
      } else {
        $('.select-bike .step-1').css('display', 'none');
        $('.select-bike .step-2').css('display', 'flex');

        $('.select-bike .talk-1').css('display', 'none');
        $('.select-bike .talk-2').css('display', 'block');

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

      if(step2 < 0){
        alert('請選擇愛車顏色！');
      } else {
        TweenMax.to($('.select-bike .select-container'), 0.5, {scale: 0.5, autoAlpha: 0, ease: Back.easeIn});
        TweenMax.to($('.select-bike'), 0.3, {autoAlpha: 0, delay: 0.3});
      }

      initBikeColor();
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
    tl_car.to($('.car-l'), 5 * addSpeed, {left: '52.6%', top: '36%', ease: Linear.easeNone});
    tl_car.to($('.car-l'), 0, {alpha: 0});
    tl_car.to($('.car-r'), 0, {alpha: 1});
    tl_car.to($('.car-r'), 5 * addSpeed, {left: '79.8%', top: '1.6%', ease: Linear.easeNone});
  }

  // 設置巴士動畫
  function initBusAnimate(){
    TweenMax.set($('.bus-t'), {alpha: 0});

    let addSpeed = 0.8;
    tl_bus = new TimelineMax({paused: true});

    tl_bus.addLabel('start');
    tl_bus.to($('.bus-r'), 3 * addSpeed, {left: '27%', top: '39.6%', ease: Linear.easeNone});
    tl_bus.to($('.bus-r'), 0, {alpha: 0});
    tl_bus.to($('.bus-t'), 0, {alpha: 1});
    tl_bus.addCallback(function(){
      $('.building-community').css('zIndex', 54);
    });
    tl_bus.to($('.bus-t'), 10 * addSpeed, {left: '78.8%', top: '100%', ease: Linear.easeNone});
    tl_bus.addCallback(function(){
      $('.building-community').css('zIndex', 70);
    });
  }

  // 播放機車動畫
  function playBikeAnimate(){
    let addSpeed = 0.6;
    let tl = new TimelineMax();

    tl.to($('.bike-road-1'), 0.5, {y: 0, alpha: 1, ease: Bounce.easeOut, delay: 2});
    tl.to($('.bike-road-1'), 1 * addSpeed, {left: '42.6%', top: '69.6%', ease: Linear.easeNone});
    tl.to($('.bike-road-1'), 0, {alpha: 0});
    tl.addLabel('restart');
    tl.to($('.bike-road-2'), 0, {alpha: 1});
    tl.to($('.bike-road-2'), 7 * addSpeed, {left: '61.6%', top: '46.6%', ease: Linear.easeNone});
    tl.to($('.bike-road-2'), 0, {alpha: 0});
    tl.to($('.bike-road-3'), 0, {alpha: 1});
    tl.addCallback(function(){
      // 播放巴士動畫
      tl_bus.seek('start').play();
    });
    tl.to($('.bike-road-3'), 2.5 * addSpeed, {left: '55.5%', top: '38%', ease: Linear.easeNone});
    tl.to($('.bike-road-3'), 0, {alpha: 0});
    tl.to($('.bike-road-4'), 0, {alpha: 1});
    tl.to($('.bike-road-4'), 2.5 * addSpeed, {left: '61.8%', top: '29.2%', ease: Linear.easeNone});
    tl.to($('.bike-road-4'), 0, {alpha: 0});
    tl.to($('.bike-road-5'), 0, {alpha: 1});
    tl.to($('.bike-road-5'), 1 * addSpeed, {left: '60%', top: '26%', ease: Linear.easeNone});
    tl.to($('.bike-road-5'), 0, {alpha: 0});
    tl.to($('.bike-road-6'), 0, {alpha: 1});
    tl.addCallback(function(){
      // 播放汽車動畫
      tl_car.seek('start').play();
    });
    tl.to($('.bike-road-6'), 2.5 * addSpeed, {left: '52.8%', top: '34%', ease: Linear.easeNone});
    tl.to($('.bike-road-6'), 0, {alpha: 0});
    tl.to($('.bike-road-7'), 0, {alpha: 1});
    tl.to($('.bike-road-7'), 1 * addSpeed, {left: '49.8%', top: '31%', ease: Linear.easeNone});
    tl.to($('.bike-road-7'), 0, {alpha: 0});
    tl.to($('.bike-road-8'), 0, {alpha: 1});
    tl.to($('.bike-road-8'), 7 * addSpeed, {left: '30.9%', top: '53.9%', ease: Linear.easeNone});
    tl.to($('.bike-road-8'), 0, {alpha: 0});
    tl.to($('.bike-road-9'), 0, {alpha: 1});
    tl.to($('.bike-road-9'), 5 * addSpeed, {left: '42.6%', top: '69.6%', ease: Linear.easeNone});
    tl.to($('.bike-road-9'), 0, {alpha: 0});
    tl.addCallback(function(){
      tl.seek('restart').play();
    });
  }

});