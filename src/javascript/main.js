$(function(){
  $('.nav-bar-toggle').on('click', function(){
    if ($('.nav-bar-links').hasClass('active')){
      $('.nav-bar-links').removeClass('active');
    } else {
      $('.nav-bar-links').addClass('active');
    }
  })
});
