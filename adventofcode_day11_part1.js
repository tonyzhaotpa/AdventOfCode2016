const ms = f => f.match(/[a-z]/g) || []
const gs = f => f.match(/[A-Z]/g) || []
const last = steps => steps[steps.length - 1]
const valid_moves = ["+HL","+hl","+Hh","+Ll","+H","+L","+h","+l","-H","-L","-h","-l"]

const root = p => [p]
const reject = steps => {
  for(var i = 0; i < steps.length - 1; i++) {
    if(steps[i].diag.toString() == last(steps).diag.toString()) {
      return true
    }
  }
  if(steps.length > 12) {
    return true
  }
  return last(steps).diag.some(f => gs(f).length > 0 && ms(f).length > gs(f).length)
}
const accept = steps => last(steps).diag[3].length == 4
const output = steps => {
  console.log("---------- Solution ----------")
  steps.forEach((step,index) => {
    console.log("step " + index, step)
  })
}
const next = (steps,moves) => {
  while((move = moves.shift()) !== undefined) {
    let curr_step = last(steps)
    if((move.charAt(0) == '-' && curr_step.e == 0) || (move.charAt(0) == '+' && curr_step.e == 3)) {
      continue
    }
   if(move.substring(1).split('').every(char => curr_step.diag[curr_step.e].includes(char))) {
      let next_step = {diag: curr_step.diag.slice(), e: curr_step.e}
      next_step.diag[next_step.e] = curr_step.diag[curr_step.e].replace(new RegExp('\[' + move.substring(1) + '\]', "g"), '')
      next_step.e = move.charAt(0) == '-' ? curr_step.e - 1 : curr_step.e + 1
      next_step.diag[next_step.e] += move.substring(1)
      next_step.diag[next_step.e] = next_step.diag[next_step.e].split('').sort().join('')
      steps.push(next_step)
      return steps
    }
  }
  return null
}
const backtrack = steps => {
  if(reject(steps)) {
    return
  }
  if(accept(steps)) {
    output(steps)
  }
  let moves = valid_moves.slice()
  let candidate = next(steps,moves)
  while(candidate !== null) {
    backtrack(candidate)
    steps.pop()
    candidate = next(candidate,moves)
  }
}

const p = {diag: ["hl","H","L",""], e: 0}
backtrack(root(p))
