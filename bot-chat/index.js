// var RtmClient = require('@slack/client').RtmClient;
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

// var bot_token = process.env.SLACK_BOT_TOKEN || 'xoxb-261552147168-tP8hxAjsL6x8JMBGjH0dDlM3';

// var rtm = new RtmClient(bot_token);

// let channel;

// // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
//     for (const c of rtmStartData.channels) {
//         if (c.is_member && c.name === 'general') { channel = c.id }
//     }
//     console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
// });

// // you need to wait for the client to fully connect before you can send messages
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
//     rtm.sendMessage("Hello!", channel);
// });

// rtm.start();


/*var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || 'xoxp-199103676401-199766584899-204864184977-ca0fc0eeb83919b6b1fa6e43eb061cc0'; //see section above on sensitive data

var web = new WebClient(token);
web.chat.postMessage('C5VLYANJG', 'test bot', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
web.chat.getMessage('C5VLYANJG', 'test bot', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
*/
/*var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var token = process.env.SLACK_API_TOKEN || 'xoxb-261552147168-tP8hxAjsL6x8JMBGjH0dDlM3';

var rtm = new RtmClient(token, {
  logLevel: 'error', // check this out for more on logger: https://github.com/winstonjs/winston
  dataStore: new MemoryDataStore() // pass a new MemoryDataStore instance to cache information
});

rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function handleRTMAuthenticated() {
  console.log('RTM client authenticated!');
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log(
    'User %s posted a message in %s channel',
    rtm.dataStore.getUserById(message.user).name,
    rtm.dataStore.getChannelGroupOrDMById(message.channel).name
  );
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});*/

var Slack_client = require('@slack/client');
var RtmClient = Slack_client.RtmClient;
var RTM_EVENTS = Slack_client.RTM_EVENTS;
var CLIENT_EVENTS = Slack_client.CLIENT_EVENTS;
var token = process.env.SLACK_API_TOKEN || 'xoxb-261552147168-tP8hxAjsL6x8JMBGjH0dDlM3';
var listGai = require('./gaiList.js');
var rtm = new RtmClient(token);
rtm.start();
let channel;
let uniList = [];

function getRandom(min, max) {
  
  while (true) {
	var randomIndex = Math.floor(Math.random() * (listGai.length - 1 - 0)) + 0;
	if(uniList.indexOf(randomIndex) == -1){
		uniList.push(randomIndex);
		return randomIndex;
	}
  }
}
var keys = [
  'gai',
  'gái'
];
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
    if (c.is_member && c.name === 'general') {
      channel = c.id
    }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  var intl = setInterval(function() {
		rtm.sendMessage("girl nè: " + listGai[getRandom(0, listGai.length - 1)], channel);
	}, 5 * 60 * 1000);
});
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  // console.log('---------------------------------------------------------:', message);
  if(message.text){
	  var strings = message.text.split(' ');
	  var hasContain = strings.some(function(item){
		  return keys.indexOf(item) > -1;
	  })
	  if (hasContain) {
		rtm.sendMessage("girl nè: " + listGai[getRandom(0, listGai.length - 1)], channel);
	  }
  }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});



// for web site

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('chat bot');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});