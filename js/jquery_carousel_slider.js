(function($) {

	var default_setting = {
		subject:'Default',
		cardw : 145,	// page card's width .
		cardh : 145, 	// height .
		cardn : 7,	// the number of visible page card .
		margin : 9	// margin between cards .	
	}

	var touch_event = {};

	function effect() {
		var target = this;
		target.find('.slide-wrap').hover(function() {
			target.find('.shift').addClass('shift-active');
			target.find('i').addClass('i-active');
		}, function() {
			target.find('.shift').removeClass('shift-active');
			target.find('i').removeClass('i-active');
		});

		target.find('.right').hover(function() {
			target.find('.slide').addClass('slide-active-r');
		}, function() {
			target.find('.slide').removeClass('slide-active-r');
		});

		target.find('.left').hover(function() {
			target.find('.slide').addClass('slide-active-l');
		}, function() {
			target.find('.slide').removeClass('slide-active-l');
		});

		target.find('.shift').hover(function() {
			target.find('i').addClass('i-active-move');
		}, function() {
			target.find('i').removeClass('i-active-move');
		});
	}

	function isMobile() {
		if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
			touch_event = { 
				movement: 0,
				touchStartX: 0,
				prevTouchX: 0,
				beingTouched: false
			};
			return true;
		} else {
			return false;
		}	
	}

	function handleTouchEvent(para) {
		var target = this;
		target[0].addEventListener("touchstart", handleStart, false);
		target[0].addEventListener("touchend", function(e) {handleEnd(e, para)}, false);
		target[0].addEventListener("touchmove", handleMove, false);
	}

	function handleStart(e) {
		touch_event.touchStartX = e.targetTouches[0].clientX;
		touch_event.beingTouched = true;
	}
    
	function handleEnd(e, para) {
		if (touch_event.touchStartX != e.changedTouches[0].clientX) {
			if(touch_event.movement > 0) {
				para.movement = sliding(para.ismobile, $(e.currentTarget), 0, para.singlemove, para.boundary, para.movement);
			} else {
				para.movement = sliding(para.ismobile, $(e.currentTarget), 1, para.singlemove, para.boundary, para.movement);
			}
			touch_event.touchStartX = 0;
			touch_event.beingTouched = false;
		}
	}
    
	function handleMove(e) {
		if (touch_event.beingTouched) {
			let deltaX = e.changedTouches[0].clientX - touch_event.touchStartX;
			touch_event.movement = deltaX
			touch_event.prevTouchX = e.changedTouches[0].clientX;
		}
	}

	function sliding(ismobile, target, direction, singlemove, boundary, movement) {

		if (direction > 0) {
			if (Math.abs(movement) < boundary) {
				movement -= singlemove;
			}
			ismobile ? target.find('ul').css('transform','translateX('+movement+'px)') : target.find('ul').hover().css('transform','translateX('+movement+'px)');
		} else {
			if (movement < 0) {
				movement += singlemove;
			}
			ismobile ? target.find('ul').css('transform','translateX('+movement+'px)') : target.find('ul').hover().css('transform','translateX('+movement+'px)');
		}
		return movement;
	}

	function init (cus_setting) {	
		// overwrite setting
		var init_setting = $.extend({}, default_setting, cus_setting || {});
		
		var slidewraph = init_setting.cardh + 85;
		var covered=init_setting.cardw - 33	//coverd part of card (at both tails of box).
		var boxw = init_setting.cardw * init_setting.cardn + init_setting.margin * (init_setting.cardn - 1) - covered * 2; //box width 845
		var singlemove = (init_setting.cardw+init_setting.margin) * (init_setting.cardn - 2);	//transform distance .
		var listn = init_setting.JSON[init_setting.subject].length;
		var boundary = (init_setting.cardw + init_setting.margin) * (listn) - singlemove;
		var target = this;
		var sliderframestring = '<h3></h3><div class=\'tri\'></div><div class =\'slide-wrap\'><div class=\'border\'><div class=\'slide\'><div class=\'shift right\'></div><i class=\'shift right\'></i><div class=\'shift left\'></div><i class =\'shift left\'></i><ul><li></li><li></li></ul></div></div></div>';
		var sliderhtml = $(sliderframestring);
		sliderhtml.appendTo(target);

		$.each(init_setting.JSON[init_setting.subject], function (i, field){
			target.find('ul>li:first').after('<li><img src='+field.imgpath+'><div class=\'title\'>'+field.title+'<br><span>'+field.des+'</span></div></li>');
		});

		target.width(boxw);
		target.find('.slide-wrap').height(slidewraph);
		target.find('h3').text(init_setting.subject);
		target.find('ul').css({left:-covered});
		target.find('li').css("margin-right",init_setting.margin);
		target.find('li').width(init_setting.cardw);
		target.find('li').height(init_setting.cardh);
		target.find('img').width(init_setting.cardw);
		target.find('img').height(init_setting.cardh);
		target.find('.title').width(init_setting.cardw);		

		if(isMobile()) {
			var para = {
				ismobile: true,
				movement: 0,
				singlemove: singlemove,
				boundary: boundary
			};
			handleTouchEvent.call(target, para);

		} else {

			effect.call(target);
			var movement = 0;
			target.find('.right').click(function(event) {
				movement = sliding(false, target, 1, singlemove, boundary, movement);
			});

			target.find('.left').click(function(event) {
				movement = sliding(false, target, -1, singlemove, boundary, movement);
			});
		}
		
	}

	$.fn.slider = function(setting) {
		if(setting && typeof setting === 'object'){
			init.call(this, setting);
		}
		else if(!setting){
			init.call(this);
		}
	};

})(jQuery)
