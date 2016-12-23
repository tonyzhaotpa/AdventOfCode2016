Object.defineProperty(Array.prototype, "match", {
  enumerable: false,
  value: function(regex) {
    for(var index=0; index<this.length; index++) {
      if((match = this[index].match(regex)) !== null) {
        return {match: match, index: index}
      }
    }
    return null
  }
})

let array = ["tony", "yang", "geoffrey", "javier"]
console.log(array.match("yang"), array)
console.log(array.match("anita"), array)

let a = "a", b = "bb", c = "ccc"
let param_str = 'Testing ${a}, ${b}, ${c}'
console.log(param_str)
console.log("Testing ${a}, ${b}, ${c}")

let antecedents = [/value (\d+) goes to (bot \d+)/]
while((antecedent = antecedents.pop()) !== undefined) {
    console.log(antecedent)
}

const goal = new Rule(entry => {
  if((ante1 = entry.match(/value (\d+) goes to output 0$/)) !== null
    && (ante2 = knowledge_base.match(/value (\d+) goes to output 1$/)) !== null
    && (ante3 = knowledge_base.match(/value (\d+) goes to output 2$/)) !== null) {

    knowledge_base.splice(knowledge_base.indexOf(entry), 1)
    knowledge_base.splice(knowledge_base.indexOf(ante2.entry), 1)
    knowledge_base.push("value " + ante2.match[1] + " goes to " + ante1[2])
    knowledge_base.push("value " + ante2.match[2] + " goes to " + ante1[3])
  }
})
