const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    img:{
        type: Buffer,
        required: true
    },
    imgType: {
        type: String,
        required: true
    }
});


movieSchema.virtual('imgSrc').get(function() {
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`
    }
})

module.exports = mongoose.model('movie', movieSchema);