/* Validation form */
validateForm("validation-newsletter");
validateForm("validation-cart");
validateForm("validation-user");
validateForm("validation-contact");

if(isExist($(".bt_open")))
{
    $(".bt_open").click(function(){
        var cont = $(this).data("cont");
        $(cont).slideToggle();
        $(cont).toggleClass('opening');
    }); 
}

if(isExist($(".bt_act")))
{
    $(".bt_act").click(function(){
        if (!$(this).hasClass('act')) {
            $(".bt_act").removeClass('act');
            $(this).addClass('act');
        }
    }); 
}

if(isExist($("#ytplayer")))
{
    var id = $("#ytplayer").data("id");
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer', {
            height: '410',
            width: '100%',
            mute:1,
            videoId: id,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    function onPlayerReady(event) {
        event.target.playVideo();
        player.mute();
    
    }
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
    }  
    var play = 0;
    function stopVideo() {
        player.stopVideo();
    }
    function playVideo() {
        player.playVideo();
        play++;
    }
    $(window).scroll(function(){
        var d_top = $("#ytplayer").offset().top - $(window).height();
        if($(window).scrollTop()== d_top && play ==0) {
            // alert(play);
            $(".playVideo").click();
        }
    })

}


if(isExist($(".dm_cn")))
{
    $('body').on('click','.dm_cn .chinhanh', function(event) { 
        if (!$(this).hasClass('act')) {
            var id = $(this).data("id");
            var cont = $(this).data("cont");
            $('.dm_cn .chinhanh.act').removeClass('act');
            $(this).addClass('act');
            $.ajax({
                url:'api/iframe.php',
                type: "POST",
                dataType: 'html',
                data: {id:id},
                success: function(result){
                    $(cont).html(result);
                }
            });
        }
    });
    $('.dm_cn .chinhanh').each(function() {
        if ($(this).is(":first-child")) {
            $(this).click();
        }
    });
}


/* Lazys */
NN_FRAMEWORK.Lazys = function(){
    if(isExist($(".lazy")))
    {
        var lazyLoadInstance = new LazyLoad({
            elements_selector: ".lazy"
        });
    }
};

/* Load name input file */
NN_FRAMEWORK.loadNameInputFile = function(){
    if(isExist($(".custom-file input[type=file]")))
    {
        $('body').on('change','.custom-file input[type=file]', function(){
            var fileName = $(this).val();
            fileName = fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length);
            $(this).siblings('label').html(fileName);
        });
    }
};
NN_FRAMEWORK.Boxscroll = function(){
    $(window).scroll(function(){
        $( ".box_scroll" ).each(function() {
            // var d_top = $('#slider').offset().top + $('#slider').height();
            var d_top = $(this).prev().offset().top + $(this).prev().height();
            var w_offset = $(window).scrollTop();
            if($(window).scrollTop()> d_top) {
                $(this).addClass('scroll-fix');     
                $(this).removeClass('scroll-relative'); 
            }else{
                $(this).removeClass('scroll-fix'); 
                $(this).addClass('scroll-relative');     
            }
        });
    });
};

/* Back to top */
NN_FRAMEWORK.GoTop = function(){
    $(window).scroll(function(){
        if(!$('.scrollToTop').length) $("body").append('<div class="scrollToTop"><i class="fa-thin fa-angle-up"></i></div>');
        if($(this).scrollTop() > 100) $('.scrollToTop').fadeIn();
        else $('.scrollToTop').fadeOut();
    });

    $('body').on("click",".scrollToTop",function() {
        $('html, body').animate({scrollTop : 0},800);
        return false; 
    });
};

/* Alt images */
NN_FRAMEWORK.AltImg = function(){
    $('img').each(function(index, element) {
        if(!$(this).attr('alt') || $(this).attr('alt')=='')
        {
            $(this).attr('alt',WEBSITE_NAME);
        }
    });
};

/* Menu */
NN_FRAMEWORK.Menu = function(){
    /* Menu remove empty ul */
    if(isExist($('.menu')))
    {
        $('.menu ul li a').each(function(){
            $this = $(this);

            if(!isExist($this.next('ul').find('li')))
            {
                $this.next('ul').remove();
                $this.removeClass('has-child');
            }
        });
    }

    /* Mmenu */
    if(isExist($("nav#menu")))
    {
        $('nav#menu').mmenu({
            "extensions": ["border-full", "position-left", "position-front"],
            "navbars": [
                {
                    "position": "top",
                    "content": [
                        "prev",
                        "title",
                        "close"
                    ]
                }
            ]
        });
    }
};

/* Tools */
NN_FRAMEWORK.Tools = function(){
    if(isExist($(".toolbar")))
    {
        $(".footer").css({marginBottom:$(".toolbar").innerHeight()});
    }
};

/* Popup */
NN_FRAMEWORK.Popup = function(){
    if(isExist($("#popup")))
    {
        $('#popup').modal('show');
    }
};

/* Wow */
NN_FRAMEWORK.Wows = function(){
    new WOW().init();
};

/* Pagings */
NN_FRAMEWORK.Pagings = function(){
    /* Categories */
    if(isExist($(".paging-product")))
    {
        $('body').on("click",".paging-product",function() {
            if (!$(this).hasClass('active')) {

                $(this).parents('.paging-product-title').find(".paging-product.active").removeClass('active');
                $(this).addClass('active');

                var table = $(this).data("table");
                var type = $(this).data("type");
                var list = $(this).data("list");
                var cat = $(this).data("cat");
                var pp = $(this).data("pp");
                var cont = $(this).data("cont");
                var noibat = $(this).data("noibat");
                loadPaging("api/product.php?perpage="+pp+"&table="+table+"&type="+type+"&noibat="+noibat+"&idList="+list+"&idCat="+cat,cont);
            }
        });
        $('.paging-product.act').each(function() {
            $(this).click();
        });


    }
};

/* Ticker scroll */
NN_FRAMEWORK.TickerScroll = function(){
    if(isExist($(".news-scroll")))
    {
        $('.news-scroll').easyTicker({
            direction: 'up',
            easing: 'swing',
            speed: 'slow',
            interval: 3500,
            height: 'auto',
            visible: 3,
            mousePause: true,
            controls:{
                up: '.news-control#up',
                down: '.news-control#down',
                // toggle: '.toggle',
                // stopText: 'Stop'
            },
            callbacks:{
                before: function(ul, li){
                    // console.log(this, ul, li);
                    // $(li).css('color', 'red');
                },
                after: function(ul, li){
                    // console.log(this, ul, li);
                }
            }
        }).data('easyTicker');
    }
};

/* Photobox */
NN_FRAMEWORK.Photobox = function(){
    if(isExist($(".album-gallery")))
    {
        $('.album-gallery').photobox('a',{thumbs:true,loop:false});
    }
};

/* Comment */
NN_FRAMEWORK.Comment = function(){
    if(isExist($(".comment-page")))
    {
        $(".comment-page").comments({
            url: 'api/comment.php'
        });
    }
};

/* DatePicker */
NN_FRAMEWORK.DatePicker = function(){
    if(isExist($('#birthday')))
    {
        $('#birthday').datetimepicker({
            timepicker: false,
            format: 'd/m/Y',
            formatDate: 'd/m/Y',
            minDate: '01/01/1950',
            maxDate: TIMENOW
        });
    }
};

/* Search */
NN_FRAMEWORK.Search = function(){
    if(isExist($(".icon-search")))
    {
        $(".icon-search").click(function(){
            if($(this).hasClass('active'))
            {
                $(this).removeClass('active');
                $(".search-grid").stop(true,true).animate({opacity: "0",width: "0px"}, 200);   
            }
            else
            {
                $(this).addClass('active');                            
                $(".search-grid").stop(true,true).animate({opacity: "1",width: "230px"}, 200);
            }
            document.getElementById($(this).next().find("input").attr('id')).focus();
            $('.icon-search i').toggleClass('fa fa-search fa fa-times');
        });
    }
    if(isExist($(".search_open")))
    {
        $(".search_open").click(function(){
            $(".search_box_hide").slideToggle();
            $(".search_box_hide").toggleClass('opening');
        });
    }
};

/* Videos */
NN_FRAMEWORK.Videos = function(){
    /* Fancybox */
    // $('[data-fancybox="something"]').fancybox({
    //     // transitionEffect: "fade",
    //     // transitionEffect: "slide",
    //     // transitionEffect: "circular",
    //     // transitionEffect: "tube",
    //     // transitionEffect: "zoom-in-out",
    //     // transitionEffect: "rotate",
    //     transitionEffect: "fade",
    //     transitionDuration: 800,
    //     animationEffect: "fade",
    //     animationDuration: 800,
    //     slideShow: {
    //         autoStart: true,
    //         speed: 3000
    //     },
    //     arrows: true,
    //     infobar: false,
    //     toolbar: false,
    //     hash: false
    // });

    if(isExist($('[data-fancybox="video"]')))
    {
        $('[data-fancybox="video"]').fancybox({
            transitionEffect: "fade",
            transitionDuration: 800,
            animationEffect: "fade",
            animationDuration: 800,
            arrows: true,
            infobar: false,
            toolbar: true,
            hash: false
        });
    }
};

/* Owl Data */
NN_FRAMEWORK.OwlData = function(obj){
    if(!isExist(obj)) return false;
    var xsm_items = obj.attr("data-xsm-items");
    var sm_items = obj.attr("data-sm-items");
    var md_items = obj.attr("data-md-items");
    var lg_items = obj.attr("data-lg-items");
    var xlg_items = obj.attr("data-xlg-items");
    var rewind = obj.attr("data-rewind");
    var autoplay = obj.attr("data-autoplay");
    var loop = obj.attr("data-loop");
    var lazyLoad = obj.attr("data-lazyload");
    var mouseDrag = obj.attr("data-mousedrag");
    var touchDrag = obj.attr("data-touchdrag");
    var animations = obj.attr("data-animations");
    var smartSpeed = obj.attr("data-smartspeed");
    var autoplaySpeed = obj.attr("data-autoplayspeed");
    var autoplayTimeout = obj.attr("data-autoplaytimeout");
    var dots = obj.attr("data-dots");
    var nav = obj.attr("data-nav");
    var navText = false;
    var navContainer = false;
    var responsive = {};
    var responsiveClass = true;
    var responsiveRefreshRate = 200;

    if(xsm_items != '') { xsm_items = xsm_items.split(":"); }
    if(sm_items != '') { sm_items = sm_items.split(":"); }
    if(md_items != '') { md_items = md_items.split(":"); }
    if(lg_items != '') { lg_items = lg_items.split(":"); }
    if(xlg_items != '') { xlg_items = xlg_items.split(":"); }
    if(rewind == 1) { rewind = true; } else { rewind = false; };
    if(autoplay == 1) { autoplay = true; } else { autoplay = false; };
    if(loop == 1) { loop = true; } else { loop = false; };
    if(lazyLoad == 1) { lazyLoad = true; } else { lazyLoad = false; };
    if(mouseDrag == 1) { mouseDrag = true; } else { mouseDrag = false; };
    if(animations != '') { animations = animations; } else { animations = false; };
    if(smartSpeed > 0) { smartSpeed = Number(smartSpeed); } else { smartSpeed = 800; };
    if(autoplaySpeed > 0) { autoplaySpeed = Number(autoplaySpeed); } else { autoplaySpeed = 800; };
    if(autoplayTimeout > 0) { autoplayTimeout = Number(autoplayTimeout); } else { autoplayTimeout = 5000; };
    if(dots == 1) { dots = true; } else { dots = false; };
    if(nav == 1)
    {
        nav = true;
        navText = obj.attr("data-navtext");
        navContainer = obj.attr("data-navcontainer");

        if(navText != '')
        {
            navText = (navText.indexOf("|") > 0) ? navText.split("|") : navText.split(":");
            navText = [navText[0],navText[1]];
        }

        if(navContainer != '')
        {
            navContainer = navContainer;
        }
    }
    else
    {
        nav = false;
    };

    responsive = {
        0: {
            items: Number(xsm_items[0]),
            margin: Number(xsm_items[1])
        },
        576: {
            items: Number(sm_items[0]),
            margin: Number(sm_items[1])
        },
        768: {
            items: Number(md_items[0]),
            margin: Number(md_items[1])
        },
        992: {
            items: Number(lg_items[0]),
            margin: Number(lg_items[1])
        },
        1200: {
            items: Number(xlg_items[0]),
            margin: Number(xlg_items[1])
        }
    };

    obj.owlCarousel({
        rewind: rewind,
        autoplay: autoplay,
        loop: loop,
        lazyLoad: lazyLoad,
        mouseDrag: mouseDrag,
        touchDrag: touchDrag,
        smartSpeed: smartSpeed,
        autoplaySpeed: autoplaySpeed,
        autoplayTimeout: autoplayTimeout,
        dots: dots,
        nav: nav,
        navText: navText,
        navContainer: navContainer,
        responsiveClass: responsiveClass,
        responsiveRefreshRate: responsiveRefreshRate,
        responsive: responsive
    });

    if(autoplay)
    {
        obj.on("translate.owl.carousel", function(event){
            obj.trigger('stop.owl.autoplay');
        });

        obj.on("translated.owl.carousel", function(event){
            obj.trigger('play.owl.autoplay',[autoplayTimeout]);
        });
    }

    if(animations && isExist(obj.find("[owl-item-animation]")))
    {
        var animation_now = '';
        var animation_count = 0;
        var animations_excuted = [];
        var animations_list = (animations.indexOf(",")) ? animations.split(",") : animations;

        obj.on("changed.owl.carousel", function(event){
            $(this).find(".owl-item.active").find("[owl-item-animation]").removeClass(animation_now);
        });

        obj.on("translate.owl.carousel", function(event){
            var item = event.item.index;

            if(Array.isArray(animations_list))
            {
                var animation_trim = animations_list[animation_count].trim();

                if(!animations_excuted.includes(animation_trim))
                {
                    animation_now = 'animate__animated ' + animation_trim;
                    animations_excuted.push(animation_trim);
                    animation_count++;
                }
                
                if(animations_excuted.length == animations_list.length)
                {
                    animation_count = 0;
                    animations_excuted = [];
                }
            }
            else
            {
                animation_now = 'animate__animated ' + animations_list.trim();
            }
            $(this).find('.owl-item').eq(item).find('[owl-item-animation]').addClass(animation_now);
        });
    }
};

/* Owl Page */
NN_FRAMEWORK.OwlPage = function(){
    if(isExist($(".owl-page")))
    {
        $(".owl-page").each(function(){
            NN_FRAMEWORK.OwlData($(this));
        });
    }
};

/* Owl Page */
NN_FRAMEWORK.Slick = function(){
    if(isExist($(".slick_dt")))
    {
        $('.slick_dt').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay:true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',
            arrows:true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                    }
                },          

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                    }
                },

                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 570,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });   
    }
    if(isExist($(".slick_4")))
    {
        $('.slick_4').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay:true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',

            responsive: [

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },

                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });   
    }
    if(isExist($(".slick_3")))
    {
        $('.slick_3').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay:true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',

            responsive: [

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },

                {
                    breakpoint: 570,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });   
    }
    if(isExist($(".slick_2")))
    {
        $('.slick_2').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay:true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',

            responsive: [

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },

                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });   
    }
    if(isExist($(".slick_v")))
    {
        $('.slick_v').slick({
            dots: false,
            fade:false,
            infinite: false, 
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical:true,
            verticalSwiping:true,
            arrows:true,
            autoplay:false,
            pauseOnHover:true,
        }); 
    } 
    if(isExist($(".slick_ha")))
    {
        $('.slick_ha').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay:true,
            fade: true,
            speed:300,
            arrows: true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',
        });
    }
    if(isExist($(".slick_1")))
    {
        $('.slick_1').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay:true,
            fade: false,
            speed:300,
            arrows: false,
        });
    }

    if(isExist($(".single-item")) && isExist($(".slider-nav")))
    {
        $('.single-item').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            nextArrow: '<img src="./assets/images/slick/next-46.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-46.png" alt="Prev" class="slick-prev">',
            autoplay:true,
            speed:300,
            autoplaySpeed: 3000,
            fade: false,
            lazyLoad: 'ondemand',
            pauseOnFocus:false,
            pauseOnHover:false,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            dots: false,
            infinite: true,
            asNavFor: '.single-item',
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical:false,
            verticalSwiping:false,
            arrows:true,
            nextArrow: '<img src="./assets/images/slick/next-37.png" alt="Next" class="slick-next">',
            prevArrow: '<img src="./assets/images/slick/prev-37.png" alt="Prev" class="slick-prev">',

            autoplay:true,
            centerMode:true,
            centerPadding:0,
            speed:300,    
            slide: 'div',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },

                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 570,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]

        });
    }
};

/* Dom Change */
NN_FRAMEWORK.DomChange = function(){
    /* Video Fotorama */
    $('#video-fotorama').one('DOMSubtreeModified', function(){
        $("#fotorama-videos").fotorama();
    });

    /* Video Select */
    $('#video-select').one('DOMSubtreeModified', function(){
        $('.listvideos').change(function() 
        {
            var id = $(this).val();
            $.ajax({
                url:'api/video.php',
                type: "POST",
                dataType: 'html',
                data: {
                    id: id
                },
                beforeSend: function(){
                    holdonOpen();
                },
                success: function(result){
                    $('.video-main').html(result);
                    holdonClose();
                }
            });
        });
    });

    /* Chat Facebook */
    $('#messages-facebook').one('DOMSubtreeModified', function(){
        $(".js-facebook-messenger-box").on("click", function(){
            $(".js-facebook-messenger-box, .js-facebook-messenger-container").toggleClass("open"), $(".js-facebook-messenger-tooltip").length && $(".js-facebook-messenger-tooltip").toggle()
        }), $(".js-facebook-messenger-box").hasClass("cfm") && setTimeout(function(){
            $(".js-facebook-messenger-box").addClass("rubberBand animated")
        }, 3500), $(".js-facebook-messenger-tooltip").length && ($(".js-facebook-messenger-tooltip").hasClass("fixed") ? $(".js-facebook-messenger-tooltip").show() : $(".js-facebook-messenger-box").on("hover", function(){
            $(".js-facebook-messenger-tooltip").show()
        }), $(".js-facebook-messenger-close-tooltip").on("click", function(){
            $(".js-facebook-messenger-tooltip").addClass("closed")
        }));
    });
};

/* Cart */
NN_FRAMEWORK.Cart = function(){
    /* Add */
    $("body").on("click",".addcart",function(){
        $this = $(this);
        $parents = $this.parents(".right-pro-detail");
        var id = $this.data("id");
        var action = $this.data("action");
        var quantity = $parents.find(".quantity-pro-detail").find(".qty-pro").val();
            quantity = (quantity) ? quantity : 1;
        var color = $parents.find(".color-block-pro-detail").find(".color-pro-detail input:checked").val();
            color = (color) ? color : 0;
        var size = $parents.find(".size-block-pro-detail").find(".size-pro-detail input:checked").val();
            size = (size) ? size : 0;
        var cont = ($this.data("cont")!='') ? $this.data("cont") : '';
        if(isExist($parents.find(".color-pro-detail")) && color==0){
            alert(LANG['choose_color']);
            return false; 
        }
        if(isExist($parents.find(".size-pro-detail")) && size==0){
            alert(LANG['choose_size']);
            return false; 
        }

        if(id)
        {
            $.ajax({
                url:'api/cart.php',
                type: "POST",
                dataType: 'json',
                async: false,
                data: {
                    cmd: 'add-cart',
                    id: id,
                    color: color,
                    size: size,
                    quantity: quantity
                },
                beforeSend: function(){
                    holdonOpen();
                },
                success: function(result){
                    if(action=='addnow')
                    {
                        $('.load-price-total').html(result.totalText);
                        $('.count-cart').html(result.max);
                        $.ajax({
                            url:'api/cart.php',
                            type: "POST",
                            dataType: 'html',
                            async: false,
                            data: {
                                cmd: 'popup-cart'
                            },
                            success: function(result){
                           
                                if (cont) {
                                    $(cont).html(result);
                                    var c_top = $(cont).offset().top;
                                    $('html, body').animate({scrollTop : c_top},800);
                                }else{
                                    $("#popup-cart .modal-body").html(result);
                                    $('#popup-cart').modal('show');
                                }
                                NN_FRAMEWORK.Lazys();
                                holdonClose();
                            }
                        });
                    }
                    else if(action=='buynow')
                    {
                        window.location = CONFIG_BASE + "gio-hang";
                    }
                }
            });
        }
    });

    /* Delete */
    $("body").on("click",".del-procart",function(){
        confirmDialog("delete-procart", LANG['delete_product_from_cart'], $(this));
    });

    /* Counter */
    $("body").on("click",".counter-procart",function(){
        var $button = $(this);
        var quantity = 1;
        var input = $button.parent().find("input");
        var id = input.data('pid');
        var code = input.data('code');
        var oldValue = $button.parent().find("input").val();
        if($button.text() == "+") quantity = parseFloat(oldValue) + 1;
        else if(oldValue > 1) quantity = parseFloat(oldValue) - 1;
        $button.parent().find("input").val(quantity);
        updateCart(id,code,quantity);
    });

    /* Quantity */
    $("body").on("change","input.quantity-procart",function(){
        var quantity = ($(this).val() < 1) ? 1 : $(this).val();
        $(this).val(quantity);
        var id = $(this).data("pid");
        var code = $(this).data("code");
        updateCart(id,code,quantity);
    });

    /* City */
    if(isExist($(".select-city-cart")))
    {
        $(".select-city-cart").change(function(){
            var id = $(this).val();
            loadDistrict(id);
            loadShip();
        });
    }

    /* District */
    if(isExist($(".select-district-cart")))
    {
        $(".select-district-cart").change(function(){
            var id = $(this).val();
            loadWard(id);
            loadShip();
        });
    }

    /* Ward */
    if(isExist($(".select-ward-cart")))
    {
        $(".select-ward-cart").change(function(){
            var id = $(this).val();
            loadShip(id);
        });
    }

    /* Payments */
    if(isExist($(".payments-label")))
    {
        $(".payments-label").click(function(){
            var payments = $(this).data("payments");
            $(".payments-cart .payments-label, .payments-info").removeClass("active");
            $(this).addClass("active");
            $(".payments-info-"+payments).addClass("active");
        });
    }

    /* Colors */
    if(isExist($(".color-pro-detail")))
    {
        $(".color-pro-detail input").click(function(){
            $this = $(this).parents("label.color-pro-detail");
            $parents = $this.parents(".attr-pro-detail");
            $parents_detail = $this.parents(".grid-pro-detail");
            $parents.find(".color-block-pro-detail").find(".color-pro-detail").removeClass("active");
            $parents.find(".color-block-pro-detail").find(".color-pro-detail input").prop("checked",false);
            $this.addClass("active");
            $this.find("input").prop("checked",true);

            var id_color = $parents.find(".color-block-pro-detail").find(".color-pro-detail input:checked").val();
            var id_size = $parents.find(".size-block-pro-detail").find(".size-pro-detail input:checked").val();
            var id_pro = $this.data('idproduct');
            loadPrice(id_pro,id_color,id_size);
            
            $.ajax({
                url:'api/color.php',
                type: "POST",
                dataType: 'html',
                data: {
                    id_color: id_color,
                    id_pro: id_pro
                },
                beforeSend: function(){
                    holdonOpen();
                },
                success: function(result){
                    if(result)
                    {
                        $parents_detail.find('.left-pro-detail').html(result);
                        MagicZoom.refresh("Zoom-1");
                        NN_FRAMEWORK.OwlData($('.owl-pro-detail'));
                        NN_FRAMEWORK.Lazys();
                    }
                    holdonClose();
                }
            });
        });
    }

    /* Sizes */
    if(isExist($(".size-pro-detail")))
    {
        $(".size-pro-detail input").click(function(){
            $this = $(this).parents("label.size-pro-detail");
            $parents = $this.parents(".attr-pro-detail");
            $parents.find(".size-block-pro-detail").find(".size-pro-detail").removeClass("active");
            $parents.find(".size-block-pro-detail").find(".size-pro-detail input").prop("checked",false);
            $this.addClass("active");
            $this.find("input").prop("checked",true);

            var id_color = $parents.find(".color-block-pro-detail").find(".color-pro-detail input:checked").val();
            var id_size = $parents.find(".size-block-pro-detail").find(".size-pro-detail input:checked").val();
            var id_pro = $this.data('idproduct');
            loadPrice(id_pro,id_color,id_size);
        });
    }

    /* Quantity detail page */
    if(isExist($(".quantity-pro-detail span")))
    {
        $(".quantity-pro-detail span").click(function(){
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if($button.text() == "+")
            {
                var newVal = parseFloat(oldValue) + 1;
            }
            else
            {
                if(oldValue > 1) var newVal = parseFloat(oldValue) - 1;
                else var newVal = 1;
            }
            $button.parent().find("input").val(newVal);
        });
    }
};

/* Ready */
$(document).ready(function(){
    NN_FRAMEWORK.Lazys();
    // NN_FRAMEWORK.Tools();
    NN_FRAMEWORK.Popup();
    NN_FRAMEWORK.Wows();
    NN_FRAMEWORK.AltImg();
    NN_FRAMEWORK.GoTop();
    NN_FRAMEWORK.Boxscroll();
    NN_FRAMEWORK.Menu();
    NN_FRAMEWORK.Slick();
    NN_FRAMEWORK.OwlPage();
    NN_FRAMEWORK.Pagings();
    NN_FRAMEWORK.Cart();
    NN_FRAMEWORK.Videos();
    NN_FRAMEWORK.Photobox();
    NN_FRAMEWORK.Comment();
    NN_FRAMEWORK.Search();
    NN_FRAMEWORK.DomChange();
    // NN_FRAMEWORK.TickerScroll();
    NN_FRAMEWORK.DatePicker();
    NN_FRAMEWORK.loadNameInputFile();
});