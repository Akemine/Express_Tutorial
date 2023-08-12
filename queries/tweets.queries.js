const Tweet = require('../database/models/tweet.model')

// Retourne un tweet via son ID
exports.getTweet = (tweetId) => {
    return Tweet.findOne({_id: tweetId}).exec();
}

// Retourne tous les tweets
exports.getTweets = () => {
    return Tweet.find({}).exec();
}

// Retourne la création d'un tweet
exports.createTweet = (tweet) => {
    const newTweet = new Tweet(tweet)
    return newTweet.save();
}

// Retourne la suppression d'un tweet via son ID
exports.deleteTweet = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec();
}

// Retourne la modification d'un tweet existant
exports.updateTweet = (tweetId, tweet) => {
    return Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true })
}

