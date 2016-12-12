const fs = require("fs")
const readline = require("readline")
const MAX_ROW = 6, MAX_COL = 50

const fill_rect = instr => {
  const [num_col, num_row] = instr.split(/rect\s(\d+)x(\d+)/).filter(s => s.length>0)
  for(var r=0; r<num_row && r<MAX_ROW; r++) {
    for(var c=0; c<num_col && c<MAX_COL; c++) {
      if(screen[r].indexOf(c) === -1) {
        screen[r].push(c)
      }
    }
  }
}

const rotate_row =  instr => {
  const [row, times] = instr.split(/rotate\srow\sy=(\d+)\sby\s(\d+)/).filter(s => s.length>0)
  let list_col = []
  for(var c=0; c<screen[row].length; c++) {
    list_col.push((screen[row][c]+Number.parseInt(times))%MAX_COL)
  }
  screen[row] = list_col
}

const rotate_col =  instr => {
  const [col, times] = instr.split(/rotate\scolumn\sx=(\d+)\sby\s(\d+)/).filter(s => s.length>0)
  let list_row = []
  for(var r=0; r<screen.length; r++) {
    if(screen[r].indexOf(Number.parseInt(col)) !== -1) {
      list_row.push((Number.parseInt(r)+Number.parseInt(times))%MAX_ROW)
      screen[r].splice(screen[r].indexOf(Number.parseInt(col)),1)
    }
  }
  for(var r =0; r<list_row.length; r++) {
    screen[list_row[r]].push(Number.parseInt(col))
  }
}

let screen = []
for(var r=0; r<MAX_ROW; r++) {
  screen.push([])
}

readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", instr => {
    if(instr.startsWith("rect")) {
      fill_rect(instr)
    } else if(instr.startsWith("rotate row")) {
      rotate_row(instr)
    } else if(instr.startsWith("rotate col")) {
      rotate_col(instr)
    }
  })
  .on("close", () => {
    console.log("number of pixels:", screen.reduce((sum, row) => sum+=row.length, 0))
  })
