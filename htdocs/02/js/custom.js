$(function(){
	var ieTest = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		imgURL = "http://img.khan.co.kr/spko/storytelling/2020/publicdesign/",
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

    function checkIe(){ 
        var agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
            ieTest = true;
          } else {
            ieTest = false;
        }
        console.log(ieTest);
    };

    var ieUnder = false;
    function checkIeUnder(){ 
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
    checkIeUnder();

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
				$(".nav-top").addClass("nav-black");
			}else if( this.videoStatus == "before"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.removeClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
				$(".nav-top").removeClass("nav-black");
			}else if( this.videoStatus == "after"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.addClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
				$(".nav-top").removeClass("nav-black");
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
					var paraLength =  $fs.eq(p).find(".spacer").length-1; // 6
					if( now<eachStart+screenHeight){
						scIndex = 1;
					}else if(now>=eachStart+screenHeight*(paraLength-1)){
						scIndex = paraLength; // 6
					}else{
						for(l=1;l<paraLength-1;l++){ // 2,3,4,5
							if(  now >= eachStart+screenHeight * (l) && now < eachStart+screenHeight * ( l+1) ){
								scIndex = l+1;
							}
						}
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

				$(".nav-top").removeClass("nav-black");
			}else if(s=="aft"){
				console.log("fsa이후");
				$fs.find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.find(".fixed-el").addClass("fixed-el-bottom");

				$(".nav-top").removeClass("nav-black");
			}else if(s.indexOf("btw")!==-1){
				var ts = s.split("-");
				console.log(ts[0]+" 사이 "+ts[2]);
				$fs.eq(ts[0]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[0]).find(".fixed-el").addClass("fixed-el-bottom");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-bottom");

				$(".nav-top").removeClass("nav-black");
			}else if(s.indexOf("stage")!==-1){
				var ts = s.split("-");
				console.log(ts[0]+" 번째 stage의 "+ts[2]+"번째 문단");
				$fs.eq(ts[0]-1).find(".fixed-el").addClass("fixed-el-fixed");
				$fs.eq(ts[0]-1).find(".fixed-el").removeClass("fixed-el-bottom");
				
				/*
				if(ts[2]==2){
					$fs.eq(ts[0]-1).find(".fixed-el").find(".item--02").fadeIn();
				}else if(ts[2]==1){
					$fs.eq(ts[0]-1).find(".fixed-el").find(".item--02").fadeOut();
				}*/
				var fi_el_index = (ts[2]*1)-1;
				var $fi_els = $fs.eq(ts[0]-1).find(".slider-item");

				$fs.eq(ts[0]-1).find(".slider-item:not(:eq("+fi_el_index+"))").stop().animate({"opacity":"0"}, 1000);
				$fi_els.eq(fi_el_index).stop().animate({"opacity":"1"}, 500);

				$(".nav-top").addClass("nav-black");

			}
		}
	};	

	function settingFixedElPos(){
		var $horizon_img = $(".fixed-slider-horizon .slider-item img");
		$horizon_img.each(function(){
			var y = screenHeight*0.5 - $(this).height()*0.5;
			$(this).css({"top": y+"px" });
			console.log(y);
		})
	}

	function settingFixedElOpacity(){
		$(".slider-item").css({"opacity":"0"})
		//$(".slider-item:first").css({"opacity":"1"})
		$(".item--01").css({"opacity":"1"})
	};


	/*********Fised Slider col 2 **********/

	/******** fragments mouse move animate ********/	
	var x = 0;
    var y = 0;
    var mx = 0;
	var my = 0;
    var speed = 0.01;
	var _imgArr;

	function setMouseMoveEventsAfterLoad(){
		_imgArr = document.getElementsByClassName("mousemove_el"); 
		window.addEventListener("mousemove", mouseFunc, false);
		//console.log(_imgArr);

		function mouseFunc(e){
			x = (e.clientX - screenWidth / 2); 
			y = (e.clientY - screenHeight / 2);
		}
		loop();
	};

	function loop(){
		mx += (x - mx) * speed;
		my += (y - my) * speed;

		_imgArr[0].style.transform = "translate("+ (mx/12) +"px," + (my/10) +"px)"; 
		_imgArr[1].style.transform = "translate("+ (mx/10) +"px," + (my/8) +"px)"; 
		_imgArr[2].style.transform = "translate("+ (mx/8) +"px," + (my/6) +"px)"; 
		_imgArr[3].style.transform = "translate("+ (mx/4) +"px," + (my/3) +"px)"; 
		
		_imgArr[4].style.transform = "translate("+ (mx/12) +"px," + (my/8) +"px)"; 

		_imgArr[5].style.transform = "translate("+ (mx/6) +"px," + (my/4) +"px)"; 
		_imgArr[6].style.transform = "translate("+ (mx/7) +"px," + (my/6) +"px)"; 
		_imgArr[7].style.transform = "translate("+ (mx/11) +"px," + (my/8) +"px)"; 
		_imgArr[8].style.transform = "translate("+ (mx/12) +"px," + (my/9) +"px)"; 

		window.requestAnimationFrame(loop);
	}
    /******** fragments mouse move animate ********/	

	

	/******** 교통사고 리스트 ********/
	var accPath = "M28,22.3c0-0.1,0-0.2,0-0.3c0-0.1,0-0.2,0-0.2c0-0.3,0-0.5,0-0.8c0-0.9-0.2-1.7-0.4-2.6c-0.2-0.6-0.6-1.1-0.9-1.7c0-0.1-0.1-0.2-0.2-0.1c-0.1,0-0.1,0.1-0.1,0.2c0,0,0,0,0,0c-0.2,0.7-0.3,1.4-0.4,2.1c0,0.1,0,0.3-0.1,0.4c-0.1,0-0.2-0.2-0.3-0.3c-0.7-0.9-1.4-1.8-2.1-2.7c-0.2-0.2-0.2-0.2-0.4,0c-0.3,0.4-0.6,0.7-0.9,1.1c-0.7,1-1.5,1.9-2.2,2.9c0,0,0,0.1-0.1,0.1c0-0.1,0-0.1,0-0.2c0-1,0-2,0-3c0-0.7,0-1.5,0-2.2c0-0.3-0.1-0.3-0.3-0.2c-1.5,0.7-3,1.4-4.6,2.1c-0.1,0.1-0.3,0.1-0.5,0.2c0-0.1,0-0.1,0.1-0.1c0.8-1.5,1.6-3,2.4-4.5c0.1-0.2,0.1-0.3-0.2-0.3c-0.5-0.1-1-0.2-1.5-0.3c-0.5-0.1-1-0.2-1.5-0.3c-0.4-0.1-0.7-0.1-1.1-0.2c0.1-0.1,0.1-0.1,0.2-0.2c0.6-0.4,1.2-0.9,1.8-1.3c0.1,0,0.1-0.1,0.2-0.2c0-0.1-0.1-0.1-0.2-0.1c-0.5,0-1.1,0-1.6,0c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.7,0-1.4,0-2.2,0c-0.2,0-0.5,0-0.7,0.1c-1.1,0.3-1.9,0.8-2.5,1.8c-0.5,0.8-1.1,1.7-1.6,2.5c-0.1,0.1-0.2,0.2-0.4,0.2c-0.7,0-1.3,0-2,0c-0.6,0-1,0.3-1.1,0.9c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2,0,0.2c0,0.3,0.3,0.5,0.5,0.6c0.3,0.1,0.6,0.2,0.9,0.3c0.3,0.1,0.3,0.1,0.1,0.3c-0.3,0.4-0.6,0.9-0.7,1.4c-0.3,1-0.5,2-0.5,3c0,2,0,4.1,0,6.1c0,0.3,0,0.6,0,0.9c0,0.3,0.2,0.5,0.5,0.6c0.1,0,0.2,0,0.2,0c0.9,0,1.7,0,2.6,0c0.1,0,0.2,0,0.3,0c0.4-0.1,0.6-0.3,0.6-0.7c0-0.4,0-0.7,0-1.1c0-0.5,0-0.4,0.5-0.4c5.5,0,10.9,0,16.4,0c0.1,0,0.1,0,0.2,0c0.2,0,0.2,0.1,0.2,0.2c0,0.4,0,0.7,0,1.1c0,0.2,0,0.3,0.1,0.5c0.1,0.2,0.2,0.4,0.5,0.4c0.1,0,0.2,0,0.2,0c0.2,0,0.3,0,0.5,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.5,0,1,0,1.4,0c0.1,0,0.3,0,0.4,0c0.1,0,0.2,0,0.3,0c0.4-0.1,0.5-0.3,0.6-0.6c0-1.3,0-2.5,0-3.8C28,23.9,28,23.1,28,22.3z M8.7,21.1c0,0.3-0.3,0.7-0.8,0.9c-0.1,0-0.1,0-0.2,0c-0.4,0-0.8,0-1.2,0c-0.4,0-0.8,0-1.2,0c-0.7,0-1.3-0.6-1.4-1.2c-0.1-0.7,0.5-1.4,1.2-1.5c0.2,0,0.4,0,0.7,0c0.8,0.3,1.6,0.5,2.3,0.8C8.4,20.2,8.8,20.6,8.7,21.1z";

	function makeAccListIcon(){
		var data = JejuAccData,
			svg_width =  ((isMobile==true)? (screenWidth-60) : 550),
			svg_height = ((isMobile==true)? 250: 150),
			margin = 10,
			iconWidth = 30,
			iconHeight= 30,
			iconMargin =  ((isMobile==true)? 2: 3); 

		var svglineMaxNum = parseInt( svg_width / (iconWidth + iconMargin));
		var makeXcor = function(i) {
			return (i % svglineMaxNum) * (iconWidth + iconMargin);
		};
		var makeYcor = function(i) {
			return parseInt(i / svglineMaxNum) * (iconWidth + iconMargin);
		};


		var _iconSvg = d3.select("#ACC_ICON_LIST");
		_iconSvg.style("width", svg_width)
				.style("height", svg_height);
		
		var _yearLabel =  _iconSvg.append("g").attr("class","year-label-holder")
								.attr("transform", "translate(-40, 22)");
		var _iconGroup =  _iconSvg.append("g").attr("class", "icon-group");

		var yPosTemp = 0,
			countByYear = 0;

		data.map(function(v,i,a){
			var bef = i-1;
			if(i==0){
				countByYear ++;
				_yearLabel.append("text")
					.attr("x", "0")
					.attr("y", "0")
					.text("2017")
					.attr("class", "year-label")
			}else{
				if( String(a[i].year) == String(a[bef].year) ){
					countByYear ++;						
				}else{
					if(isMobile==true){
                        yPosTemp = yPosTemp + makeYcor(countByYear)+30; 
                    }else{
                        yPosTemp = yPosTemp + makeYcor(countByYear)+50; 
                    }
					countByYear = 1;
					_yearLabel.append("text")
						.attr("x", "0")
						.attr("y", yPosTemp+5)
						.text( String(a[i].year))
						.attr("class", "year-label")
				}
			}
			a[i].iconXpos = makeXcor(countByYear-1);
			a[i].iconYpos = makeYcor(countByYear-1)+yPosTemp;	
		});
		console.log(data);

		var iconBox = _iconGroup.selectAll(".iconBox")
			.data(data)
			.enter().append("g")
			.attr("class", "iconBox")
			.attr("transform", function(d, i) {
			  return "translate(" + d.iconXpos + "," + d.iconYpos + ")";
			})
			.style("width", iconWidth)
			.style("height", iconHeight)
			.style("opacity", "1")

		var iconPath = iconBox.append("path")
			.attr("class", "acc-icon")
			.attr("d", accPath)
			//.attr("filter", "url(#glow)")
			.style("stroke-width", "0")
			//.style("stroke", "#691c0d")
			.style("stroke", "#111")
			.style("fill-opacity", "0.8")
			.style("fill", function(d){ 
				//return d.color;
				if(d.accScale == "중상사고"){
					return "#db2400";
				}else if(d.accScale == "부상사고"){
					return "#f25300";
				}else if(d.accScale == "경상사고"){
					return "#e3a26d";
				
				}
			});

		var $tooltip = $(".acc-list-holder .tooltip");
		$tooltip.css({"opacity":"0"});

		iconPath.on("mouseover", function(d){
			d3.select(this).style("stroke-width", "1")
					.style("fill-opacity", "1");

			$tooltip.find(".acc-date .year").html(d["year"]);
			$tooltip.find(".acc-date .month").html(d["month"]);
			$tooltip.find(".acc-date .date").html(d["date"]);
			$tooltip.find(".acc-type-1").html(d["accType1"]);
			$tooltip.find(".acc-type-2").html(d["accType2"]);
			$tooltip.css({"opacity":"1"});
			$tooltip.css({"display":"block"});
			
			var tooltipPos = d3.select(this.parentNode).attr("transform").replace("translate(", "").replace(")", "").split(",");
			//console.log( tooltipPos[0], tooltipPos[1]);
			$tooltip.css({"left": (Number(tooltipPos[0])+40) +"px"});
			$tooltip.css({"top": (Number(tooltipPos[1])+30) +"px"});
		

		}).on("mouseout", function(d) {
			d3.select(this).style("stroke-width", "0")
					.style("fill-opacity", "0.8");

			$tooltip.css({"opacity":"0"})
			$tooltip.css({"display":"none"});

		});

	};
	


	/******** 교통사고 리스트 ********/


	/******** Gallery Slider ********/
	var Slider = {},
		baseWidth = null,
		$Base = $(".slider-body ul li");
 	Slider.itemNumb = $Base.length;
	Slider.setSlider = function(){
		if(isMobile==true){
			var _itemHeight = (535/800*screenWidth);
			console.log(_itemHeight);
			$(".gallery-slider .slider-wrapper").css({"height": _itemHeight+"px"});
			$Base.css({"width": $(".slider-body").width(), "height": _itemHeight+"px"});
			baseWidth = $(".slider-body").width();
		}else{
			baseWidth = $Base.width();
		}	
		$(".slider-body ul").css({"width":Slider.itemNumb*baseWidth });
		$Base.eq(0).addClass("slider-item-on");
	};

	Slider.index = 0;
	Slider.moveSlide = function(drct){
		if(drct=="prev"){ // 이전
			if(Slider.index==0){}
			else if(Slider.index>0){
				Slider.index -=1;
				var moving = baseWidth*Slider.index;
				$(".slider-body ul").stop().animate({"left":-moving}, 500,"easeOutCubic");
				$Base.removeClass("slider-item-on");
				$Base.eq(Slider.index).addClass("slider-item-on");
			}

		}else if(drct=="next"){ // 다음
			if(Slider.index==Slider.itemNumb-1 ){}
			else if(Slider.index<Slider.itemNumb-1 ){
				Slider.index +=1;
				var moving = baseWidth*Slider.index;
				$(".slider-body ul").stop().animate({"left":-moving}, 500,"easeOutCubic");
				$Base.removeClass("slider-item-on");
				$Base.eq(Slider.index).addClass("slider-item-on");
			}

		}
		$(".arrow").removeClass("arrow-block");
	}
	Slider.setSlider();

	$(".arrow").on("click", function(e){
		$(".arrow").addClass("arrow-block");
		e.preventDefault();
		var drct = $(this).attr("id");
		Slider.moveSlide(drct);
	});

	function sliderDefaultSetting(){
		Slider.moveSlide("next");
	};
	sliderDefaultSetting();

	/******** Gallery Slider ********/


	/******** 모바일 전용 조정 ********/

	if(isMobile==true){
		$(".video-pc").html("");
        $(".video-pc").hide();
		$(".title-svg-pc").html("");
		$("#S01_01").find("img").attr("src", "img/s01-01-m.jpg");
        $(".img-dummy-01").html("");
        $("#S02_05").find("img").attr("src", "img/s02-05-2-m.jpg");
        $("#S02_06").find("img").attr("src", "img/s02-06-m.jpg");
        $("#S03_09").find("img").attr("src", "img/s03-09-m.jpg");
        avoid100vh();
        $(".video-boxing iframe").css({"width":$(".blank img").width(),"height":$(".blank img").height()});
	}else{
         if(ieTest==true){
            $(".top-video").find(".video-m").html("");
            $(".top-video").find(".video-m").hide();
            $(".itv--ie-change").find(".video-tag").html("");
            $(".itv--ie-change").find(".video-tag").hide();
            $(".itv--ie-change").find(".video-photo-temp").show();
            $(".fs-a--2").find(".video-m").html("");
            $(".fs-a--2").find(".video-m").hide();

        }else{
            $(".video-m").html("");
            $(".video-m").hide();   
        }
		$(".title-svg-m").html("");
	}
	/******** 모바일 전용 조정 ********/

	function activataTw(){
		$("#TT_HOLDER_03").twentytwenty();
		$("#TT_HOLDER_04").twentytwenty();
		$("#TT_HOLDER_05").twentytwenty();
	};

	function avoid100vh(){
		$(".spacer").height(screenHeight);
		$(".fixed-slider-area .fixed-el").height(screenHeight);
		$(".video-fullScreen").height(screenHeight);
	}

	function init(){
		activTitlePathAni();
		activeIntroPathAni();
		activataTw();
		//settingFixedElPos();
		settingFixedElOpacity();
        if(isMobile==false&&ieTest==false){
            setMouseMoveEventsAfterLoad();
        }
		makeAccListIcon();
		
		$("body").removeClass("fixed");
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

		if($(".fixed-slider-video-area").length >= 1){
			if( videoSlider.videoStatus !== videoSlider.checkVideoStatus(nowScroll)){
				videoSlider.videoStatus = videoSlider.checkVideoStatus(nowScroll);
				videoSlider.adjustVideoHolder();
			}
		}
		
		if($fs.length >= 1){
			checkNowStage(nowScroll);
		}

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
