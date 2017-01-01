Discs = [
  #[5, (5-4)%5],
  #[2, (2-1)%2]
  [13, 13-11],
  [5, 5-0],
  [17, 17-11],
  [3, 3-0],
  [7, 7-2],
  [19, 19-17],
  [11, 11-0]
]

_index = 1
_curr = [1, 0]
Discs.each do |_next|
  _d1 = _curr[1]
  _d2 = _next[1] - _index
  loop do
    puts "index: #{_index}, d1: #{_d1}, d2: #{_d2}"
    if _d1 == _d2 then
      _curr = [_curr[0].lcm(_next[0]), _d1]
      break
    elsif _d1 < _d2 then
      _d1 += _curr[0]
    else
      _d2 += _next[0]
    end
  end
  _index += 1
end

puts _curr
