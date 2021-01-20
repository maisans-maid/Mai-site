$(document).ready(function(){
  $('.featured-article').click(function(){
    const url = $(this).attr('href');

    return window.location.href = url;
  });

  $('.article').click(function(){
    const url = $(this).attr('href');

    return window.location.href = url;
  });
});
