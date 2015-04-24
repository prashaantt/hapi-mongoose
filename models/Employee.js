'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
});

schema.methods.joiValidate = function (obj) {
  var Joi = require('Joi');
  var schema = {
    firstname: Joi.string().required().min(2).max(20),
    lastname: Joi.string().required().min(2).max(20),
    age: Joi.number().required().min(17).max(100),
    city: Joi.string().required()
  }
  return Joi.validate(obj, schema, {allowUnknown: true});
}

schema.methods.intro = function () {
  var greeting = "My name is " + this.firstname + " " + this.lastname + ".";
  greeting += " I'm " + this.age + "years old and live in " + this.city;
  return greeting;
}

module.exports = mongoose.model('Employee', schema);
