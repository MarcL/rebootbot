import configuration from '../config/config';
import Bot from './bot';

const watchWords = [
    '@hillaryclinton',
    '@realdonaldtrump'
];

function handleError(error) {
    if (error) {
        console.error('response status:', error.statusCode);
        console.error('data:', error.data);
    }
}

const twitterBot = new Bot(configuration.credentials);
twitterBot.followerIds((error, reply) => {
    if (error) {
        handleError(error);
    } else {
        const numberOfFollowers = reply.ids.length.toString();
        console.log(`#followers : ${numberOfFollowers}`);
    }
});

//twitterBot.searchTweetAndFollow({q: 'javascript'}, handleError);
//twitterBot.retweet({q: 'javascript'}, handleError);
//twitterBot.favourite({q: 'javascript'}, handleError);
// twitterBot.followRandomFriendsFollower(handleError);
// twitterBot.pruneFollower(handleError);

// const stream = twitterBot.stream('statuses/filter', {track: watchWords.join(',')});
// stream.on('tweet', function(tweet) {
//     console.log(tweet.text);
// });
