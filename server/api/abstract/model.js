module.exports = (_schema) => {
    // Duplicate the ID field.
    _schema.virtual('id').get(function(){
        return this._id.toHexString();
    });

    // Ensure virtual fields are serialised.
    _schema.set('toJSON', {
        virtuals: true
    });
};