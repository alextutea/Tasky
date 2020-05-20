const Joi = require('@hapi/joi');

const loginDataValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

async function loginValidation(req, res, next){
  console.log("Validating data package from client... (login user)");
  const { error } = await loginDataValidation(req.body);

  if (error) {
    console.log("Data package is not valid!");
    return res.status(400).send({
        err: error.details[0].message
    });
  }
  else{
    console.log("Data package validated!")
    next()
  }

}
const registerDataValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(64)
      .required()
      .email(),
    username: Joi.string()
      .required()
      .min(3)
      .max(64),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
  });
  return schema.validate(data);
};

async function registerValidation(req, res, next){
  console.log("Validating data package from client... (register user)");
  const { error } = await registerDataValidation(req.body);

  if (error) {
    console.log("Data package is not valid!");
    return res.status(400).send({
        err: error.details[0].message
    });
  }
  else{
    console.log("Data package validated!")
    next()
  }

}
module.exports = {
    loginValidation: loginValidation,
    registerValidation: registerValidation
}