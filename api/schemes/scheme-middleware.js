const Scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = await Scheme.findById(req.params.scheme_id)
  !scheme_id
  ? res.status(404).json({message: `scheme with scheme_id ${scheme_id} not found`})
  : next()
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body.scheme
  if(!('scheme_name' in req.body.scheme) 
  || scheme_name === '' 
  || typeof scheme_name !== 'string') 
  {
    res.status(400).json({message: "invalid scheme_name"})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { step_number, instructions } = req.body.step
  if(step_number < 1 
    || typeof step_number !== 'number' 
    || !('instructions' in req.body.step) 
    || instructions === '' 
    || typeof instructions !== 'string')
    {
      res.status(400).json({message: 'invalid step'})
    } else {
      next()
    }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
