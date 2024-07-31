const chai = require('chai');
const assert = chai.assert;
const server = require("../server")

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', function() {
	test("Logic handles a valid puzzle string of 81 characters", function() {
		assert.deepEqual(
			{"puzzle": '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
			 "solution": "218396745753284196496157832531672984649831257827549613962415378185763429374928561"},
			solver.solve("..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"),
		)
	});

	test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function() {
		assert.deepEqual(
			{ "error": 'Invalid characters in puzzle' },
			solver.validate('..abc.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "a1", 1)
		)
	});
	
	test("Logic handles a puzzle string that is not 81 characters in length", function() {
		assert.deepEqual(
			{ "error": 'Expected puzzle to be 81 characters long' },
			solver.validate("..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492", "a1", 1)
		)
	});

	test("Logic handles a valid row placement", function() {
		assert.deepEqual(
			{ "valid": true },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "a1", 1)
		)
	})

	test("Logic handles an invalid row placement", function() {
		assert.deepEqual(
			{ "valid": false, "conflict": [ "row" ] },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "a1", 9)
		)
	})

	test("Logic handles a valid column placement", function() {
		assert.deepEqual(
			{ "valid": true },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "b3", 3)
		)
	})

	test("Logic handles a valid column placement", function() {
		assert.deepEqual(
			{ "valid": false, "conflict": [ "column" ] },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "b3", 1)
		)
	})

	test("Logic handles a valid region (3x3 grid) placement", function() {
		assert.deepEqual(
			{ "valid": true },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "b3", 3)
		)
	})

	test("Logic handles an invalid region (3x3 grid) placement", function() {
		assert.deepEqual(
			{ "valid": false, "conflict": [ "region" ] },
			solver.validate('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', "c3", 5)
		)
	})

	test("Valid puzzle strings pass the solver", function() {
		assert.deepEqual(
			{"puzzle": '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
			 "solution": "218396745753284196496157832531672984649831257827549613962415378185763429374928561"},
			solver.solve("..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"),
		)
	})

	test("Invalid puzzle strings fail the solver", function() {
		assert.deepEqual(
			{ "error": "Invalid characters in puzzle" },
			solver.solve("asldsfofn"),
		)
	})

	test("Solver returns the expected solution for an incomplete puzzle", function() {
		assert.deepEqual(
			{"puzzle": '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
			 "solution": "218396745753284196496157832531672984649831257827549613962415378185763429374928561"},
			solver.solve("..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"),
		)
	})
});

