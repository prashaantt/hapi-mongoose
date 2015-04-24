'use strict';

var Employee = require('../models/Employee');

exports.index = function (request, reply) {
  Employee.find(function (error, employees) {
    if (error) {
      console.log('error occurred');
      return false;
    }
    if (request.headers['content-type'] === "application/json") {
      reply(employees);
    } else {
      reply.view('employees', {employees: employees});
    }
  });
};

exports.create = function (request, reply) {
  var employee = new Employee(request.payload);
  var valid = employee.joiValidate(employee);
  if (valid.error !== null) {
    reply({"error": "validation error occurred"});
  } else {
    employee.save(function (error, record) {
      if (error) {
        reply(error);
      } else {
        reply(record);
      }
    });
  }
};

exports.show = function (request, reply) {
  Employee.findById(request.params.id, function (err, found) {
    if (found) {
      if (request.headers['content-type'] === "application/json") {
        reply(found);
      } else {
        reply.view('employees', {employees: [found]})
      }
    }
  });
};

exports.update = function (request, reply) {
  Employee.findByIdAndUpdate(request.params.id, request.payload, null, function (err, doc) {
    reply(request.payload);
  });
};

exports.delete = function (request, reply) {
  Employee.findByIdAndRemove(request.params.id, null, function (err, doc) {
    reply({"deleted": "true"});
  });
};
