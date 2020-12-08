$(function(){
	var ieTest = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		imgURL = "http://img.khan.co.kr/spko/storytelling/2020/massmedia/",
		isMobile = screenWidth <= 800 && true || false,
		isNotebook = (screenWidth <= 1300 && screenHeight < 750) && true || false,
		isMobileLandscape = ( screenWidth > 400 && screenWidth <= 800 && screenHeight < 450 ) && true || false;
	window.onbeforeunload = function(){ window.scrollTo(0, 0) ;}
	var randomRange = function(n1, n2) {
		return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
	};
	$(window).resize(function() {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
		checkIfProgressOverflow(screenWidth);
    });


	$(".close-ie-block").on("click", function(){
		$(".ie-block-9").hide();
	})


	function checkIfProgressOverflow(sw){
		if(sw<1200){
			$(".fixed-navi").stop().animate({"opacity":"0.2", "z-index":"-1"}, 300);

		}else{
			$(".fixed-navi").stop().animate({"opacity":"1","z-index":"99"}, 300);
		}
	}

    var ieUnder = false;
    function checkIe(){ 
        var word; 
        if (navigator.userAgent.indexOf("MSIE") >= 0) {
            console.log("ieUNDER 10");
            ieUnder = true;
            return true;
        }else {
            return false;
        }
    } 
    checkIe();

	var titleAniDone = false; 
	function activTitlePathAni(){
		var $titlePath = $(".story-title .title-main .title-svg svg path");
		//$(".story-top-graphic .cover-shadow").animate({"opacity":"0.2"},2000);
		for(t=0; t<$titlePath.length;t++){
			$titlePath.eq(t).delay(t*50).animate({"stroke-dashoffset":"0", "fill-opacity":"1"}, 4500);
			if(t == $titlePath.length-1){
				titleAniDone = true;
			}
		};
	
	}
	function activeIntroPathAni(){
		var $introPath = $(".intro-path-ani path");
		for(i=0; i<$introPath.length;i++){
			$introPath.eq(i).animate({"stroke-dashoffset":"0"}, 3000);
			if(i ==$introPath.length-1 ){
				$(".story-header-line-deco .line-vertical").animate({"height":"100%"}, 2000);
				$(".story-header-line-deco .line-horizontal .line-body").animate({"width":"100%"}, 2000);
			}
		};
	}

	/********progress********/
	var progressBar = {
		progressStatus : false,
		showProgress : function(){
			$(".fixed-navi").stop().animate({"right":"10px"},500);
		},
		hideProgress : function(){
			$(".fixed-navi").stop().animate({"right":"-200px"},500);
		},
		setProgress : function(sc){
			var fullProgress = $(document).height()-$(window).height()-( $(".footer-area").height()+$(".digital-list").height() +$(".common-footer").height());
			var ScrollPer = (sc/fullProgress)*100;
			if( (sc<$(".sec--01").offset().top || sc > fullProgress) && (this.progressStatus == true)){
				this.progressStatus = false;
				this.hideProgress();
			}else if((sc>=$(".sec--01").offset().top && sc <= fullProgress) && (this.progressStatus == false) ){
				this.progressStatus = true;
				this.showProgress();
			}

			if(isMobile==true){
				$(".progress").css({"width":ScrollPer+"%"});
			}else {
				$(".progress").css({"height":ScrollPer+"%"});
			}

		}
	}
	/********progress********/

	/*******Video Slider function******/
	var nowScroll;
	var videoSlider = {
		videoStatus : "before",
		sliderBody : $(".fixed-slider-video-area"),
		videoEndPoint : function(){
			return (this.sliderBody.offset().top + this.sliderBody.height()-screenHeight);
		},
		checkVideoStatus : function(sc){
			if( sc >= this.sliderBody.offset().top && sc < this.videoEndPoint() ){
				return "on";
			}else if( sc < this.sliderBody.offset().top ){
				return "before"
			}else if( sc >= this.videoEndPoint() ){
				return "after";
			}
		},
		adjustVideoHolder :  function(){
			//console.log(this.videoStatus);
			var $fixedEl = this.sliderBody.find(".fixed-el");
			if(this.videoStatus == "on"){
				$fixedEl.addClass("fixed-el-fixed");
				$fixedEl.removeClass("fixed-el-bottom");
				this.sliderBody.addClass("sder-bck");
				$(".nav-top").addClass("nav-hide");
			}else if( this.videoStatus == "before"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.removeClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
				$(".nav-top").removeClass("nav-hide");
			}else if( this.videoStatus == "after"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.addClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
				$(".nav-top").removeClass("nav-hide");
			}
		}
	
	}
	/*******Video Slider function******/

	/*********Fised Slider col 2 **********/
	var $fs = $(".fs-a");
	function checkNowStage(sc){
		var now = sc;
		if( now <  $fs.eq(0).offset().top ){
			checkStageValue("bf");
		}else if( now >= $fs.eq($fs.length-1).offset().top+$fs.eq($fs.length-1).height()-screenHeight){
			checkStageValue("aft");
		}else{
			for(p=0; p<$fs.length; p++){
				var eachStart = $fs.eq(p).offset().top,
					eachEnd = $fs.eq(p).offset().top+$fs.eq(p).height()-screenHeight;
				if( now >= eachStart && now < eachEnd ){
					var scIndex = 0;
					if( now<eachStart+screenHeight){
						scIndex = 1;
					}else if(now>=eachStart+screenHeight&&now<eachStart+screenHeight*2){
						scIndex = 2;
					}else if(now>=eachStart+screenHeight*2){
						scIndex = 3;
					}
					checkStageValue( Number(p+1)+"-stage-"+scIndex+"-para");
				}else if( now >= eachEnd && now < $fs.eq(p+1).offset().top ){
					checkStageValue(p+"-btw-"+Number(p+1));
				}
			}
		}
	}

	var nowStage = "bf";
	function checkStageValue(s){
		if(nowStage!==s){
			nowStage = s;
			adjustStage(s);
		}
	};

	function adjustStage(s){
		if(typeof(s)=="string"){
			if(s=="bf"){
				console.log("fsa전");
				$fs.find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.find(".fixed-el").removeClass("fixed-el-bottom");
			}else if(s=="aft"){
				console.log("fsa이후");
				$fs.find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.find(".fixed-el").addClass("fixed-el-bottom");
			}else if(s.indexOf("btw")!==-1){
				var ts = s.split("-");
				console.log(ts[0]+" 사이 "+ts[2]);
				$fs.eq(ts[0]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[0]).find(".fixed-el").addClass("fixed-el-bottom");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-bottom");

			}else if(s.indexOf("stage")!==-1){
				var ts = s.split("-");
				console.log(ts[0]+" 번째 stage의 "+ts[2]+"번째 문단");
				$fs.eq(ts[0]-1).find(".fixed-el").addClass("fixed-el-fixed");
				$fs.eq(ts[0]-1).find(".fixed-el").removeClass("fixed-el-bottom");
				
				if(ts[2]==2){
					$fs.eq(ts[0]-1).find(".fixed-el").find(".item--02").fadeIn();
				}else if(ts[2]==1){
					$fs.eq(ts[0]-1).find(".fixed-el").find(".item--02").fadeOut();
				}
				
			}
		}
	};	
	/*********Fised Slider col 2 **********/


	/******** 모바일 전용 조정 ********/	
	if(isMobile==true){
		
	}else{
      
	}
	/******** 모바일 전용 조정 ********/

	function activataTw(){
		$("#TT_HOLDER_01").twentytwenty();
		$("#TT_HOLDER_02").twentytwenty();
	};

	function init(){
		activTitlePathAni();
		activeIntroPathAni();
		activataTw();
	}

	$(".loading-page").fadeOut(1000, function(){
		init();
	});
	
	var topNavBg = false;
	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
		var nowScrollWithCon = nowScroll+screenHeight*0.6;
		progressBar.setProgress(nowScroll);

		if(topNavBg ==false && nowScroll>=$(".story-body").offset().top){
			topNavBg = true;
			$(".nav-wrap").addClass("nav-with-bg");
		}else if(nowScroll<$(".story-body").offset().top){
			$(".nav-wrap").removeClass("nav-with-bg");
			topNavBg =false;
		}

		if( videoSlider.videoStatus !== videoSlider.checkVideoStatus(nowScroll)){
			videoSlider.videoStatus = videoSlider.checkVideoStatus(nowScroll);
			videoSlider.adjustVideoHolder();
		}

		checkNowStage(nowScroll);

	});


});

function sendSns(s) {
  var url = encodeURIComponent(location.href),
	  txt = encodeURIComponent($("title").html());
  switch (s) {
    case 'facebook':
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
      break;
    case 'twitter':
      window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
      break;
  }
}
