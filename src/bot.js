import Twit from 'twit';

function randomIndex(array) {
    const index = Math.floor(array.length*Math.random());
    return array[index];
}

// TODO: Finish adding promises
class Bot {
    constructor(config) {
        this.twit = new Twit(config);
    }

    // List of follower IDs
    followerIds() {
        return new Promise((resolve, reject) => {
            this.twit.get('followers/ids', (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    tweet(status) {
        return new Promise((resolve, reject) => {
            if(typeof status !== 'string') {
                return reject(new Error('tweet must be of type String'));
            } else if(status.length > 140) {
                return reject(new Error('tweet is too long: ' + status.length));
            }
            
            this.twit.post('statuses/update', { status: status }, resolve);
        });
    }

    // Search for a tweet and follow that user who tweeted it
    searchTweetAndFollow(parameters, callback) {
        this.twit.get('search/tweets', parameters, (error, reply) => {
            if (error) {
                return callback(error);
            }
        
            var tweets = reply.statuses;
            var randomTweet = randomIndex(tweets);
            if (typeof randomTweet != 'undefined')
            {
                var target = randomTweet.user.id_str;
                this.twit.post('friendships/create', { id: target }, callback);
            }
        });
    }

    retweet(parameters, callback) {
        var self = this;

        self.twit.get('search/tweets', parameters, (error, reply) => {
            if (error) {
                return callback(error);
            }

            var tweets = reply.statuses;
            var randomTweet = randomIndex(tweets);
            if (typeof randomTweet != 'undefined') {
                self.twit.post('statuses/retweet/:id', { id: randomTweet.id_str }, callback);
            }
        });
    }

    favourite(parameters, callback) {
        var self = this;

        self.twit.get('search/tweets', parameters, (error, reply) => {
            if (error) {
                return callback(error);
            }

            var tweets = reply.statuses;
            var randomTweet = randomIndex(tweets);
            if(typeof randomTweet != 'undefined') {
                console.log(`Favouriting: ${randomTweet.text}`);
                self.twit.post('favorites/create', { id: randomTweet.id_str }, callback);
            }
        });
    }

    followRandomFriendsFollower(callback) {
        this.twit.get('followers/ids', (error, reply) => {
            if (error) {
                return callback(error);
            }
            
            const followers = reply.ids;
            const randomFollower = randomIndex(followers);
            
            this.twit.get('friends/ids', { user_id: randomFollower }, (error, reply) => {
                if (error) {
                    return callback(error);
                }
                
                const friends = reply.ids;
                const targetFollowerId = randomIndex(friends);

                // TODO: Check if already following and early out
                this.twit.post('friendships/create', { id: targetFollowerId }, callback); 
            });
        });
    }

    // Unfollow friends who don't follow back
    pruneFollower(callback) {
        this.twit.get('followers/ids', (error, reply) => {
            if (error) {
                return callback(error);
            }

            const followers = reply.ids;

            this.twit.get('friends/ids', (error, reply) => {
                if (error) {
                    return callback(error);
                }
                
                const friends = reply.ids;
                let pruned = false;
                
                while (!pruned) {
                    const target = randomIndex(friends);
                    
                    if (!~followers.indexOf(target)) {
                        pruned = true;


                        this.getUserById(target, (error, reply) => {
                            if (error) {
                                return callback(error);
                            }

                            console.log(`Removing friend: ${reply.screen_name}`)

                            this.twit.post('friendships/destroy', { id: target }, callback);
                        });

                    }
                }
            });
        });
    }

    getUserById(userId, callback) {
        this.twit.get('users/lookup',{user_id: userId}, (error, reply) => {
            if (error) {
                return callback(error);
            }

            return callback(null, reply[0]);
        });
    }
}

export default Bot;
