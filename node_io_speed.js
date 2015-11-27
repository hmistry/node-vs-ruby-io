require('dotenv').load()

var sharp = require('sharp')
var AWS = require('aws-sdk')
var s3stream = require('s3-upload-stream')
var request = require('request')
var async = require('async')
var fs = require('fs')

var SIZES = {
  large: [800, 800],
  medium: [500, 500],
  small: [300, 300],
}

var performUpload = function(size, next){
  var name = size + ".jpg"
  var resizer = function(){
    var client = sharp()
    return client.resize.
      apply(client, SIZES[size]).max()
  }

  image.pipe(resizer(size)).pipe(fs.createWriteStream(name))
  next()
}

console.time('Took')
var image = fs.createReadStream('bridge.jpg')
async.map(Object.keys(SIZES), performUpload, function(err, pics){
  if (err) throw err

  console.timeEnd('Took')
})
