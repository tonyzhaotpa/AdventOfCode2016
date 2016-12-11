const getMessage = input => {
  let stats = []
  for( var data of input.trim().split( /\n/ ) ) {
    stats = stats.concat( data.split( '' )
      .map( ( char, index ) => {
        let stat = {}
        stat.index = index, stat.char = char, stat.freq = 1
        return stat
      })
    )
  }

  return stats.reduce( ( aggregate, stat ) => {
      for( var i in aggregate ) {
        if( aggregate[i].index == stat.index && aggregate[i].char == stat.char ) {
          aggregate[i].freq += stat.freq
          return aggregate
        }
      }
      aggregate.push( stat )
      return aggregate
    }, [] ).reduce(  ( mode, aggregate ) => {
      if( mode[aggregate.index] == undefined ) {
        mode[aggregate.index] = {}
        mode[aggregate.index].char = aggregate.char, mode[aggregate.index].freq = aggregate.freq
      } else if( mode[aggregate.index].freq < aggregate.freq ) {
      	mode[aggregate.index].char = aggregate.char, mode[aggregate.index].freq = aggregate.freq
      }
      return mode
    }, [] ).reduce( ( message, mode ) => message.concat( mode.char ), "" )
}

const input = document.getElementById( "input" )
console.log( "error corrected message:", getMessage( input.value ) )
