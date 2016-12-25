const ms = f => f.match(/[a-z]/g) || []
const gs = f => f.match(/[A-Z]/g) || []
const last = steps => steps[steps.length - 1]
const valid_moves = [
"+ot","+op","+or","+oc",
"+tp","+tr","+tc",
"+pr","+pc",
"+rc",
"+OT","+OP","+OR","+OC",
"+TP","+TR","+TC",
"+PR","+PC",
"+RC",
"+Oo","+Tt","+Pp","+Rr","+Cc",
"+O","+T","+P","+R","+C","+o","+t","+p","+r","+c",
"-O","-T","-P","-R","-C","-o","-t","-p","-r","-c"]

const root = p => [p]
const reject = steps => {
  if(steps.length >= min_steps) {
    return true
  }
  for(var i = 0; i < steps.length - 1; i++) {
    if(steps[i].diag.every((f,index) =>
      ms(f).length == ms(last(steps).diag[index]).length && gs(f).length == gs(last(steps).diag[index]).length)) {
      return true
    }
  }
  if(prune.length > 1 && prune.some(step => step.diag.every((f,index) =>
    f.toString() == last(steps).diag[index].toString()))) {
    return true
  }
  return last(steps).diag.some(f => gs(f).length > 0 && ms(f).length > gs(f).length)
}
const accept = steps => last(steps).diag[3].length == 10
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
      steps.push(next_step)
      return steps
    }
  }
  return null
}
let min_steps = Number.POSITIVE_INFINITY
let prune = []
const backtrack = steps => {
  if(reject(steps)) {
    return
  }
  if(accept(steps)) {
    min_steps = steps.length
    output(steps)
    return
  }
  let moves = valid_moves.slice()
  let candidate = next(steps,moves)
  while(candidate !== null) {
    backtrack(candidate)
    steps.pop()
    candidate = next(candidate,moves)
  }
  prune.push({diag: last(steps).diag.slice(), e: last(steps).e})
}

backtrack(root({diag: ["RTrtCcOP","op","",""], e: 0}))
