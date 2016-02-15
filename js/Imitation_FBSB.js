(function($) {

	var default_setting = {
		subject:'Default',
		cardw : 145,	//page card's width .
		cardh : 145, 	//			  height .
		cardn : 7,		//the number of visible page card .
		margin : 9		//margin between cards .	
	}

	function effect()
	{
		$('.slide-wrap').hover(function() {
			$('.shift').addClass('shift-active');
			$('i').addClass('i-active');
		}, function() {
			$('.shift').removeClass('shift-active');
			$('i').removeClass('i-active');
		});

		$('.right').hover(function() {
			$('.slide').addClass('slide-active-r');
		}, function() {
			$('.slide').removeClass('slide-active-r');
		});

		$('.left').hover(function() {
			$('.slide').addClass('slide-active-l');
		}, function() {
			$('.slide').removeClass('slide-active-l');
		});

		$('.shift').hover(function() {
			$('i').addClass('i-active-move');
		}, function() {
			$('i').removeClass('i-active-move');
		});
	}

	function init (cus_setting) 
	{	
		// overwrite setting
		var init_setting = $.extend({}, default_setting, cus_setting || {});
		
		var slidewraph=init_setting.cardh+85;
		var covered=init_setting.cardw-33	//coverd part of card (at both tails of box).
		var boxw=init_setting.cardw*init_setting.cardn + init_setting.margin*(init_setting.cardn-1) - covered*2; //box width 845
		var singlemove=(init_setting.cardw+init_setting.margin)*(init_setting.cardn-2);	//transform distance .
		var listn = init_setting.JSON[init_setting.subject].length;
		var boundary = (init_setting.cardw+init_setting.margin)*(listn)-singlemove;
		var target = this;
	
		$.each(init_setting.JSON[init_setting.subject], function (i,field){
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

		var movement=0;
		target.find('.right').click(function(event) {
			if(Math.abs(movement) < boundary)
				movement-=singlemove;
			target.find('ul').hover().css('transform','translateX('+movement+'px)');
		});

		target.find('.left').click(function(event) {
			if(movement < 0)
				movement+=singlemove;
			target.find('ul').hover().css('transform','translateX('+movement+'px)');
		});
	}

	$.fn.FBSB = function(setting){
		effect();
		if(setting && typeof setting === 'object'){
			init.call(this,setting);
		}
		else if(!setting){
			init.call(this);
		}
	};

})(jQuery)