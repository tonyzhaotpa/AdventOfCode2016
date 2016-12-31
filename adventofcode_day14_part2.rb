#!/usr/bin/env ruby

def produce (integer)
  md5 = Digest::MD5.hexdigest Salt + integer.to_s
  (1..2016).each do
    md5 = Digest::MD5.hexdigest md5.to_s
  end
  return md5
end
