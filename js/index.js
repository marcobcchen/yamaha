"use strict";$((function(){var e,a,t=!0,o=0,l=0,i=null,s=null,n=$(".map"),c=$(".city");function r(){o=$(window).innerWidth(),l=$(window).innerHeight();var e=2.15*$(".ratio-container").innerHeight();$(".ratio-container").css({width:e}),function(){var e=o,a=l-(o<992?40:80),t=.5*(e-c.innerWidth()),i=.5*(a-c.innerHeight());n.stop().scrollTo({top:"50%",left:"50%"},800),e>c.innerWidth()?c.css({left:t}):c.css({left:"auto"});a>c.innerHeight()?c.css({top:i}):c.css({top:"auto"})}()}function p(){i=localStorage.getItem("bikeType"),s=localStorage.getItem("bikeColor"),console.log("重設車款：".concat(i,", 車色：").concat(s));for(var o=1;o<=9;o++){var l=$(".bike-road-"+o).data("path");$(".bike-road-"+o+" img").attr("src","images/bike_".concat(i,"_").concat(s,"_").concat(l,".png"))}var n,c;t&&(t=!1,n=.6,(c=new TimelineMax).to($(".bike-road-1"),.5,{y:0,alpha:1,ease:Bounce.easeOut,delay:2}),c.to($(".bike-road-1"),1*n,{left:"42.6%",top:"69.6%",ease:Linear.easeNone}),c.to($(".bike-road-1"),0,{alpha:0}),c.addLabel("restart"),c.to($(".bike-road-2"),0,{alpha:1}),c.to($(".bike-road-2"),7*n,{left:"61.6%",top:"46.6%",ease:Linear.easeNone}),c.to($(".bike-road-2"),0,{alpha:0}),c.to($(".bike-road-3"),0,{alpha:1}),c.addCallback((function(){a.seek("start").play()})),c.to($(".bike-road-3"),2.5*n,{left:"55.5%",top:"38%",ease:Linear.easeNone}),c.to($(".bike-road-3"),0,{alpha:0}),c.to($(".bike-road-4"),0,{alpha:1}),c.to($(".bike-road-4"),2.5*n,{left:"61.8%",top:"29.2%",ease:Linear.easeNone}),c.to($(".bike-road-4"),0,{alpha:0}),c.to($(".bike-road-5"),0,{alpha:1}),c.to($(".bike-road-5"),1*n,{left:"60%",top:"26%",ease:Linear.easeNone}),c.to($(".bike-road-5"),0,{alpha:0}),c.to($(".bike-road-6"),0,{alpha:1}),c.addCallback((function(){e.seek("start").play()})),c.to($(".bike-road-6"),2.5*n,{left:"52.8%",top:"34%",ease:Linear.easeNone}),c.to($(".bike-road-6"),0,{alpha:0}),c.to($(".bike-road-7"),0,{alpha:1}),c.to($(".bike-road-7"),1*n,{left:"49.8%",top:"31%",ease:Linear.easeNone}),c.to($(".bike-road-7"),0,{alpha:0}),c.to($(".bike-road-8"),0,{alpha:1}),c.to($(".bike-road-8"),7*n,{left:"30.9%",top:"53.9%",ease:Linear.easeNone}),c.to($(".bike-road-8"),0,{alpha:0}),c.to($(".bike-road-9"),0,{alpha:1}),c.to($(".bike-road-9"),5*n,{left:"42.6%",top:"69.6%",ease:Linear.easeNone}),c.to($(".bike-road-9"),0,{alpha:0}),c.addCallback((function(){c.seek("restart").play()})))}function d(){$(".select-bike .step-1 li").removeClass("active"),$(".select-bike .step-2 li").removeClass("active"),$(".select-bike .step-1").css("display","flex"),$(".select-bike .step-2").css("display","none"),$(".select-bike .step-2 ul").css("display","none"),TweenMax.set($(".select-bike .select-container"),{scale:.5,autoAlpha:0}),TweenMax.to($(".select-bike .select-container"),.5,{scale:1,autoAlpha:1,ease:Back.easeOut,delay:.4}),TweenMax.to($(".select-bike"),.3,{autoAlpha:1,delay:.1})}$(window).on("resize",r),r(),i=localStorage.getItem("bikeType"),s=localStorage.getItem("bikeColor"),console.log("車款：",i),console.log("車色：",s),i&&s?p():d(),function(){function e(){$(".menu").toggleClass("open"),$("nav").toggleClass("open")}$(".menu").on("click",(function(a){a.preventDefault(),e()})),$(".logo").on("click",(function(e){e.preventDefault(),localStorage.clear()})),$(".btn-change-color").on("click",(function(a){a.preventDefault(),e(),d()}))}(),$(".select-bike .step-1 li").on("click",(function(){$(".select-bike .step-1 li").removeClass("active"),$(this).addClass("active")})),$(".select-bike .step-2 li").on("click",(function(){$(".select-bike .step-2 li").removeClass("active"),$(this).addClass("active")})),$(".select-bike .step-1 a").on("click",(function(e){e.preventDefault();var a=$(".select-bike .step-1").find(".active").index();localStorage.setItem("bikeType",a),a<0?alert("請選擇您的愛車！"):($(".select-bike .step-1").css("display","none"),$(".select-bike .step-2").css("display","flex"),$(".select-bike .talk-1").css("display","none"),$(".select-bike .talk-2").css("display","block"),0==a?$(".select-bike .step-2 .color-1").css("display","flex"):$(".select-bike .step-2 .color-2").css("display","flex"))})),$(".select-bike .step-2 a").on("click",(function(e){e.preventDefault();var a=$(".select-bike .step-2").find(".active").index();localStorage.setItem("bikeColor",a),a<0?alert("請選擇愛車顏色！"):(TweenMax.to($(".select-bike .select-container"),.5,{scale:.5,autoAlpha:0,ease:Back.easeIn}),TweenMax.to($(".select-bike"),.3,{autoAlpha:0,delay:.3})),p()})),TweenMax.set($(".bike-road-1"),{left:"40.6%",top:"67%",y:-10,alpha:0}),TweenMax.set($(".bike-road-2"),{alpha:0}),TweenMax.set($(".bike-road-3"),{alpha:0}),TweenMax.set($(".bike-road-4"),{alpha:0}),TweenMax.set($(".bike-road-5"),{alpha:0}),TweenMax.set($(".bike-road-6"),{alpha:0}),TweenMax.set($(".bike-road-7"),{alpha:0}),TweenMax.set($(".bike-road-8"),{alpha:0}),TweenMax.set($(".bike-road-9"),{alpha:0}),function(){TweenMax.set($(".car-r"),{alpha:0});var a=.8;(e=new TimelineMax({paused:!0})).addLabel("start"),e.to($(".car-l"),5*a,{left:"52.6%",top:"36%",ease:Linear.easeNone}),e.to($(".car-l"),0,{alpha:0}),e.to($(".car-r"),0,{alpha:1}),e.to($(".car-r"),5*a,{left:"79.8%",top:"1.6%",ease:Linear.easeNone})}(),function(){TweenMax.set($(".bus-t"),{alpha:0});var e=.8;(a=new TimelineMax({paused:!0})).addLabel("start"),a.to($(".bus-r"),3*e,{left:"27%",top:"39.6%",ease:Linear.easeNone}),a.to($(".bus-r"),0,{alpha:0}),a.to($(".bus-t"),0,{alpha:1}),a.addCallback((function(){$(".building-community").css("zIndex",54)})),a.to($(".bus-t"),10*e,{left:"78.8%",top:"100%",ease:Linear.easeNone}),a.addCallback((function(){$(".building-community").css("zIndex",70)}))}()}));