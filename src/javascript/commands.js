$(document).ready(function(){
  $(function(){

    var $commands = $('#commands-list');

    $.getJSON('https://raw.githubusercontent.com/maisans-maid/Mai/dev/assets/json/command-database.json', function(data, status){

      $.each(data, function(_, command){

        $commands.append(`
          <div class="command ${command.group}" name="${command.name}">
           <div class="command-heading">
            <div class="command-heading-left">
              <div class="arrow-icon">
                <svg aria-hidden="true" role="img" viewBox="0 0 320 512" class="icon-expand">
                  <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                </svg>
              </div> <h1> ${command.name} </h1>
            </div>

             <div class="clock-icon clock-for-${command.name}">
               <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="0.89em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 750 850"><path d="M465 424q10 10 10 24t-10 24.5t-25 10.5t-24-10l-70-70q-10-10-10-24V194q0-15 10-25t24.5-10t24.5 10t10 25v170zM371 8q76 0 144 29t118 79t79 118t29 145t-29 144t-79 118t-118 80t-144.5 29T227 721t-118-80t-80-118T0 379t29-145t80-118t118-79T371 8zm0 649q57 0 108-22t89-60t59-88t21.5-108T627 270t-59-88t-89-59t-109-22t-107 22t-88 59t-60 88t-22 108.5T115 487t60 88t88 60t108 22z" fill="#626262"/></svg>
               <p>${command.cooldown?.time ? `${command.cooldown.time / 1000} seconds` : 'No cooldown'}</p>
             </div>
           </div>
           <div class="command-details ${command.name}-1">
            <p>Aliases: <code> ${command.aliases?.join('</code> <code>') || 'None'} </code> <br><br>
              ${String(command.description)
                // Remove custom emojis
                .replace(/<:\w{1,}:\d{17,19}>/g,'')
                // Replace markdown links
                .replace(/\[([^\]]+)\]\(([^\)]+)\)/, '<a href="$2">$1</a>')
                // Replace codeblocks
                .replace(/\`(\w{1,})\`/g, '<code>$1</code>') || 'No description'
              }<br>
              ${command.guildOnly ? ' <span class="code-style-inline-red">Not for DM</span> ' : ""}
              ${command.adminOnly ? ' <span class="code-style-inline-red">Admin</span> ' : ''}
              ${command.ownerOnly ? ' <span class="code-style-inline-red">Owner</span> ' : ''}
              ${command.permissions?.map(x => {
                return `<span class="code-style-inline-red" style="background-color:purple">${x.split('_').map(p =>
                  p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
                ).join(' ')}</span>`
              }).join(' ') || ' <span class="code-style-inline-red" style="background-color:green">Everyone</span> '}
              ${command.nsfw ? ' <span class="code-style-inline-red">NSFW</span>' : ''}
              ${command.rankcommand ? ' <span class="code-style-inline-red">Rank</span>' : ''}
              <br><br>
              Usage/Example <br>
            </p>
           </div>
          </div>
        `)
      });


      $('.command').hide();
      $('.action').show();
      $('.command-details').hide();
      $('.clock-icon').hide()
    });
  });
});
