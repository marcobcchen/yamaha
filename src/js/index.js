$(function(){
  // console.log('ready!');
  // let isDrag = true;
  let windowWidth = 0;
  let windowHeight = 0;
  let dragStartPoint = {
    x: 0,
    y: 0
  };
  let dragEndPoint = {
    x: 0,
    y: 0
  };

  const _map = $('.map');
  const _city = $('.city');

  function init(){
    $(window).on('resize', onResize);
    onResize();
    // setCenter();
    // startDrag();

    // scrollToCenter();

    // _map.stop.scrollTo({top:'50%', left:'50%'}, 800);

    setNav();
  }
  init();

  function setNav(){
    $('.menu').on('click', function(e){
      e.preventDefault();
      $(this).toggleClass('open');
      $('nav').toggleClass('open');
    });
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

  function setSafeZone(){

    let cityX = _city.offset().left;
    let leftBorder = 0;
    let rightBorder = windowWidth - _city.innerWidth();
    // console.log(rightBorder);

    // if(_city.innerWidth() < windowWidth) return

    if(cityX > leftBorder){
      _city.css({
        'left': 0
      });
    }
    if(cityX < rightBorder){
      _city.css({
        'left': rightBorder
      });
    }
  }

  function startDrag(){
    // if(isDrag){
    //   $('.city').draggable('enable');
    // }else{
    //   $('.city').draggable('disable');
    // }

    $('.city').draggable();

    $('.city').mousedown(function(e) {
      let x = e.clientX || e.pageX;
      let y = e.clientY || e.pageY;

      dragStartPoint = {
        x: x,
        y: y
      }
    });

    $('.city').mouseup(function(e) {
      let x = e.clientX || e.pageX;
      let y = e.clientY || e.pageY;

      dragEndPoint = {
        x: x,
        y: y
      }


      let direction = checkDirection();
      // console.log(direction);

      let center = checkCenter();
      console.log(center);

      // $('.x-asix').text(center.x);
      // $('.y-asix').text(center.y);
      
      // if(_city.innerWidth() > windowWidth){
      //   setSafeZone();
      // }
      // setSafeZone();
    });
  }

  function checkCenter(){
    let cityX = _city.offset().left;
    let cityY = _city.offset().top;
    let cityCenterX = cityX + (_city.innerWidth() * 0.5);
    let cityCenterY = cityY + (_city.innerHeight() * 0.5);
  
    return {
      x: cityCenterX,
      y: cityCenterY,
    }
  }

  function checkDirection(){
    if(!dragStartPoint.x || !dragEndPoint.x) return;

    let xValue = dragStartPoint.x - dragEndPoint.x;
    let yValue = dragStartPoint.y - dragEndPoint.y;
    let xAsix = '';
    let yAsix = '';

    if(xValue > 0){
      xAsix = 'R';
    }else{
      xAsix = 'L';
    }
    if(yValue > 0){
      yAsix = 'B';
    }else{
      yAsix = 'T';
    }

    return xAsix + yAsix;

    // console.log(`start: ${dragStartPoint.x}, ${dragStartPoint.y}`);
    // console.log(`end: ${dragEndPoint.x}, ${dragEndPoint.y}`);
  }
  
});