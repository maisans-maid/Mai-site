$(document).ready(function(){
  $(".nav-btn").click(function(){

    var attr = $(this).attr('data-li');

    $('.nav-btn').removeClass('active');
    $(this).addClass('active');

    $('.item').hide();

    if (attr === 'all'){
      $('.item').show();
    } else if (attr === 'bg'){
      $('.background').show();
    } else if (attr === 'wr'){
      $('.wreath').show();
    } else if (attr === 'pt'){
      $('.pattern').show();
    } else if (attr === 'em'){
      $('.emblem').show();
    } else if (attr === 'ht'){
      $('.hat').show();
    };
  });

  $('.col-2-btn').click(function(){
    $('.col-2-btn').removeClass('active');
    $(this).addClass('active');

    const attr = $(this).attr('data-li');

    $('.command').hide();
    $(`.${attr}`).show();
  });

  $('.checkbox-expand').click(function(){
    if ($('.checkbox-expand').is(':checked')){
      $('.command-details').slideDown(300);
    } else {
      $('.command-details').slideUp(300);
    }
  })

  // Use event delegation for appended contents
  $(document).on('click',  '.command', function(){
    const attr = $(this).attr('name');
    $(`.clock-for-${attr}`).toggle(300);
    $(`.${attr}-1`).slideToggle(300);
  });

  $('.gear-icon').click(function(){
    $('.market-options').toggle(300);
  });

  $('.market-options').click(function(){
    $('.market-options').hide(300);

    const attr = $(this).attr('sort');

    if (attr === 'id'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-id'));
        var contentB =parseInt( $(b).attr('sort-id'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'id-dec'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-id'));
        var contentB =parseInt( $(b).attr('sort-id'));
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'price'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-price'));
        var contentB =parseInt( $(b).attr('sort-price'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'price-dec'){
      $('.item').sort(function(a,b){
        var contentA =parseInt( $(a).attr('sort-price'));
        var contentB =parseInt( $(b).attr('sort-price'));
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'name'){
      $('.item').sort(function(a,b){
        var contentA = $(a).attr('sort-name');
        var contentB = $(b).attr('sort-name');
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo('.items');
    } else if (attr === 'name-dec'){
      $('.item').sort(function(a,b){
        var contentA = $(a).attr('sort-name');
        var contentB = $(b).attr('sort-name');
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
      }).appendTo('.items');
    }
  })


// REmove command category if certain width is reached
 $(window).resize(function() {
   if ($(this).width() < 700) {
     $('.content-commands-column-2-left').hide('slow');
   } else {
     $('.content-commands-column-2-left').show('slow');
   }
 });

});

$('.market-options').hide();
