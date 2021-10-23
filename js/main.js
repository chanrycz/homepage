(function ($) {
	'use strict';
    
    // Lazy Loading Images
    function lazyLoadImg() {
		$('section.active img.lazyload, section.active+section img.lazyload').each(function() {
		    $(this).one("load", function() {
              $(this).addClass('loaded');
            }).each(function() {
              if(this.complete) {
                  $(this).trigger('load');
              }
            });
            
		    $(this).attr({
                src: $(this).attr('data-src')
            }).removeAttr('data-src').removeClass('lazyload').addClass('lazyloaded');
		});
    }
    
    
    // Navbar change color to contrast with bg
	function NavbarColor() {
		if ($('.pp-section.active').hasClass('navbar-is-white')) {
			$('.navbar-desktop').addClass('navbar-white');
			$('.navbar-bottom').addClass('navbar-bottom-white');
			$('.navbar-mobile').addClass('navbar-white');
		} else {
			$('.navbar-desktop').removeClass('navbar-white');
			$('.navbar-bottom').removeClass('navbar-bottom-white');
			$('.navbar-mobile').removeClass('navbar-white');
		}
	}
	
	
	// Full Page Scroll
	if ($('#fullpage').length > 0) {
	    
	    $(document).ready(function() {
        	$('#fullpage').fullpage({
        		//Navigation
        		menu: '#menu',
        		lockAnchors: false,
        		anchors:['firstPage', 'secondPage'],
        		navigation: false,
        		showActiveTooltip: false,
        		slidesNavigation: false,
        		slidesNavPosition: 'bottom',
        
        		//Scrolling
        		css3: true,
        		scrollingSpeed: 700,
        		autoScrolling: true,
        		fitToSection: true,
        		fitToSectionDelay: 1000,
        		scrollBar: false,
        		easing: 'easeInOutCubic',
        		easingcss3: 'ease',
        		loopBottom: false,
        		loopTop: false,
        		loopHorizontal: true,
        		continuousVertical: false,
        		continuousHorizontal: false,
        		scrollHorizontally: false,
        		interlockedSlides: false,
        		dragAndMove: false,
        		offsetSections: false,
        		resetSliders: false,
        		fadingEffect: false,
        		normalScrollElements: '#element1, .element2',
        		scrollOverflow: false,
        		scrollOverflowReset: false,
        		scrollOverflowOptions: null,
        		touchSensitivity: 15,
        		bigSectionsDestination: null,
        
        		//Accessibility
        		keyboardScrolling: true,
        		animateAnchor: true,
        		recordHistory: true,
        
        		//Design
        		controlArrows: true,
        		verticalCentered: true,
        		sectionsColor : ['#ccc', '#fff'],
        		paddingTop: '3em',
        		paddingBottom: '10px',
        		fixedElements: '#header, .footer',
        		responsiveWidth: 0,
        		responsiveHeight: 0,
        		responsiveSlides: false,
        		parallax: false,
        		parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        		dropEffect: false,
        		dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
        		waterEffect: false,
        		waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
        		cards: false,
        		cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},
        
        		//Custom selectors
        		sectionSelector: '.section',
        		slideSelector: '.slide',
        
        		lazyLoading: true,
        
        		//events
        		onLeave: function(origin, destination, direction){},
        		afterLoad: function(origin, destination, direction){},
        		afterRender: function(){},
        		afterResize: function(width, height){},
        		afterReBuild: function(){},
        		afterResponsive: function(isResponsive){},
        		afterSlideLoad: function(section, origin, destination, direction){},
        		onSlideLeave: function(section, origin, destination, direction){}
        	});
        
        	//methods
        	$.fn.fullpage.setAllowScrolling(false);
        });

		$('#pagepiling').pagepiling({
			scrollingSpeed: 300,
			navigation: false,
			loopBottom: true,
			loopTop: false,
			touchSensitivity: 10,
			afterRender: function (anchorLink, index) {
				NavbarColor();
				$('.navbar-nav-mobile li').eq(index-1).addClass("active");
				$('.navbar-nav-mobile li a').eq(index-1).addClass("active");
				lazyLoadImg();
			},
			afterLoad: function (anchorLink, index) {
				$('.pp-section .intro').removeClass('animate');
				$('.active .intro').addClass('animate');
				NavbarColor();
				$('.navbar-nav-mobile li').removeClass("active");
				$('.navbar-nav-mobile li a').removeClass("active");
				$('.navbar-nav-mobile li').eq(index-1).addClass("active");
				$('.navbar-nav-mobile li a').eq(index-1).addClass("active");
				if (index == 1) {
				    $('.switchText').cycleText('resume');
				} else {
				    $('.switchText').cycleText('pause');
				}
				lazyLoadImg();
			}
		});
	}

    var closeEventAdd = false;
	// Window Load Animation
	$(window).on('load', function () {
    	// Delayed events
		setTimeout(function(){
		    // Enable change page actions
		    $.fn.pagepiling.setKeyboardScrolling(true);
		    $.fn.pagepiling.setAllowScrolling(true);
		    $.fn.pagepiling.setAllowTouch(true);
		    
		    // Title page line animation
		    $('.line').addClass('active');
            
    	    // Sidebar open
        	$('.toggler').on('click', function () {
			    $.fn.pagepiling.setKeyboardScrolling(false);
			    $.fn.pagepiling.setAllowScrolling(false);
			    $.fn.pagepiling.setAllowTouch(false);
        		$('body').addClass('menu-is-open');
        		if (!closeEventAdd) {
                    // Sidebar close
                	$('.close, .click-capture').on('click', function () {
    			        $.fn.pagepiling.setKeyboardScrolling(true);
    			        $.fn.pagepiling.setAllowScrolling(true);
    			        $.fn.pagepiling.setAllowTouch(true);
                		$('body').removeClass('menu-is-open');
                	});
                	closeEventAdd = true;
        		}
        	});
		}, 200);
	});


	// Link event (in order to execute project link animation and anchor links for menu)
	$("a").click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		if ( !url.startsWith("#") ){
		    if ( $(this).parent().parent().hasClass('social-icons') ) {
		        // Social icons
		        window.open(url, '_blank');
		    } else {
    		    // Normal links (not anchor links or social icons)
    			$.fn.pagepiling.setKeyboardScrolling(false);
    			$.fn.pagepiling.setAllowScrolling(false);
    			$.fn.pagepiling.setAllowTouch(false);
    			$('.navbar').fadeOut();
    			$('.navbar-bottom').fadeOut();
    			$('.container').fadeOut();
    			$('.progress-nav').fadeOut();
    			$('.scroll-wrap').fadeOut();
    			setTimeout(function(){
    				$('.section .intro').addClass("remove-blur");
    			},200);
    			
    			
    			// Special method of changing url for iOS devices
    			var iOSiPadOS = /^iP/.test(navigator.platform) || /^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4;
    			
    			setTimeout(function(){
    			    if (iOSiPadOS) {
    				    window.location.replace(url);
    			    } else {
    			        window.location.href = url;
    			    }
    			}, 1000);
    			
    			// UI reappears after 7 seconds (In case it opens in another app for PWAs)
    			setTimeout(function(){
    			    $('.navbar').fadeIn();
    			    $('.navbar-bottom').fadeIn();
    			    $('.container').fadeIn();
    			    $('.progress-nav').fadeIn();
    		    	$('.scroll-wrap').fadeIn();
    			    $('.section .intro').removeClass("remove-blur");
    			    $.fn.pagepiling.setKeyboardScrolling(true);
    			    $.fn.pagepiling.setAllowScrolling(true);
    			    $.fn.pagepiling.setAllowTouch(true);
    			}, 7000);
		    }
		} else {
		    // Anchor links (mobile sidebar links)
			$.fn.pagepiling.setKeyboardScrolling(true);
			$.fn.pagepiling.setAllowScrolling(true);
			$.fn.pagepiling.setAllowTouch(true);
    		$('body').removeClass('menu-is-open');
    		$('.navbar-nav-mobile li a').removeClass('active');
    		$(this).addClass('active');
    		var anchors = [];
            $("section.section").each(function() {
                anchors.push($(this).attr('id'));
            });
		    $.fn.pagepiling.moveTo(anchors.indexOf(url.slice(1))+1);
		}
	});

})(jQuery);