function mVisualHeight (){

	var
		status	=	wCatch()
	,	ms		=	$('.m_slide')
	,	msh		=	$('.m_slide .ms_h')
	,	ratio	=	(16/9)
	;

	if(status === "p"){
		ms.css({
				'height'		:	'440px'
		});
		msh.css({
				'height'		:	'440px'
		});
	} else if(status === "t"){
		ms.css({
				'height'		:	'360px'
		});	
		msh.css({
				'height'		:	'360px'
		});	
	} else if(status === "m"){
		ms.css({
				'height'		:	((msh.outerWidth())/ratio) + 'px'
		});
		msh.css({
				'height'		:	((msh.outerWidth())/ratio) + 'px'
		});
	}

}

function slideVisual(s_area) {

	var 
		svArea		=	$(s_area)
	,	svAreaUl	=	svArea.find('.slide_list ul')
	,	svCount		=	svArea.find('.slide_count')	
	,	svPrev		=	svArea.find('.btn_prev')
	,	svNext		=	svArea.find('.btn_next')
	,	svPlay		=	svArea.find('.btn_play')
	,	svPause		=	svArea.find('.btn_pause')
	,	svPager	    =	svArea.find('.slide_pager')
	,	svListCnt	=	svAreaUl.find('li').length
	,	svSlide		=	svAreaUl.lightSlider({
			mode		:	'fade'
		,	item		:	1
		,	auto		:	true
		,	loop		:	true
		,	pager		:	false
		,	slideMargin	:	0
		,	slideMove	:	1
		,	speed		:	600
		,	pause		:	5000
		,	controls 	:	false
		,	keyPress	:	true
		,	onBeforeStart	:	function(){
			
			svCount.find('strong').text('1');
			svCount.find('span').text(svListCnt);
			
		}
		,	onSliderLoad	:	function(){
			
			var 
				html	=	''
            ;
        
            html += '<ul>';
            for(var i = 1; i <= svListCnt; i++) {
                html += '<li><a href="#none"><span class="hdn">' + i +' �섏씠吏�濡� �대룞</span></a></li>';
            }
            html += '</ul>';
        
            svPager.append(html);
			svPager.find('li').first().addClass('active');
        
			svPager.find('li').click(function(){
				svSlide.goToSlide($(this).index() + 1);
				return false;
			});
        
            svAreaUl.find('li').find('a').attr('tabindex','-1');
            svAreaUl.find('li').first().find('a').attr('tabindex','0');
            
        }
        ,	onBeforeSlide	:	function(a, b){
			
			svCount.find('strong').text(b + 1);
        
            svPager.find('li').removeClass('active');
            svPager.find('li').eq(b).addClass('active');
        
            svAreaUl.find('li').find('a').attr('tabindex','-1');
            svAreaUl.find('li').eq(b).find('a').attr('tabindex','0');
        
		}
	});

	svPrev.click(function(){
		svSlide.goToPrevSlide();
		return false;
	});
	svNext.click(function(){
		svSlide.goToNextSlide();
		return false;
	});
	svPlay.hide();
	svPlay.click(function(){
		svSlide.play();
		$(this).hide().next().show().focus();
		return false;
	});
	svPause.click(function(){
		svSlide.pause();
		$(this).hide().prev().show().focus();
		return false;
	});	
	svAreaUl.focusin(function(){
		svSlide.pause();
		svPause.hide().prev().show();
	});
	svAreaUl.focusout(function(){
		svSlide.play();
		svPlay.hide().next().show();
	});
	
}

function slideColumn(s_area, s_item_p, s_item_t, s_item_m, width_t, width_m){

	var 
		scArea		=	$(s_area)
	,	scAreaUl	=	scArea.find('.slide_list ul')
	,	scCount		=	scArea.find('.slide_count')	
	,	scPrev		=	scArea.find('.btn_prev')
	,	scNext		=	scArea.find('.btn_next')
	,	scPlay		=	scArea.find('.btn_play')
	,	scPause		=	scArea.find('.btn_pause')
	,	scPager	    =	scArea.find('.slide_pager')
	,	scListCnt	=	scAreaUl.find('li').length
	,	itemP		=	s_item_p
	,	itemT		=	s_item_t
	,	itemM		=	s_item_m
	,	wT			=	width_t
	,	wM			=	width_m
	,	scSlide		=	scAreaUl.lightSlider({
			item		:	itemP
		,	auto		:	true
		,	loop		:	true
		,	pager		:	false
		,	slideMargin	:	0
		,	slideMove	:	1
		,	speed		:	600
		,	pause		:	5000
		,	controls 	:	false
		,	keyPress	:	false
		,	responsive	:	[
			{
					breakpoint	:	wT
				,	settings	:	{
						item			:	itemT
					,	slideMove		:	1
					,	onBeforeSlide	:	function(a, b){

						var 
							jsIdx	=	b
						,	thIdx	=	jsIdx - itemT
						,	fltIdx	=	thIdx + 1
						;

						if (fltIdx <= 0){
							fltIdx = scListCnt + fltIdx;
						} else if (fltIdx > scListCnt) {
							fltIdx = fltIdx - scListCnt;
						}
						
						scCount.find('strong').text(fltIdx);
					
						scPager.find('li').removeClass('active');
						scPager.find('li').eq(thIdx).addClass('active');

						scAreaUl.find('li a').attr('tabindex','0');        
						scAreaUl.find('.clone a').attr('tabindex','-1');
					
					}
				}
			},
			{
					breakpoint	:	wM
				,	settings	:	{
						item			:	itemM
					,	slideMove		:	1
					,	onBeforeSlide	:	function(a, b){

						var 
							jsIdx	=	b
						,	thIdx	=	jsIdx - itemM
						,	fltIdx	=	thIdx + 1
						;

						if (fltIdx <= 0){
							fltIdx = scListCnt + fltIdx;
						} else if (fltIdx > scListCnt) {
							fltIdx = fltIdx - scListCnt;
						}

						scCount.find('strong').text(fltIdx);
					
						scPager.find('li').removeClass('active');
						scPager.find('li').eq(thIdx).addClass('active');

						scAreaUl.find('li a').attr('tabindex','0');        
						scAreaUl.find('.clone a').attr('tabindex','-1');
					
					}
				}
			}
		]
		,	onBeforeStart	:	function(){
			
			scCount.find('strong').text('1');
			scCount.find('span').text(scListCnt);
			
		}
		,	onSliderLoad	:	function(){
			
			var
				html	=	''
			;
        
            html += '<ul>';
            for(var i = 1; i <= scListCnt; i++) {
                html += '<li><a href="#none"><span class="hdn">' + i +' �섏씠吏�濡� �대룞</span></a></li>';
            }
            html += '</ul>';
        
            scPager.append(html);
			scPager.find('li').first().addClass('active');
        
			scPager.find('li').click(function(){
				scSlide.goToSlide($(this).index() + 1);
				return false;
			});
			
			scAreaUl.find('li a').attr('tabindex','0');        
            scAreaUl.find('.clone a').attr('tabindex','-1');
            
		}
		,	onAfterSlide	:	function(a, b){

			var 
				jsIdx	=	b
			,	thIdx	=	jsIdx - itemP
			,	fltIdx	=	thIdx + 1
			;

			if (fltIdx <= 0){
				fltIdx = scListCnt + fltIdx;
			} else if (fltIdx > scListCnt) {
				fltIdx = fltIdx - scListCnt;
			}
			
			scCount.find('strong').text(fltIdx);
        
            scPager.find('li').removeClass('active');
			scPager.find('li').eq(thIdx).addClass('active');

            scAreaUl.find('li a').attr('tabindex','0');        
			scAreaUl.find('.clone a').attr('tabindex','-1');
        
		}
	});
	scPrev.click(function(){
		scSlide.goToPrevSlide();
		return false;
	});
	scNext.click(function(){
		scSlide.goToNextSlide();
		return false;
	});
	scPlay.hide();
	scPlay.click(function(){
		scSlide.play();
		$(this).hide().next().show().focus();
		return false;
	});
	scPause.click(function(){
		scSlide.pause();
		$(this).hide().prev().show().focus();
		return false;
	});
	scAreaUl.find('li a').focusin(function(){

		var
			thPIdx = $(this).parent().index() - itemP + 1
		;

		scSlide.goToSlide(thPIdx);

	});
	scAreaUl.focusin(function(){
		scSlide.pause();
		scPause.hide().prev().show();
	});
	scAreaUl.focusout(function(){
		scSlide.play();
		scPlay.hide().next().show();
	});
	
}

/*
 * 湲닿툒諛곕꼫 : �ы쉶�곴굅由щ몢湲�
 */
function emBanner(){
	
	var isemBanner =  $(".main_embanner");	
	if (isemBanner.length > 0){
		var isemBanner_img = $(isemBanner).find("#emergency_b");
		var width = $(window).outerWidth(); 		
        if ( width <= 767){
        	$(isemBanner_img).html("<img src='/static/image/main/em_banner_mobile4.png' alt='4�� 19�쇨퉴吏� �ы쉶�곴굅由щ몢湲� �곗옣�⑸땲��! �몄텧�� �먯젣�섍퀬 理쒕��� 吏� �덉뿉 癒몃Ъ�� 二쇱꽭�� 怨듭��ы빆 諛붾줈媛�湲�' />");
        }else{
			$(isemBanner_img).html("<img src='/static/image/main/em_banner4.png' alt='4�� 19�쇨퉴吏� �ы쉶�곴굅由щ몢湲� �곗옣�⑸땲��! �몄텧�� �먯젣�섍퀬 理쒕��� 吏� �덉뿉 癒몃Ъ�� 二쇱꽭�� 怨듭��ы빆 諛붾줈媛�湲�' />");
		}
	}
};

/*
 * live contents toggle box
 */
function main_toggleBox(){	
	var width = $(window).outerWidth();
	var btn = $("button.liveopenBtn");
	var tBox = $(".main_box_toggle");
	
	if ( width <= 767 ){
		tBox.hide();
	}else{
		tBox.show();
	}

	btn.click(function (e){
		e.preventDefault();
		
		var whereopen = $(this).attr("data-openarea");
		var st_txt = $(this).find(".txt").text();
		$(this).toggleClass("open");
		$(this).find(".txt").text(
				st_txt == "�쇱퀜蹂닿린" ? "�묎린" : "�쇱퀜蹂닿린"
			);		
		$(whereopen).slideToggle("slow");
	});	
}

function livehelp(){// 移섎즺以� �덈궡	
	var help_open =  $("#liveNum_help");
	var help_info =  $("#liveNum_help_info");
	var help_close = $("#liveNum_help_close");
	
	$(help_open).click(function(e){
		e.preventDefault();
		$(help_info).toggle();		
	});
	$(help_close).click(function(e){
		e.preventDefault();
		$(help_info).hide();		
	});	
};

function cityinfohelp(){// 諛쒖깮瑜� �덈궡	
	var cityhelp_open =  $("#info_map_btn");
	var cityhelp_info =  $("#info_map_script");
	var cityhelp_close = $("#info_map_script_close");
	
	$(cityhelp_open).click(function(e){
		e.preventDefault();
		$(cityhelp_info).toggle();		
	});
	$(cityhelp_close).click(function(e){
		e.preventDefault();
		$(cityhelp_info).hide();		
	});	
};


$(function(){
	//slideVisual('.m_slide');
	slideVisual('.m_popupzone');
	//slideColumn('.m_banner', 6, 4, 1, 1179, 767);	
	tabAccess('.m_board');
	//mVisualHeight();
	emBanner();
	main_toggleBox();
	livehelp();
	cityinfohelp();
});

$(window).resize(function(){
	//mVisualHeight();
	emBanner();
	//main_toggleBox();
});