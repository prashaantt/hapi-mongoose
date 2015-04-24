'use strict';

var Employees = require('./handlers/employees');

module.exports = [
  {
    method: 'GET',
    path: '/employees',
    handler: Employees.index
  }, {
    method: 'POST',
    path: '/employees',
    handler: Employees.create
  }, {
    method: 'GET',
    path: '/employees/{id}',
    handler: Employees.show
  }, {
    method: 'PUT',
    path: '/employees/{id}',
    handler: Employees.update
  }, {
    method: 'DELETE',
    path: '/employees/{id}',
    handler: Employees.delete
  }
];
