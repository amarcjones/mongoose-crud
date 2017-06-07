import mongoose  from "mongoose"
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/tacqueria-ritmo')
mongoose.Promise = Promise // q or bluebird or ES2015 promises

import Eater from './eater'
import Taco from './taco'

export {Eater, Taco}
