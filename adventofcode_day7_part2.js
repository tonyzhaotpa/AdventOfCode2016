const fs = require("fs")
const readline = require("readline")
const regex = /(([a-z])(?!\2)([a-z])\2)/
const bab_regex = /(\[[a-z]*([a-z])(?!\2)([a-z])\2[a-z]*\])/
const hypernet_regex = /(\[[a-z]+\])/

let num = 0
readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", seq => {
    let bab_seqs = seq.split(bab_regex)
      .filter(s => bab_regex.test(s))
      .join()
    let outer_seqs = seq.split(hypernet_regex)
      .filter(s => !hypernet_regex.test(s))
      .join()
    let aba_seqs = []
    while(regex.test(outer_seqs)) {
      let aba = outer_seqs.match(regex)[0]
      aba_seqs.push(aba)
      outer_seqs = outer_seqs.slice(outer_seqs.indexOf(aba)+1)
    }
    for(var i=0; i< aba_seqs.length; i++) {
      let aba = aba_seqs[i]
      if(bab_seqs.includes(aba[1]+aba[0]+aba[1])) {
        num++
        return
      }
    }
  })
  .on("close", () => {
    console.log("number of IPs supporting SSL:", num)
  })
