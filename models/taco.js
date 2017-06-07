var mongoose = require("mongoose")
var db = require('./')

var tacoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  numToppings: Number,
  eater: {
    ref: 'Eater',
    type: mongoose.Schema.Types.ObjectId
  }
})

tacoSchema.pre('remove', async function(next){
  let self = this
  let eater = await db.Eater.findById(this.eater)
  eater.tacos.remove(self.id)
  await eater.save()
  next()
})

var Taco = mongoose.model('Taco', tacoSchema);

module.exports = Taco