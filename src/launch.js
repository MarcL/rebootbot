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

twitterBot.followerIds()
    .then((followerIds) => {
        const numberOfFollowers = followerIds.ids.length.toString();
        console.log(`#followers : ${numberOfFollowers}`);
    })
    .catch((error) => handleError(error));

// twitterBot.tweet('Tweet status.')
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => handleError(error));

//twitterBot.searchTweetAndFollow({q: 'javascript'}, handleError);
//twitterBot.retweet({q: 'javascript'}, handleError);
//twitterBot.favourite({q: 'javascript'}, handleError);
// twitterBot.followRandomFriendsFollower(handleError);
// twitterBot.pruneFollower(handleError);

// const stream = twitterBot.stream('statuses/filter', {track: watchWords.join(',')});
// stream.on('tweet', function(tweet) {
//     console.log(tweet.text);
// });
