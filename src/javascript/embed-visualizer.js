const urlregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function toMD(text, options = {}){

  if (options.bold !== false){
    text = text.replace(/<b>(.*?)<\/b>/ig,'**$1**');
  };

  if (options.italics !== false){
    text = text.replace(/<i>(.*?)<\/i>/ig,'*$1*');
  };

  if (options.underline !== false){
    text = text.replace(/<u>(.*?)<\/u>/ig,'__$1__');
  };

  if (options.strike !== false){
    text = text.replace(/<strike>(.*?)<\/strike>/ig, '~~$1~~');
  };

  if (options.stripLinks === true){
    text = text.replace(/<a href="(.*?)">(.*?)<\/a>/ig, '$2');
  };

  if (options.hyperlinks !== false){
    text = text.replace(/<a href="(.*?)">(.*?)<\/a>/ig, '[$2]($1)');
  };

  if (options.code !== false){
    text = text.replace(/<div class="codeblock">(.*?)<\/div>/ig,'```$1```');
  };

  if (options.inlineCode !== false){
    text = text.replace(/<code>(.*?)<\/code>/ig, '`$1`');
  };

  if (options.emoji === true){
    text = text.replace(/<img class="embed-description-emojis" name="(\w{1,})" animated="(\w{0,})" src="https:\/\/cdn.discordapp.com\/emojis\/(\d{1,})" width="\d{1,}px" height="\d{1,}px">/g, '<$2:$1:$3>');
  };

  //Remove any br codes
  text = text.replace(/<br>/gi,'\n');

  //replace newly added divs as a linebreak
  text = text.replace(/<div>(.*?)<\/div>/gi,'$1\n');

  //replace anything with nothing
  text = text.replace(/<[^:>]*>/gi,'');

  return text;
};

function toHTML(text, options = {}){

  if (options.bold !== false){
    text = text.replace(/\*\*(.*?)\*\*/ig,'<b>$1</b>');
  };

  if (options.italics !== false){
    text = text.replace(/\*(.*?)\*/ig,'<i>$1</i>');
  };

  if (options.underline !== false){
    text = text.replace(/\_\_(.*?)\_\_/ig,'<u>$1</u>');
  };

  if (options.strike !== false){
    text = text.replace(/~~(.*?)~~/ig, '<strike>$1</strike>');
  };

  if (options.hyperlinks !== false){
    text = text.replace(/\[(.*?)\]\((.*?)\)/ig, '<a href="$2">$1</a>');
  };

  if (options.code !== false){
    text = text.replace(/\`\`\`(.*?)\`\`\`/ig,'<div class="codeblock">$1</div>');
  };

  if (options.inlineCode !== false){
    text = text.replace(/\`(.*?)\`/ig, '<code>$1</code>');
  };

  if (options.emoji === true){
    text = text.replace(/(<|&lt;)?(a)?:?(\w{2,32}):(\d{17,19})(>|&gt;)?/g,'<img class="embed-description-emojis" name="$3" animated="$2" src="https://cdn.discordapp.com/emojis/$4" width="15px" height="15px"></img>');
  };

  return text;
};

function getEmbedObject(){
  const embed = {};
  const timestamp = $('.embed-footer-timestamp').attr('ts') || null;

  embed.title = toMD($('.embed-title').html().trim(), {
    stripLinks: true,
    hyperlinks: false,
    code: false,
    inlineCode: false
  })?.trim() || null;

  embed.description = toMD($('.embed-description').html().trim(), {
    emoji: true
  }) || "";

  embed.url = $('.embed-title a').attr('href') || null;

  embed.color = rgb2dec(...getRGB($('.message-embed').css('border-left-color'))) || 0;

  embed.timestamp = timestamp && timestamp !== 'inactive' ? new Date(timestamp) : null;

  embed.footer = {
    icon_url: $('.footer-image img').attr('src') || null,
    text: $('.footer-text p').text().trim() || null
  };
  embed.thumbnail = {
    url: $('.embed-thumbnail img').attr('src') || null
  };
  embed.image = {
    url: $('.embed-image img').attr('src') || null
  };
  embed.author = {
    name: $('.embed-author').text().trim() || null,
    url: $('.embed-author a').attr('href') || null,
    icon_url: $('.embed-author img').attr('src') || null
  };
  embed.fields = [];
  $('.embed-field').each(function(){
    embed.fields.push({
      name: toMD($(this).find('h5').html().trim(), {
        hyperlinks: false,
        codeblock: false,
        inlineCode: false,
        emoji: true
      }),
      value: toMD($(this).find('p').html().trim(), {
        emoji: true
      }),
      inline: $(this).hasClass('inline')
    });
  });
  return embed;
};

function rgb2dec(r, g, b){
  return Number(r) * 65536 + Number(g) * 256 + Number(b);
}

function getRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? [match[1],match[2],match[3]] : [[0],[0],[0]];
}

function MD(text = ''){

  const res = text
  // convert bold
  .replace(/\*\*(.*?)\*\*/ig,'<b>$1</b>')
  // convert italics
  .replace(/\*(.*?)\*/ig,'<i>$1</i>')
  // replace underline
  .replace(/\_\_(.*?)\_\_/ig,'<u>$1</u>')
  // replace strikethrough
  .replace(/\~\~(.*?)\~\~/ig, '<strike>$1</strike>')

  return res;
};

function copyToClipboard(string){
  const notifier =  $('.copied-information');
  const el = document.createElement('textarea');

  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  notifier.slideDown(300);

  setTimeout(function(){
    notifier.slideUp(300);
  }, 5000);
};

function sendError(opt = {}){
  $('.error-title').text(opt.title || '');
  $('.error-description').text(opt.description || '');
  $('.error-message').show(300);

  setTimeout(function(){
    $('.error-message').hide(300);
  }, 15000);
};

$(document).ready(function(){
  $('.timestamp').text(`Today at ${formatAMPM(new Date())}`);

  $('.desc-char-remaining').text(2048 - $('.embed-description-editor').text().length);

  $('.error-acknowledge').click(function(){
    $('.error-message').hide(300);
  })

  $('.description-live-editor').click(function(){
    $('.description-dialogue-box').slideToggle(300);
  });

  $('.author-live-editor').click(function(){
    $('.author-dialogue-box').slideToggle(300);
  });

  $('.images-live-editor').click(function(){
    $('.images-dialogue-box').slideToggle(300);
  });

  $('.footer-live-editor').click(function(){
    $('.footer-dialogue-box').slideToggle(300);
  });

  $('.add').click(function(){

    if ($('.embed-field').length >= 25){
      return sendError({
        title: 'Unable to add more fields',
        description: 'Maximum number of Embed Fields reached! (Max. 25)'
      })
    };

    $('.fields-dialogue-box').slideToggle(300);
    if (!$('.embed-not-ready').length){
      $('.embed-fields').append(
        `<div class="embed-field embed-not-ready">
          <h5></h5>
          <p></p>
        </div>`
      );
    };
  });

  $('.confirm-button').click(function(){

    if (!$('.embed-field-name-editor').val().length){
      return sendError({
        description: 'Embed field name must not be blank!'
      });
    } else if (!$('.embed-field-value-editor').val().length){
      return sendError({
        description: 'Embed field values must not be blank!'
      });
    };

    $('.embed-inline-toggle').prop('checked', false);
    $('.embed-not-ready').removeClass('embed-not-ready');
    $('.fields-dialogue-box input').val('');
    $('.fields-dialogue-box').slideToggle(300);
  });

  $('.cancel-button').click(function(){
    $('.embed-inline-toggle').prop('checked', false);
    $('.embed-fields').children().last().remove();
    $('.fields-dialogue-box input').val('');
    $('.fields-dialogue-box').slideToggle(300);
  });

  $('.remove').click(function(){
    if ($('.embed-fields').children().last().hasClass('embed-not-ready')){
      sendError({
        title: 'Unable to Remove field!',
        description: 'You still have an unfinished field edit. Add it first or cancel it.'
      });
      $('.fields-dialogue-box').show(300);
    } else {
      $('.embed-fields').children().last().remove();
    };
  });

  $(".embed-title-editor").on("keyup", function() {
    var value = toHTML($(this).val(), {
      hyperlinks: false,
      code: false,
      inlineCode: false
    });

    const title = $('.embed-title');

    if (title.children('a').length){
      $('.embed-title a').html(value);
    } else {
      title.html(value);
    };
  });

  $('.embed-url-editor').on("keyup", function(){
    var value = $(this).val();

    const title = $('.embed-title');
    const titletext = title.text();

    if (!urlregex.test(value)){
      title.empty();
      title.text(titletext)
    } else {
      title.empty();
      if (!title.children('a').length){
        title.append(`<a href="${value}">${titletext}</a>`)
      } else {
        $('.embed-title a').attr('href', value);
      }
    };
  });

  $('.embed-description-editor').on('keyup', function(){
    var value = toHTML($(this).html(), {
      emoji: true
    });

    if ($(this).text().length > 2046){
      $('.desc-char-remaining').css('color', 'indianred');
      $('.desc-char-remaining').text(2048 - $('.embed-description-editor').text().length);
    } else {
      $('.desc-char-remaining').css('color', 'forestgreen');
      $('.desc-char-remaining').text(2048 - $('.embed-description-editor').text().length);
    };

    if ($(this).text().length > 2046){
      return sendError({
        title: 'Embed#description max char Reached!',
        description: 'You have exceedded the max character length of 2046 for description.'
      })
    }

    const description = $('.embed-description');
    description.html(value);
  });

  $('.embed-author-image-editor').on('keyup', function(){
    var value = $(this).val();

    $('.embed-author img').attr('src', value);
    $('.embed-author-image').show();
  });

  $('.embed-author-image').on('error', function(){
    $(this).hide();
  })

  $('.embed-author-url-editor').on("keyup", function(){
    var value = $(this).val();

    $('.embed-author a').attr('href', value);
  });

  $(".embed-author-name-editor").on("keyup", function() {
    var value = $(this).val();

    const author = $('.embed-author');

    if (author.children('a').length){
      $('.embed-author a').text(value);
    } else {
      author.text(value);
    };
  });

  $(".embed-field-name-editor").on("keyup", function() {
    var value = toHTML($(this).val(), {
      stripLinks: true,
      code: false,
      inlineCode: false,
      emoji: true
    });

    $('.embed-not-ready h5').html(value);
  });

  $(".embed-field-value-editor").on("keyup", function() {
    var value = toHTML($(this).val(),{
      emoji: true
    })

    $('.embed-not-ready p').html(value);
  });

  $('.embed-inline-toggle').click(function(){
    if ($('.embed-inline-toggle').is(':checked')){
      $('.embed-not-ready').addClass('inline');
    } else {
      $('.embed-not-ready').removeClass('inline')
    };
  });

  $('.embed-thumbnail-editor').on('keyup', function(){
    var value = $(this).val();

    if (!value){
      $('.embed-thumbnail').hide();
    }

    $('.embed-thumbnail img').attr('src', value);
    $('.embed-thumbnail img').show();
  });

  $('.embed-thumbnail img').on('error', function(){
    $(this).hide();
  });

  $('.embed-image-editor').on('keyup', function(){
    var value = $(this).val();

    $('.embed-image img').attr('src', value)
    $('.embed-image img').show();
  });

  $('.embed-image img').on('error', function(){
    $(this).hide();
  });

  $('.embed-image-editor').on('keyup', function(){
    var value = $(this).val();
  });

  $('.embed-footer-image-editor').on('keyup', function(){
    var value = $(this).val();

    $('.embed-footer img').attr('src', value);
    $('.embed-footer img').show();
  });

  $('.embed-footer img').on('error', function(){
    $(this).hide();
  });

  $(".embed-footer-text-editor").on("keyup", function() {
    var value = $(this).val();

    const timestamp = $('.embed-footer-timestamp');

    if (timestamp.val()){
      value = `<p> ${value} <span class="embed-footer-timestamp">${timestamp.val()}</span> </p>`
    } else {
      value = `<p> ${value} </p>`
    }

    $('.embed-footer p').html(value);
  });

  $('.embed-footer-timestamp-toggle').click(function(){
    $('.embed-footer-timestamp').text('')
    if ($('.embed-footer-timestamp-toggle').is(':checked')){
      const date = new Date();

      $('.embed-footer-timestamp').attr('ts', date);
      $('.embed-footer-timestamp').text(` • Today at ${formatAMPM(date)}`)
    } else {
      $('.embed-footer-timestamp').attr('ts', 'inactive');
    };
  });

  $('.color-picker').on('input',function(){
    const hex = $(this).val();

    $('.color-name').text(hex.toUpperCase());
    $('.color-btn').css('background-color', hex);
    $('.message-embed').css('border-left', `5px solid ${hex}`)
  });

  $('.clipboard-json').click(function(){
    if ($('.embed-fields').children().last().hasClass('embed-not-ready')){
      sendError({
        title: 'Unable to copy to clipboard!',
        description: 'You still have an unfinished field edit. Add it first or cancel it.'
      });
      $('.fields-dialogue-box').show(300);
      return;
    };

    copyToClipboard(JSON.stringify(getEmbedObject(), null, 2));
  });

  $('.clipboard-greeter').click(function(){

    if ($('.embed-fields').children().last().hasClass('embed-not-ready')){
      sendError({
        title: 'Unable to copy to clipboard!',
        description: 'You still have an unfinished field edit. Add it first or cancel it.'
      });
      $('.fields-dialogue-box').show(300);
      return;
    };

    const embed = getEmbedObject();
    const text = [''];
    let index = 0;

    function checkTextLength(){
      if (text[index].length > 2000){
        text.push(''); index++;
      };
    };

    function addToText(tex){
      checkTextLength();
      text[index] = `${text[index]} ${tex}`;
    };

    addToText(`-title:[${embed.title || ' '}]`);
    addToText(`-description:[${embed.description || ' '}]`);
    addToText(`-url:[${embed.url || ' '}]`);
    addToText(`-color:[#${embed.color ? embed.color.toString(16) : '000000'}]`);
    addToText(`-footer=image:[${embed.footer.icon_url || ' '}]`);
    addToText(`-footer=text:[${embed.footer.text || ' '}]`);
    addToText(`-thumbnail:[${embed.thumbnail.url || ' '}]`);
    addToText(`-image:[${embed.image.url || ' '}]`);
    addToText(`-author=name:[${embed.author.name || ' '}]`);
    addToText(`-author=url:[${embed.author.url || ' '}]`);
    addToText(`-author=image:[${embed.author.icon_url || ' '}]`);

    if (text.length === 1){
      copyToClipboard(text[0]);
    } else {
      sendError({
        title: 'Cannot be pasted to clipboard',
        description: 'Text output exceeded 2048 chars.'
      })
    };
  });

  $('[contenteditable]').on('paste', function(e){
    e.preventDefault();
    document.execCommand('insertText', false, e.originalEvent.clipboardData.getData('text/plain'));
  });

  $('.reset').click(function(){
    $('.embed-title-editor').val('');
    $('.embed-url-editor').val('');
    $('.embed-title').empty();

    $('.embed-description-editor').text('');
    $('.embed-description').empty();
    $('.desc-char-remaining').text('2048');
    $('.desc-char-remaining').css('color', 'forestgreen');

    $('.embed-author-name-editor').val('');
    $('.embed-author-image-editor').val('');
    $('.embed-author-url-editor').val('');
    $('.embed-author a').text('');
    $('.embed-author a').attr('href','');
    $('.embed-author img').attr('src','');

    $('.embed-fields').empty();

    $('.embed-image-editor').val('');
    $('.embed-image img').attr('src','');
    $('.embed-thumbnail-editor').val('');
    $('.embed-thumbnail img').attr('src','');

    $('.embed-footer-image-editor').val('');
    $('.embed-footer-text-editor').val('');
    $('.embed-footer-timestamp-toggle').prop('checked', false);
    $('.footer-image img').attr('src','');
    $('.embed-footer p').html('<p></p>');
    $('.embed-footer-timestamp').text('');

    $('.color-picker').val('#000000');
    $('.color-name').text('#000000');
    $('.color-btn').css('background-color', '#000000');
    $('.message-embed').css('border-left', `5px solid #000000`);
  });
});
