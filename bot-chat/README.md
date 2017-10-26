tutorial
1 tao bot va gen key: https://anchoimiennam.slack.com/apps/A0F7YS25R-bots
1.1 add bot vao chenal
2 tao file index.js
3 copy code vao index.js
-------------------------------------------------------
var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var token = process.env.SLACK_API_TOKEN || 'KEYGEN';

var rtm = new RtmClient(token);
rtm.start();
let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'general') { channel = c.id }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('---------------------------------------------------------:', message);
  if(message.text == 'Tăng tuổi thọ' || 'tang tuoi tho' == message.text){
    
  }
  rtm.sendMessage("gái nè", channel);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});
--------------------------------------------------------------------------------------------------------
4 chay lenh : node index.js
5 co server nodejs thi build lên

https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
heroku git:pull -a slack-botchat
1. Prepare the app
git clone https://git.heroku.com/slack-botchat.git
2. Deploy the app
heroku ps:scale web=1
3. Scale the app
heroku ps
heroku ps:scale web=0
heroku ps:scale web=1
4. Run the app locally
heroku local web
5. Push local changes
git add .
git commit -m "Demo"
git push heroku master
heroku open
6. View logs
heroku logs --tail




get images link from voz
var js = document.createElement('script');
		js.type = 'text/javascript';
		js.async = true;
		js.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
		document.body.appendChild(js);

    var list = $('.voz-post-message img:not(.inlineimg)')

    var arrList = [];
    [].forEach.call(list, function(item){
      if(item.src && item.src.indexOf('voz') == -1){
        arrList.push(item.src);
      }
    })
    JSON.stringify(arrList)