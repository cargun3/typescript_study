/*
 * �붾㈃�덈퉬 泥댄겕
 */
function wCatch() {

	var
		status
	,	wc	= $('.w_catch')
	,	wcP = wc.find('.wc_p').css('display')
	,	wcT = wc.find('.wc_t').css('display')
	,	wcM = wc.find('.wc_m').css('display')
	;

	return "block" === wcP ? status = "p" : "block" === wcT ? status = "t" : "block" === wcM ? status = "m" : void 0

}

/*
 * �덉갹
 */
function newWindow(wrapClass) {

	var
		thDiv		=	$(wrapClass)
	,	thDivLink	=	thDiv.find('a')
	;

	thDivLink.each(function () {

		var
			isNewWindow	=	$(this).attr('target')
		;

		if (isNewWindow === '_blank') {
			$(this).append('<i class="ico_window"><span class="hdn">�덉갹</span></i>');
		}

	});
}



/*
 * 臾몄꽌酉곗뼱 �몄텧
 */
function fn_webViewer(fileName, url){	
	var encodFileNm = encodeURI(encodeURIComponent(fileName));	
	var agent = navigator.userAgent.toLowerCase();	
	if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || agent.indexOf('msie') != -1) {
		window.open("/viewer/viewHtmlConv.jsp?filename="+encodFileNm+"&amp;filePath="+url);
	} else {
		window.open("/viewer/viewHtmlConv.jsp?filename="+encodFileNm+"&filePath="+url);
	}
}




/*
 * 湲��먰겕湲곗“��
 */
var txtNum = 1;

function fst() {

	var
		btnPlus		=	$('.n_fs .btn_plus')
	,	btnMinus	=	$('.n_fs .btn_minus')
	,	btnReset	=	$('.n_fs .btn_reset')
	,	bd			=	$('body')
	;

	btnPlus.click(function (e) {

		e.preventDefault();

		txtNum = txtNum + 0.1;

		if (txtNum > 1.7) {
			alert('�붿씠�곸쬆媛��좎닔�놁뒿�덈떎');
			return;
		}

		bd.css({
			'transform-origin': '50% 0'
			, 'transform': 'scale(' + txtNum + ')'
		});

		return false;

	});

	btnMinus.click(function (e) {

		e.preventDefault();

		txtNum = txtNum - 0.1;

		if (txtNum < 1) {
			alert('�붿씠�곴컧�뚰븷�섏뾾�듬땲��');
			return;
		}

		bd.css({
			'transform-origin': '50% 0'
			, 'transform': 'scale(' + txtNum + ')'
		});

		return false;

	});

	btnReset.click(function (e) {

		e.preventDefault();

		txtNum = 1;

		bd.css({
			'transform': 'scale(1)'
		});

		bd.removeAttr('style');

		return false;

	});
}

/*
 * �쒕툕硫붾돱諛곌꼍 �믪씠媛� 泥댄겕
 */
function gnbSubH() {

	var
		gnbLi	=	$('.gnb > ul > li')
	,	status	=	wCatch()
	;

	if (status === "p") {

		gnbLi.find('.g_sub').css('opacity', '0').show();

		gnbLi.each(function () {

			var
				th 				=	$(this)
			,	thGnbSub 		=	th.find('.g_sub')
			,	thGnbSubInner 	=	th.find('.g_sub > div')
			,	thGnbSubInnerH 	=	thGnbSubInner.outerHeight()
			;

			thGnbSub.css({
					'height'	:	thGnbSubInnerH + 'px'
				,	'display'	:	'none'
				,	'opacity'	:	'1'
			});

		});

	}
}

/*
 * gnb
 */
function gnb() {

	var
		g							= 	$('.gnb')
	, 	gList						= 	$('.gnb > ul > li')
	, 	gListLink 					= 	$('.gnb > ul > li > a')
	, 	gFirstListLink 				= 	$('.gnb > ul > li:first-child > a')
	, 	gLastListSubLastListLink 	= 	$('.gnb > ul > li:last-child > .g_sub > div > ul > li:last-child > a')
	, 	gSub 						= 	$('.gnb .g_sub')
	;

	gList.bind({
		mouseenter	: function () {
            console.log("123");
			gSub.slideUp(240);
			$(this).find(".g_sub").stop().slideDown(480);
			$(this).addClass("over");
			gList.not($(this)).removeClass("over");
		},
		mouseleave	: function () {
			$(this).find(".g_sub").hide();
		}
	});

	g.mouseleave(function () {
		gList.removeClass("over").find(".g_sub").hide();
	});

	gListLink.bind({
		focusin	: function () {
			gSub.slideUp(240);
			$(this).siblings(".g_sub").stop().slideDown(480);
			$(this).parent().addClass("over");
			gList.not($(this).parent()).removeClass("over");
		}
	});

	gFirstListLink.keydown(function (e) {

		var
			codeKey = e.keyCode || e.which
		;

		if (codeKey == 9 && e.shiftKey) {
			$(this).parent().removeClass("over").find(".g_sub").hide();
		}

	});

	gLastListSubLastListLink.focusout(function () {
		gList.removeClass("over").find(".g_sub").hide();
	});

}

/*
 * on off toggle
 */
function bodyBgOn() {
	$('.body_bg').addClass('on');
}

function bodyBgOff() {
	$('.body_bg').removeClass('on');
}

function globalMenuOn() {
	$('.global_menu').addClass('open');
}

function globalMenuOff() {
	$('.global_menu').css('display', 'none');
}

function globalSearchOn() {
	$('.global_search').addClass('open');
}

function globalSearchOff() {
	$('.global_search').css('display', 'none');
}

/*
 * global menu
 */
function globalMenu() {

	var
		bd				=	$('body')
	,	btnGlobalMenu	=	$('.header .btn_global_menu')
	,	btnClose		=	$('.global_menu .btn_close')
	;

	btnGlobalMenu.click(function () {

		var
			g		=	$('.global_menu')
		,	isOn	=	g.hasClass('open')
		;

		if (!isOn) {
			bd.addClass('of_h');
			bodyBgOn();
			g.css('display', 'block');
			setTimeout(globalMenuOn, 40);
		}

		return false;

	});

	btnClose.click(function () {

		var
			g		=	$('.global_menu')
		,	isOn	=	g.hasClass('open')
		;

		if (isOn) {
			g.removeClass('open');
			setTimeout(globalMenuOff, 240);
			setTimeout(bodyBgOff, 240);
			bd.removeClass('of_h');
			$('.gmt_family_site').removeClass('open');
		}

		return false;

	});

	btnClose.keydown(function (e) {

		var
			codeKey	=	e.keyCode || e.which
		, 	g	 	=	$('.global_menu')
		;

		if (codeKey == 13) {
			g.removeClass('on');
			setTimeout(globalMenuOff, 240);
			setTimeout(bodyBgOff, 240);
			bd.removeClass('of_h');
			btnGlobalMenu.focus();
		}
	});

}

/*
 * global menu mobile toggle
 */
function globalMenuTgl() {

	var
		gmTitle 			=	$('.global_menu .gm_content .gmc_title')
	,	gmSubList			=	$('.global_menu .gm_content .gmc_list > ul > li')
	;

	gmSubList.each(function () {

		var
			hasChild = $(this).find('.gmc_sub')
		;

		if (hasChild.length > 0) {
			$(this).addClass('has_child');
		}

	});

	gmTitle.click(function () {

		var
			status	=	wCatch()
		,	isOpen	=	$(this).parent().hasClass('open')
		;

		if (status !== 'p') {

			if (!isOpen) {
				$(this).parent().addClass('open');
			} else {
				$(this).parent().removeClass('open');
			}

			return false;
		}

	});

	$('.global_menu .gm_content .gmc_list > ul > li.has_child > a').click(function () {

		var
			status	=	wCatch()
		,	isOpen	=	$(this).parent().hasClass('open')
		;

		if (status !== 'p') {

			if (!isOpen) {
				$(this).parent().addClass('open');
			} else {
				$(this).parent().removeClass('open');
			}

			return false;
		}

	});

}

/*
 * page load globa menu on
 */
function tmGlobalMenuOn() {

	var 
		mCount = document.location.href.split('cd=')[document.location.href.split('cd=').length - 1].split('&')[0].split('_')
	,	g	=	$('.gnb')
	,	gm	=	$('.global_menu')
	,	l	=	$('.lnb')
	;

	if (mCount.length >= 3) {

		if (g.length > 0) {
			$('.gnb > ul > li:eq(' + (mCount[0] - 1) + ')').addClass('on');
			$('.gnb > ul > li:eq(' + (mCount[0] - 1) + ') .g_sub > div > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('on');
		}
		if (gm.length > 0) {
			$('.gm_content > div > ul > li:eq(' + (mCount[0] - 1) + ')').addClass('open on');
			$('.gm_content > div > ul > li:eq(' + (mCount[0] - 1) + ') .gm_list > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('open on');
			$('.gm_content > div > ul > li:eq(' + (mCount[0] - 1) + ') .gm_list > ul > li:eq(' + (mCount[1] - 1) + ') .gmc_sub > ul > li:eq(' + (mCount[2] - 1) + ')').addClass('on');
		}
		if (l.length > 0) {
			$('.lnb .l_list > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('open on');
			$('.lnb .l_list > ul > li:eq(' + (mCount[1] - 1) + ') > div > ul > li:eq(' + (mCount[2] - 1) + ')').addClass('on');
		}

	} else if (mCount.length === 2) {

		if (g.length > 0) {
			$('.gnb > ul > li:eq(' + (mCount[0] - 1) + ')').addClass('on');
			$('.gnb > ul > li:eq(' + (mCount[0] - 1) + ') .g_sub > div > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('on');
		}
		if (gm.length > 0) {
			$('.gm_content > div > ul > li:eq(' + (mCount[0] - 1) + ')').addClass('open on');
			$('.gm_content > div > ul > li:eq(' + (mCount[0] - 1) + ') .gm_list > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('on');
		}
		if (l.length > 0) {
			$('.lnb .l_list > ul > li:eq(' + (mCount[1] - 1) + ')').addClass('on');
		}

	}

}

/*
 * global search
 */
function globalSearch() {

	var
		bd				= 	$('body')
	, 	btnGlobalSearch = 	$('.header .btn_global_search')
	, 	btnClose 		= 	$('.global_search .btn_close')
	, 	status 			= 	wCatch()
	, 	gs 				= 	$('.global_search')
	, 	isOpen 			= 	gs.hasClass('open')
	;

	if (status === "p" && isOpen) {

		gs.removeClass('open');
		setTimeout(globalSearchOff, 240);
		setTimeout(bodyBgOff, 240);
		bd.removeClass('of_h');

	} else {

		btnGlobalSearch.click(function() {

			var
				gs		=	$('.global_search')
			, 	isOpen	=	gs.hasClass('open')
			;

			if (!isOpen) {
				bd.addClass('of_h');
				bodyBgOn();
				gs.css('display', 'block');
				setTimeout(globalSearchOn, 40);
			}

			return false;

		});

		btnClose.click(function () {

			var
				gs		=	$('.global_search')
			, 	isOpen	=	gs.hasClass('open')
			;

			if (isOpen) {
				gs.removeClass('open');
				setTimeout(globalSearchOff, 240);
				setTimeout(bodyBgOff, 240);
				bd.removeClass('of_h');
			}

			return false;

		});

	}

}

/*
 * footer relate
 */
function fRelate() {

	var
		frList = $('.f_relate > ul > li > a')
	;

	frList.click(function () {

		var
			isOpen = $(this).parent().hasClass('open')
		;

		if (!isOpen) {
			frList.parent().removeClass('open');
			$(this).parent().addClass('open');
		} else {
			$(this).parent().removeClass('open');
		}

		return false;

	});

}

/*
 * lnb
 */
function lnbAddClass() {

	var
		lList = $('.lnb .l_list > ul > li')
	;

	lList.each(function () {

		$(this).find('ul').parent().addClass('lt_c');
		
		var
			isChild		=	$(this).find('ul').length
		;

		if (isChild > 0) {
			$(this).addClass('has_child');
			$(this).find('>a').addClass('lt_l')
		}

	});

}

/*
 * skipmenu IE�먮윭濡� 媛뺤젣 留곹겕
 */
function skipIEer() {
	$(".navigation .n_left a").focusin(function () {
		if ($($(this).attr("href"))) {
			$($(this).attr("href")).attr("tabindex", "-1");
		}
	}).focusout(function () {
		$($(this).attr("href")).removeAttr("tabindex");
	});
}

/*
 * �④릿 �대퉬寃뚯씠�� 留곹겕
 */
function hiddenSkipNavigation() {

	$('.navigation .n_left ul li a').not('.navigation .n_left ul li:nth-child(3) a').focusin(function () {
		if ($($(this).attr('href'))) {
			$($(this).attr('href')).attr('tab-index', '-1');
		}
	}).focusout(function () {
		$($(this).attr('href')).removeAttr('tab-index');
	});

}

/*
 * �섏씠吏� top 踰꾪듉
 */
function btnTop() {

	var
		status      = wCatch()
	, 	docH        = $(document).outerHeight()
	, 	winH        = $(window).outerHeight()
	, 	fH          = $('.footer').outerHeight()
	, 	btmPd       = 16
	, 	rightPd     = 560
	, 	winScrlT    = $(window).scrollTop()
	, 	btnTop      = $('.wrap .btn_top')
	;
	
	if (winScrlT > (winH * 0.2)) {
		
		btnTop.css('display', 'block');
		
		if (status === 'p') {
			if (winScrlT < (docH - winH - fH)) {
				btnTop.css({
					'position'  	:   'fixed'
				,   'left'   		:   '50%'
				,   'margin-left'   :   rightPd + 'px'				
				,   'bottom'    :   btmPd + 'px'
				});
			} else if (winScrlT >= (docH - winH - fH)) {
				btnTop.css({
					'position'  :   'absolute'
				,   'left'   		:   '50%'
				,   'margin-left'   :   rightPd + 'px'							
				,   'bottom'    :   fH + btmPd + 'px'
				});
			}				

		} else {
			if (winScrlT < (docH - winH - fH)) {
				btnTop.css({
					'position'  :   'fixed'
				,   'bottom'    :   btmPd + 'px'
				});
			} else if (winScrlT >= (docH - winH - fH)) {
				btnTop.css({
					'position'  :   'absolute'
				,   'bottom'    :   fH + btmPd + 'px'
				});
			}			
		}
	} else {
		btnTop.css('display', 'none');
	}	
	
	/*
	if (status === 'm') {

	} else {
		btnTop.css('display', 'none');
	}*/

}

/*
 * �� - �좏깮��
 */
function tabSelected() {

	var
		tabOn = $('[class^="tab_"] .on a')
	;

	if (tabOn.length > 0) {

		tabOn.each(function () {
			$(this).append('<em class="hdn">�좏깮��</em>');
		});

	}

}

/*
 * �� - �쇰컲
 */
function tabCommon(wrapClass) {

	var
		tabWrap 	= $(wrapClass)
	, 	DotDltChar 	= wrapClass.replace('.', '')
	, 	tabList 	= tabWrap.find('.tab_list li')
	, 	tabContent 	= tabWrap.find('.tab_content')
	;

	tabList.each(function () {
		if ($(this).find('a').attr('href') === undefined) {
			$(this).find('a').attr('href', '#' + DotDltChar + ($(this).index() + 1));
		}
	});

	tabContent.each(function () {
		$(this).attr('id', DotDltChar + ($(this).index() + 1));
	});

	tabList.removeClass('on');
	tabList.first().addClass('on');
	tabContent.removeClass('on');
	tabContent.first().addClass('on');

	tabList.click(function () {

		var
			isOn = $(this).hasClass('on')
			, isLink = $(this).find('a').attr('href')
			;

		if (!isOn) {
			tabList.removeClass('on');
			$(this).addClass('on');
			tabContent.removeClass('on');
			$(isLink).addClass('on');
		}

		return false;

	});

}

/*
 * �� - �묎렐��
 */
function tabAccess(wrapClass) {

	var
		tabWrap 	= $(wrapClass)
	, 	tabBox 		= tabWrap.find('.tab_box')
	, 	tabTitle 	= tabWrap.find('.tab_box .tab_title')
	;

	tabBox.removeClass('on');
	tabBox.first().addClass('on');

	tabTitle.click(function () {

		tabBox.removeClass('on');
		$(this).parent().addClass('on');

		return false;

	});

}

/*
 * input + btn
 */
function fBtn() {

	var
		fbBtn = $('.f_btn .fb_btn')
	;

	if (fbBtn.length > 0) {

		fbBtn.each(function () {

			var
				inWidth = $(this).find('>div').outerWidth()
			;

			$(this).css('width', inWidth + 'px');

		});

	}

}

/*
 * box_image
 */
function boxImage() {

	var imgLinkWrap = $('.box_image');

	if (imgLinkWrap.length > 0) {

		imgLinkWrap.each(function () {

			var
				imgSrc = $(this).find('img').attr('src')
			,	imgAlt = $(this).find('img').attr('alt')

			$(this).append('<a href="' + imgSrc + '" title="' + imgAlt + ' �덉갹�닿린" class="ico_zoom" target="_blank"><em class="hdn">�먮낯�대�吏�蹂닿린</em></a>');

		});

	}

}

/*
 * media descript
 */
function mediaDescript() {

	var
		md 			= 	$('.media_descript')
	, 	mdVideo 	= 	$('.media_descript .md_video video')
	, 	mdVideoW 	= 	mdVideo.outerWidth()
	, 	mdCaption	= 	$('.media_descript .md_caption textarea')
	, 	ratio 		= 	(16 / 9)
	, 	status 		= 	wCatch()
	;

	if (md.length > 0) {

		md.each(function () {

			if (status === 'p') {
				mdVideo.css('height', (mdVideoW / ratio) + 'px');
				mdCaption.css('height', (mdVideoW / ratio) + 'px');
			} else {
				mdVideo.removeAttr('style');
				mdCaption.removeAttr('style');
			}

		});

	}
	
}

/*
 * 寃뚯떆�� �� table留덊겕�� html5 �뺥깭濡� 蹂���
 */
function tableToHtml5() {
	$.summaryReMove = function (whereTable) {
		var sText, sCaption;
		if ($(whereTable).attr("summary")) {
			sText = $(whereTable).attr("summary");
			sCaption = $(whereTable).find("caption");
			if (sText != null || sText != undefined || sText != "") {
				sCaption.append(" - " + sText);
				$(whereTable).removeAttr("summary");
			}
		}
		return false;
	};

	if ($(".board_view .bv_content table").length > 0) {
		$(".board_view .bv_content table").each(function (index, item) {
			$.summaryReMove($(item));
		});
	};
}

/*
 * 寃뚯떆�� �� �대�吏� 紐⑤컮�쇱뿉�� �덉갹�곌껐 遺꾧린泥섎━ (�대�吏� �ш린 �먮옒�ъ씠利� 320 �댁긽�쇰븣留�)
 */
function boardViewImgLink() {

	$.imgLink = function (whereImg) {

		var 
			origWidth	=	$(whereImg).prop("naturalWidth")
		,	linkSrc		=	$(whereImg).attr("src")
		;

		if (origWidth > 320) {
			$(whereImg).wrap("<a href='" + linkSrc + "' title='�덉갹 - �대�吏��먮낯蹂닿린' target='_blank' />");
		}

		return false;

	};

	var
		isMobile 	=	/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false
	,	bv			=	$('.board_view')
	,	bvImg		=	bv.find('img')
	;

	if (bv.length > 0) {
		if (isMobile) {
			if (bvImg.length > 0) {
				bvImg.each(function (index, item) {
					$.imgLink($(item));
				});
			}
		}
	}
}

/*
 * 吏꾨즺 �쒓컙�� 
 */
function medicalTime(year, month1, day) {

	var
		nowYear = year
		, nowMonth = month1 > 9 ? month1 : String("0" + month1)
		, nowDate = day > 9 ? day : String("0" + day)
		, thisMonth = nowYear + "" + nowMonth
		, thisDay = nowYear + "" + nowMonth + "" + nowDate
		, mtimeMonth = $(".mtime_area")
		;

	if (mtimeMonth.length > 0) {
		if ($(mtimeMonth).find(".calendar_area")) {
			mtimeMonth.each(function (index, item) {
				if (thisMonth === $(item).attr("data-mtime")) {
					$(item).find(".day_num").each(function (index2, item2) {
						if (thisDay === $(item2).attr("data-mfulldate")) {
							$(item2).parent(".daybox").addClass("today");
						}
					});
				}
			});
		}
	}

}

/*
 * list toggle
 */
function listTgl() {

    var
        ltLink 	=   $('.lt_l')
    ;

    if (ltLink.length > 0) {

        ltLink.click(function(){

            var
                isOpen  =   $(this).parent().hasClass('open')
            ;

            if (!isOpen) {
                $(this).parent().addClass('open');
            } else {
                $(this).parent().removeClass('open');
            }

            return false;

        });

    }

}

/* image ratio */
function imgRatio() {

    var
        ir      =   $('img[class^="ir_"]')
    ,   ir43    =   (4/3)
    ,   ir169   =   (16/9)
    ;

    if (ir.length > 0) {

        ir.each(function(){
                          
			var
				isClass =   $(this).attr('class')
			,   thW     =   $(this).outerWidth()
			;

			if (isClass === 'ir_43') {
				$(this).parent().css('height', (thW/ir43) + 'px');
			} else if (isClass === 'ir_169') {
				$(this).parent().css('height', (thW/ir169) + 'px');
			}

        });

    }

}

/*
 * footer - 吏덈낯�꾪솕踰덊샇
 */
function cdcTel() {

	var
		cdctel = $('.footer .f_navigation .cdcinfo')
	,	status = wCatch()
	;
	if (status == 'm'){
		$(cdctel).html('<a href=\"tel:1339\">吏덈퀝愿�由щ낯遺� 肄쒖꽱�� 1339</a>');
	}else{
		$(cdctel).html('吏덈퀝愿�由щ낯遺� 肄쒖꽱�� 1339');
	}
}

/*
 * �뺤쭊�� �대룞寃쎈줈 toggle
 */

function personMove(){

	$.p_listClose = function ( whereTag ) {//open class ��젣
		$(whereTag).each(function (){
			$(this).removeClass("open");
		});
		return false;
	};
	$.p_listOpen = function ( whereTag ) {//open class 異붽�
		$(whereTag).each(function (){
			$(this).addClass("open");
		});
		return false;
	};

	var p_move = $('.pson_move_list'),
		p_list = $(p_move).find(".in_list"),
		p_listOne = $(p_list).find(".onelist"),
		p_more_link = $(p_list).find(".onelist > a");

	if ( p_move.length > 0 ){
		$.p_listClose( $(p_listOne) );
		//$.p_listOpen( $(p_list).find(">.onelist:nth-child(1)") );

		$(p_more_link).click(function( event ){
			$(this).parent().toggleClass("open");
			event.preventDefault();
		});

		$("#pson_moveAll_open").click(function( event ){
			$.p_listOpen( $(p_listOne) );
			event.preventDefault();
		});

		$("#pson_moveAll_close").click(function( event ){
			$.p_listClose( $(p_listOne) );
			event.preventDefault();
		});
	}
}

/*
 * �レ옄 媛� 肄ㅻ쭏 異붽� (�쒕룄蹂� 諛쒖깮 �꾪솴, 援�궡�꾪솴, 援�쇅�꾪솴 ��)
 */

function num_comma( where ){
	$.fn.n_comma = function(){
		return this.each(function (){
			if ( $(this).text().indexOf(",") < 0 ){
				$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
			}			
		});
	};
	$(where).n_comma();
}

/*
 * toggle button box
 */
function toggleBox(){
	var width = $(window).outerWidth();
	var btn = $("button[data-button = 'box_toggle']");
	var tBox = $(".box_toggle");
	
	if ( width <= 767 ){
		$(tBox).find(".inner").hide();
	}else{
		$(tBox).find(".inner").show();
	}

	$(btn).click(function (e){
		e.preventDefault();
		$(this).parent().parent(".box_toggle").toggleClass("open");
		$(this).parent().parent(".box_toggle").find(".inner").slideToggle("slow");
	});	
}

/**
 * �낅젰媛믪뿉 �뱀젙 臾몄옄(chars)媛� �덈뒗吏� 泥댄겕
 * �뱀젙 臾몄옄瑜� �덉슜�섏� �딆쑝�� �� �� �ъ슜
 * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
 *         alert("�대쫫 �꾨뱶�먮뒗 �뱀닔 臾몄옄瑜� �ъ슜�� �� �놁뒿�덈떎.");
 *     }
 */
function containsChars(input,chars) {
    for (var inx = 0; inx < input.length; inx++) {
       if (chars.indexOf(input.charAt(inx)) != -1)
           return true;
    }
    return false;
}

$(function () {
	wCatch();
	skipIEer();
	hiddenSkipNavigation();
	fst();
	setTimeout(gnbSubH, 80);
	gnb();
	globalSearch();
	globalMenu();
	globalMenuTgl();
	fRelate();
	lnbAddClass();
	tmGlobalMenuOn();
	newWindow('.wrap');
	tabSelected();
	boxImage();
	mediaDescript();
	setTimeout(fBtn, 240);
	tableToHtml5();
	listTgl();
	imgRatio();
	cdcTel();
	personMove();
	toggleBox();
});

$(window).resize(function () {
	gnbSubH();
	globalSearch();
	btnTop();
	mediaDescript();
	imgRatio();
	cdcTel();
});

$(window).scroll(function () {
	btnTop();
});