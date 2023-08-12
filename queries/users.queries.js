const User = require('../database/models/user.model')

exports.createUser = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password);
        const newUser = new User({
            username: user.username,
            local: {
                email: user.email,
                password: hashedPassword
            }
        })
        return newUser.save();
    } catch (error) {
        throw (error);
    }
}

// Return an account from local email
exports.findUserPerEmail = (email) => {
    return User.findOne({ 'local.email': email }).exec();
}

// Return connection from Google OAuth2
exports.findUserPerGoogleId = (googleId) => {
    return User.findOne({ 'local.googleId': googleId }).exec();
}