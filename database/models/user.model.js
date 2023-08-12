const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    username: { type: String, required: true, unique: true },
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        googleId: { type: String },
    }
});

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}

// Fonction qui compare le password en base & celui fourni par le client
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);


module.exports = User;