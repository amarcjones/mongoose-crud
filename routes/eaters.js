import express from "express"
import * as db from '../models'

let router = express.Router()

router.get('/', async function(req,res,next){
  try {
    let eaters = await db.Eater.find()
    res.render('eaters/index', {eaters});
  } catch(err){
    next(err)
  }
})

router.get('/new', function(req,res,next){
  res.render('eaters/new');
})

router.get('/:id', async function(req,res,next){
  try {
    let eater = await db.Eater.findById(req.params.id)
    res.render('eaters/show', {eater});
  } catch(err){
    next(err)
  }
})

router.get('/:id/edit', async function(req,res,next){
 try {
    let eater = await db.Eater.findById(req.params.id)
    res.render('eaters/edit', {eater});
  } catch(err){
    next(err)
  }
})

router.post('/', async function(req,res,next){
  try {
    let eater = await db.Eater.create(req.body.eater)
    res.redirect('/eaters')
  } catch(err){
    next(err)
  }
})

router.patch('/:id', async function(req,res,next){
  try {
    let eater = await db.Eater.findByIdAndUpdate(req.params.id, req.body.eater)
    res.redirect('/eaters')
  } catch(err){
    next(err)
  }

})

router.delete('/:id', async function(req,res,next){
  try {
    let removedEater = await db.Eater.findById(req.params.id)
    let final = await removedEater.remove()
    res.redirect('/eaters')
  } catch(err){
    next(err)
  }
})

export default router;









