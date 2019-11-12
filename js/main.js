$(document).ready(function(){
    
    var active_page = $('.wrapper').attr('data-page');
    $('[data-pageNumber='+ active_page +']').addClass('item-active');
    
    $('.menu-item').mouseenter(function(){
        $('.item-active').removeClass('item-active');
        $(this).addClass('item-active');
    });
    
    $('.menu-item').mouseleave(function(){
        $('.item-active').removeClass('item-active');
        $('[data-pageNumber='+ active_page +']').addClass('item-active');
    });
});