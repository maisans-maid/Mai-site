$(function(){

  var $items = $('#item-list');

  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api.jikan.moe/v3/season/2021/winter',
  //   success: function(data){
  //     $.each(data.anime, function(index, item){
  //       $items.append(`<li class="item-list"> ${item.title} </li>`);
  //     });
  // }});

  $.getJSON('https://raw.githubusercontent.com/maisans-maid/Mai/dev/assets/json/market.json', function(data, status){

    $.each(data, function(_, item){
      $items.append(`
        <article class="item ${item.type}" sort-id="${parseInt(item.id)}" sort-price="${item.price}" sort-name="${item.name}">
          <h3>${item.name}</h3>
          <div class="item-price"> Price: ${item.price || 'FREE'}</div>
          <div class="preview">
            <img src="${item.assets.link}" class="image-${item.type}">
            <div class="overlay">
              <div class="overlay-text">
              <p> ${item.description} </p>
              <p> To buy: m!buyitem ${item.id} </p>
              <p> To equip: m!equipitem ${item.id} </p>
              </div>
            </div>
          </div>
          <div class="item-tags">
            <div class="item-tags-type" item-type="${item.type}"> Type: ${item.type} </div>
            <div class="item-tags-${item.deletable ? 'deletable' : 'not-deletable'}"> ${item.deletable ? '' : 'Not'} Deletable </div>
            <div class="item-tags-${item.giftable ? 'giftable' : 'not-giftable'}"> ${item.giftable ? '' : 'Not'} Giftable </div>
          </div>
        </article>
      `)
    });
  });
});
