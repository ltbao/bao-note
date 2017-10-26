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