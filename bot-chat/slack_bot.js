var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
let Slack_client = require('@slack/client');
let RtmClient = Slack_client.RtmClient;
let RTM_EVENTS = Slack_client.RTM_EVENTS;
let CLIENT_EVENTS = Slack_client.CLIENT_EVENTS;
let token = process.env.SLACK_API_TOKEN || 'xoxb-261552147168-tP8hxAjsL6x8JMBGjH0dDlM3';
let listGai = require('./gaiList.js');
let rtm = new RtmClient(token);
rtm.start();
let channel;
let uniList = [];
let listGaiTmp = JSON.parse(JSON.stringify(listGai));
if(localStorage.getItem('listGaiTmp')){
    listGaiTmp = JSON.parse(localStorage.getItem('listGaiTmp'));
}
function getRandomImage() {
    let min = 0;
    let max = listGaiTmp.length - 1;
    let randomIndex = Math.floor(Math.random() * (max - min)) + min;
    let imageLink = listGaiTmp[randomIndex];
    listGaiTmp.splice(randomIndex, 1);
    if (listGaiTmp.length == 0) {
        console.log('het list -------------------------------');
        listGaiTmp = JSON.parse(JSON.stringify(listGai));
    }
    localStorage.setItem('listGaiTmp', JSON.stringify(listGaiTmp));
    return imageLink;
}
let keys = [
	'gai',
	'gái',
	'boobs',
	'vếu',
	'veu',
	'bưởi',
	'buoi',
	'girl'
];
let phrase = [
	'tang tuoi tho',
	'give me boobs',
	'cho mot co gai dep'
]
function newDate(now, hour, minute = '0') {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute).getTime()
}
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'general') {
            channel = c.id
        }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

    let now = new Date();
    // time on server must minute -7
    let morningTime = newDate(now, '8');
    let morningTime5 = newDate(now, '8', '6');
    let noonTime = newDate(now, '13');
    let noonTime5 = newDate(now, '13', '6');
    let afterNoonTime = newDate(now, '18');
    let afterNoonTime5 = newDate(now, '18', '6');
    let intl = setInterval(function () {
        let nowTime = new Date();
        nowTime.setHours(nowTime.getHours())
        nowTime = nowTime.getTime();
         console.log('now-------------------------------', new Date(nowTime));
         console.log('noonTime-------------------------------', new Date(noonTime));
		 console.log('afterNoonTime-------------------------------', new Date(afterNoonTime));
        if (morningTime <= nowTime && nowTime <= morningTime5) {
             console.log('morningTime');
            rtm.sendMessage("girl nè: " + getRandomImage(), channel);
        }
        if (noonTime <= nowTime && nowTime <= noonTime5) {
             console.log('noonTime');
            rtm.sendMessage("girl nè: " + getRandomImage(), channel);
        }
        if (afterNoonTime <= nowTime && nowTime <= afterNoonTime5) {
             console.log('afterNoonTime');
            rtm.sendMessage("girl nè: " + getRandomImage(), channel);
        }
    }, 30*1000);
});
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    // console.log('---------------------------------------------------------:', message);
    if (message.text) {
        let strings = message.text.split(' ');
        let hasContain = strings.some(function (item) {
            return keys.indexOf(item) > -1;
        });

        if (hasContain) {
            rtm.sendMessage("girl nè: " + getRandomImage(), channel);
        } else {
			hasContain = phrase.some(function (item) {
				return message.text == item;
			});
			if (hasContain) {
				rtm.sendMessage("girl nè: " + getRandomImage(), channel);
			}
		}
    }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
    console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
    console.log('Reaction removed:', reaction);
});