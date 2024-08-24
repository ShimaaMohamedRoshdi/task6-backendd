const mongoose = require('mongoose')
const express = require('express');


const Articale = mongoose.model('Articale',{
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})
module.exports = Articale