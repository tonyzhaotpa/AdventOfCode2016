const getSumSectorIds = input => {
  let sum = 0
  for( var room of input.trim().split( /\n/ ) ) {
    const room_checksum = room.match( /\[[a-z]+\]/ )[0].slice( 1,-1 )
    const id = Number.parseInt( room.match( /\d+/ )[0] )
    room = room.slice( 0,-7 ).replace( /[\d\-]/g, '' )

    let letters = room.split('')
    let words = letters.reduce( (words, char) => {
      for( var i in words ) {
      	if( words[i].charAt(0) == char ) {
      		words[i] += char
          return words
      	}
      }
      words.push(char)
      return words
    }, [])

    words.sort()
    words.sort( (obj1, obj2) => obj2.length - obj1.length )

    let calc_checksum = ""
    for( var i = 0; i < 5 && i < words.length; i++ ) {
      calc_checksum += words[i].charAt(0)
    }
    if( room_checksum == calc_checksum ) {
     sum += id
    }
  }
  return sum
}

const input = document.getElementById( "input" )
console.log( "sum of sector ids of real rooms:", getSumSectorIds( input.value ) )
