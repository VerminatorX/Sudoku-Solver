'use strict';

//const puzzle = require("../public/index.js").textArea
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
	

  app.route('/api/check')
		
    .post((req, res) => {
			const {
				puzzle,
				coordinate,
				value
			} = req.body
			
			res.json(solver.validate(puzzle, coordinate, value))


			
/* 			if (!coordinate || !value || !puzzle) {
				res.json({ error: "Required field(s) missing" })
			} else if (req.body.puzzle.search(/[^\d|.]/) !== -1) {
				res.json({ error: 'Invalid characters in puzzle' })
			} else if (req.body.puzzle.length !== 81) {
				res.json({ error: 'Expected puzzle to be 81 characters long' })
			} else if (req.body.value.search(/^[1-9]$/) === -1) {
				res.json({ error: 'Invalid value' })
			} else if (req.body.coordinate.search(/^[abcdefghi][1-9]$/i) === -1) {
				res.json({ error: 'Invalid coordinate'})
			} else if (
				!solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& !solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& !solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "row", "column", "region" ] })
			} else if (
				!solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& !solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "row", "column" ] })
			} else if (
				!solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "row" ] })
			} else if (
				solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& !solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "column" ] })
			} else if (
				solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& !solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& !solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "column", "region" ] })
			} else if (
				solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& !solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "region" ] })
			} else if (
				!solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value) 
				&& solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)
				&& !solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) {
				res.json({ "valid": false, "conflict": [ "row", "region" ] })
			} else {
				res.json({ "valid": true })
			} */
		});
    
  app.route('/api/solve')
    .post((req, res) => {
			res.json(solver.solve(req.body.puzzle))
			
    });
};
