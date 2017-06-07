import express from "express"
import * as db from '../models'
let router = express.Router({mergeParams: true});


router.get('/', async function(req,res,next){
  try {
    let eater = await db.Eater.findById(req.params.eater_id).populate('tacos')
    res.render('tacos/index', {eater})
  } catch(e){
    next(e)
  }
})

router.get('/new', async function(req,res,next){
  try {
    let eater = await db.Eater.findById(req.params.eater_id)
    res.render('tacos/new', {eater})
  } catch(e){
    next(e)
  }
})

router.post('/', async function(req,res,next){
  try {
    var newTaco = Object.assign({}, req.body.taco, {eater: req.params.eater_id})
    let taco = await db.Taco.create(newTaco)
    let eater = await db.Eater.findById(req.params.eater_id)
    eater.tacos.push(taco.id)
    await eater.save()
    res.redirect(`/eaters/${eater.id}/tacos`)
  } catch(e){
    next(e)
  }
})

router.get('/:id/edit', async function(req,res,next){
  try {
    let taco = await db.Taco.findById(req.params.id).populate('eater')
    res.render('tacos/edit', {taco})
  } catch(e){
    next(e)
  }
})

router.patch('/:id', async function(req,res,next){
  try {
    let taco = await db.Taco.findByIdAndUpdate(req.params.id, req.body.taco)
    res.redirect(`/eaters/${req.params.eater_id}/tacos`)
  } catch(e){
    next(e)
  }
})

router.delete('/:id', async function(req,res,next){
  try {
    let taco = await db.Taco.findById(req.params.id)
    await taco.remove()
    res.redirect(`/eaters/${req.params.eater_id}/tacos`)
  } catch(e){
    next(e)
  }
})

export default router;
