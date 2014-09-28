﻿//includes
$(function () {
    $("#profile").load("includes/profile.html");
    $("#works").load("includes/works.html");
    $("#services").load("includes/services.html");
    $("#github").load("includes/github.html");
    $("contact").load("includes/contact.html");
});


/**-------------------------------------------------- Parallax Effect----------------------------**/
/* detect touch */
if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
}
if (!$("html").hasClass("touch")) {
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function (i) {
        if ($(this).innerHeight() <= h) {
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize() {
    var windowH = $(window).height();
    $(".background").each(function (i) {
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e) {
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function (i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if (bottomWindow > top && topWindow < bottom) {
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = -imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}
/**-----------------------------------------------EO-- Parallax Effect----------------------------**/

/*************************************************** Nav Bar ****************************************/
//affix the navbar after scroll below main 
$('#nav').affix({
    offset: {
        top: $('.main').height() - $('#nav').height()
    }
});

/***********************************************EO   Nav Bar ****************************************/

/************************************************** smooth scroll ***********************************/

//highlight the top nav as scrolling occurs 
$('body').scrollspy({ target: '#nav' })

//smooth scrolling for scroll to top 
$('.scroll-top').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 1000);
})

//smooth scrolling for nav sections 
$('#nav .navbar-nav li>a').click(function () {
    var link = $(this).attr('href'); 
    var posi = $(link).offset().top;
    $('body,html').animate({ scrollTop: posi }, 700);
});

$("#scroll_profile").click(function () {
    $('html,body').animate({
        scrollTop: $("#profile").offset().top
    },
        'slow');
});

$("#scroll-top, #push-top").click(function () {
    $('html,body').animate({
        scrollTop: $("#main").offset().top
    },
        'slow');
});
/***********************************************EO   smooth scroll***********************************/

//icon bar
$(document).ready(function () {
    $("#icon-bar").on("click", function () {        
        $("div.navbar-header  i").toggle();
    });
});