const express = require('express')
const Articale = require('../models/Articale')
const { findByIdAndDelete } = require('../models/user')
const auth = require ("../middleware/auth")
const router = express.Router()


router.post('/Articales',auth,async(req,res)=>{
    try{
        const Articale = new Articale({...req.body , owner : req.user._id })
        await Articale.save()
        res.status(200).send(Articale)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

router.get('/Articales',auth,async(req,res)=>{
    try{
        const Articales = await Articale.find({})
        res.status(200).send(Articales)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/Articales/:id',auth,async(req,res)=>{
    try{
        
        const id = req.params.id
        const Articale = await Articale.findOne({_id:id , owner : req.user._id})
        if(!Articale){
          return  res.status(404).send('IT NOT OWN u')
        }
        res.send(Articale)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/Articale/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id
        const Articale = await Articale.findByIdAndUpdate({_id},req.body,{
            new:true,
            runvalidators:true
        })
        if(!Articale){
            return res.status(404).send('No Articale')
        }
        res.status(200).send(Articale)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.delete('/Articale/:id',auth,async(req,res)=>{
    try{
        const Articale = await Articale.findByIdAndDelete(req.params.id)
        if(!Articale){
            res.status(404).send('No Articale is found')
        }
        res.status(200).send(Articale)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = router 