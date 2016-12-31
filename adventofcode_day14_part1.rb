#!/usr/bin/env ruby
require 'digest'
require 'thread'

Item = Struct.new(:md5, :char, :index)
Buffer = Queue.new
List = Array.new
@semaphore = Mutex.new
Salt = "jlmsuwbz"

def produce (integer)
  return  Digest::MD5.hexdigest Salt + integer.to_s
end

producer = Thread.new do
  i = 0
  loop do
    md5 = produce i
    if index = /([a-z0-9])\1\1/ =~ md5
      item = Item.new(md5, md5[index], i)
      Buffer << item
    end
    i += 1
  end
end

consumer = Thread.new do
  loop do
    @semaphore.synchronize do
      if List.length >= 64 then
        puts "64th valid hash: #{List.sort[63]}"
        exit
      end
    end
    item = Buffer.pop
    Thread.new do
      (item.index + 1..item.index + 1001).each do |i|
        md5 = produce i
        if /(#{item.char})\1\1\1\1/ =~ md5 then
          @semaphore.synchronize do
            List << item.index
          end
          Thread.exit
        end
      end
    end
  end
end

consumer.join
