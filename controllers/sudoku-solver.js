//const puzzle = require("../public/index.js")

let constructMatrix = function(puzzle) {
  // FUNCTION TO MAKE A LIST OF SUDOKU LINES HORIZONTAL OR VERTICAL
  let sudokuLines = []
  let stop = 9
  for (let start = 0; start < 81; start += 9) {
    sudokuLines.push(puzzle.slice(start, stop))
    stop += 9
  }
  return sudokuLines
}

let getSudokuColumns = function(lines) {
  // FUNCTION TO TURN SUDOKU COLUMNS INTO STRING, THEN INTO ARRAY
  let sudokuColumns = []
  for (let column = 0; column < 9; column++) {
    for (let row = 0; row < 9; row++) {
      sudokuColumns.push(lines[row][column])
    }
  }
  return constructMatrix(sudokuColumns)
}

let getSudokuQuadrants = function(puzzle) {
  // FUNCTION TO GET ARRAY OF 3X3 CELLS
    let puzzleAsString = puzzle.join("")
    let sudokuQuadrants = ""
    let fragment = 0
    for (let i = 0; i < 9; i++) {
      sudokuQuadrants += puzzleAsString.slice(fragment, fragment+3)
      sudokuQuadrants += puzzleAsString.slice(fragment+9, fragment+12)
      sudokuQuadrants += puzzleAsString.slice(fragment+18, fragment+21)
      
      fragment += 3
      if (fragment === 9) {
        fragment = 27
      } else if (fragment === 36) {
        fragment = 54
      }
    }
    return constructMatrix(sudokuQuadrants.split(""))
  }

	let letters = {
		"a" : 0,
		"b": 1,
		"c": 2,
		"d": 3,
		"e": 4,
		"f": 5,
		"g": 6,
		"h": 7,
		"i": 8
	}

class SudokuSolver {
  

  validate(puzzleString, coordinate, value) {
		if (value) {
			value = value.toString()
		}
		

		let invalid = { "valid": false, "conflict": [] }

		if (!puzzleString || !coordinate || !value) {
			return { error: "Required field(s) missing" }
  	} else if (puzzleString.search(/[^\d|.]/) !== -1) {
			return { error: 'Invalid characters in puzzle' }
		} else if (puzzleString.length !== 81) {
			return { error: 'Expected puzzle to be 81 characters long' }
		} else if (value.search(/^[1-9]$/) === -1) {
			return { error: 'Invalid value' }
		} else if (coordinate.search(/^[abcdefghi][1-9]$/i) === -1) {
			return { error: 'Invalid coordinate'}
		} else if (
			this.checkRowPlacement(puzzleString, coordinate[0], coordinate[1], value) 
			&& this.checkColPlacement(puzzleString, coordinate[0], coordinate[1], value)
			&& this.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value)) {
			return { "valid": true }
		} 
		if (!this.checkRowPlacement(puzzleString, coordinate[0], coordinate[1], value)) {
			invalid.conflict.push("row")
		}

		if (!this.checkColPlacement(puzzleString, coordinate[0], coordinate[1], value)) {
			invalid.conflict.push("column")
		}
		
		if (!this.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value)) {
			invalid.conflict.push("region")
		}
		return invalid
	}

	

  checkRowPlacement(puzzleString, row, column, value) {
		value = value.toString()

    let puzzleArray = puzzleString.split("")
		let lines = constructMatrix(puzzleArray)

		console.log(lines[letters[row.toLowerCase()]][column - 1])
		console.log(value)
		if (lines[letters[row.toLowerCase()]][column - 1] === value) {
			return true
		} else {
			return !lines[letters[row.toLowerCase()]].includes(value)
		}
	}

   checkColPlacement(puzzleString, row, column, value) {
		value = value.toString()

    let puzzleArray = puzzleString.split("")
		let lines = constructMatrix(puzzleArray)
		let columns = getSudokuColumns(lines)

		if (lines[letters[row.toLowerCase()]][column - 1] === value ) {
			return true
		} else {
			return !columns[column - 1].includes(value)
		}
	}

  checkRegionPlacement(puzzleString, row, column, value) {

      let puzzleArray = puzzleString.split("")
			let lines = constructMatrix(puzzleArray)
			let columns = getSudokuColumns(puzzleArray)
			let quadrants = getSudokuQuadrants(puzzleArray)

			if (lines[letters[row.toLowerCase()]][column - 1] === value) {
				return true
			} else if (letters[row.toLowerCase()] < 3 && column <= 3) {
				return !quadrants[0].includes(value)
			} else if (letters[row.toLowerCase()] < 3 && column > 3 && column <= 6) {
        return !quadrants[1].includes(value)
      } else if (letters[row.toLowerCase()] < 3 && column > 6 && column <= 9) {
        return !quadrants[2].includes(value)
      } else if ((letters[row.toLowerCase()] >= 3 && letters[row.toLowerCase()] < 6) && column <= 3) {
        return !quadrants[3].includes(value)
      } else if ((letters[row.toLowerCase()] >= 3 && letters[row.toLowerCase()] < 6) && (column > 3 && column <= 6)) {
        return !quadrants[4].includes(value)
      } else if ((letters[row.toLowerCase()] >= 3 && letters[row.toLowerCase()] < 6) && (column > 6 && column <= 9)) {
        return !quadrants[5].includes(value)
      } else if ((letters[row.toLowerCase()] >= 6 && letters[row.toLowerCase()] < 9) && column <= 3) {
        return !quadrants[6].includes(value)
      } else if ((letters[row.toLowerCase()] >= 6 && letters[row.toLowerCase()] < 9) && (column > 3 && column <= 6)) {
        return !quadrants[7].includes(value)
      } else if ((letters[row.toLowerCase()] >= 6 && letters[row.toLowerCase()] < 9) && (column > 6 && column <= 9)) {
        return !quadrants[7].includes(value)
      }
  }

  solve(puzzleString) {
		if (!puzzleString) {
			return { error: 'Required field missing' }
		} else if (puzzleString.search(/[^\d|.]/) !== -1) {
			return { error: 'Invalid characters in puzzle' }
		} else if (puzzleString.length !== 81) {
			return { error: 'Expected puzzle to be 81 characters long' }
		}

    let puzzleArray = puzzleString.split("")
    let lines = constructMatrix(puzzleArray)
    let columns = getSudokuColumns(lines)
    let quadrants = getSudokuQuadrants(puzzleArray)
      
    let number = "1"
    let cycles = 0
      
    for (let i = 0; i < 82; i++) {
      if (puzzleString[i] === ".") {
        puzzleArray[i] = number

        if (number === "10") {
          puzzleArray[i] = "."
          i--
          while (puzzleString[i] !== ".") {
            i--
            if (i < 0) {
              return { error: 'Puzzle cannot be solved' }
            }
          }
          number = puzzleArray[i]
        }
        
        if (i < 3 && (lines[0].includes(number) || columns[i].includes(number) || quadrants[0].includes(number))
        || ((i >= 3 && i < 6) && (lines[0].includes(number) || columns[i].includes(number) || quadrants[1].includes(number)))
        || ((i >= 6 && i < 9) && (lines[0].includes(number) || columns[i].includes(number) || quadrants[2].includes(number)))
        || ((i >= 9 && i < 12) && (lines[1].includes(number) || columns[i - 9].includes(number) || quadrants[0].includes(number)))
        || ((i >= 12 && i < 15) && (lines[1].includes(number) || columns[i - 9].includes(number) || quadrants[1].includes(number)))
        || ((i >= 15 && i < 18) && (lines[1].includes(number) || columns[i - 9].includes(number) || quadrants[2].includes(number)))
        || ((i >= 18 && i < 21) && (lines[2].includes(number) || columns[i - 18].includes(number) || quadrants[0].includes(number)))
        || ((i >= 21 && i < 24) && (lines[2].includes(number) || columns[i - 18].includes(number) || quadrants[1].includes(number)))
        || ((i >= 24 && i < 27) && (lines[2].includes(number) || columns[i - 18].includes(number) || quadrants[2].includes(number)))
        || ((i >= 27 && i < 30) && (lines[3].includes(number) || columns[i - 27].includes(number) || quadrants[3].includes(number)))
        || ((i >= 30 && i < 33) && (lines[3].includes(number) || columns[i - 27].includes(number) || quadrants[4].includes(number)))
        || ((i >= 33 && i < 36) && (lines[3].includes(number) || columns[i - 27].includes(number) || quadrants[5].includes(number)))
        || ((i >= 36 && i < 39) && (lines[4].includes(number) || columns[i - 36].includes(number) || quadrants[3].includes(number)))
        || ((i >= 39 && i < 42) && (lines[4].includes(number) || columns[i - 36].includes(number) || quadrants[4].includes(number)))
        || ((i >= 42 && i < 45) && (lines[4].includes(number) || columns[i - 36].includes(number) || quadrants[5].includes(number)))
        || ((i >= 45 && i < 48) && (lines[5].includes(number) || columns[i - 45].includes(number) || quadrants[3].includes(number)))
        || ((i >= 48 && i < 51) && (lines[5].includes(number) || columns[i - 45].includes(number) || quadrants[4].includes(number)))
        || ((i >= 51 && i < 54) && (lines[5].includes(number) || columns[i - 45].includes(number) || quadrants[5].includes(number)))
        || ((i >= 54 && i < 57) && (lines[6].includes(number) || columns[i - 54].includes(number) || quadrants[6].includes(number)))
        || ((i >= 57 && i < 60) && (lines[6].includes(number) || columns[i - 54].includes(number) || quadrants[7].includes(number)))
        || ((i >= 60 && i < 63) && (lines[6].includes(number) || columns[i - 54].includes(number) || quadrants[8].includes(number)))
        || ((i >= 63 && i < 66) && (lines[7].includes(number) || columns[i - 63].includes(number) || quadrants[6].includes(number)))
        || ((i >= 66 && i < 69) && (lines[7].includes(number) || columns[i - 63].includes(number) || quadrants[7].includes(number)))
        || ((i >= 69 && i < 72) && (lines[7].includes(number) || columns[i - 63].includes(number) || quadrants[8].includes(number)))
        || ((i >= 72 && i < 75) && (lines[8].includes(number) || columns[i - 72].includes(number) || quadrants[6].includes(number)))
        || ((i >= 75 && i < 78) && (lines[8].includes(number) || columns[i - 72].includes(number) || quadrants[7].includes(number)))
        || ((i >= 78 && i < 81) && (lines[8].includes(number) || columns[i - 72].includes(number) || quadrants[8].includes(number)))) {
          number++
          number = number.toString()
          i--
        } else {
          number = "1"
        }
        cycles++
        lines = constructMatrix(puzzleArray)
        columns = getSudokuColumns(lines)
        quadrants = getSudokuQuadrants(puzzleArray)
        }
    }
    let sudokuSolved = puzzleArray.join("")
    console.log({"puzzle": puzzleString, "solution": sudokuSolved})
    
    return {"puzzle": puzzleString, "solution": sudokuSolved}
  }
}

module.exports = SudokuSolver;

