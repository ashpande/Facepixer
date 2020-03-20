var express = require('express');
var router = express.Router();
const download = require('image-downloader')
var multer  = require('multer')
const { spawn } = require('child_process');
var exec = require("child_process").exec;
var base64Img = require('base64-img');
var Q = require('q');
var promise = require('promise')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, '1' + '.jpg') //Appending .jpg
  }
})
var upload = multer({ storage: storage });
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sketch', function(req, res, next) {
  res.render('sketch', { title: 'Express' });
});

router.post('/arc',upload.single('avatar'),function(req,res,next){
  console.log("successful upload");
  const process1 = spawn('python', ['./script.py']);
  process1.stdout.on(
    'data',
    (data) => console.log(data.toString())
  );
  const process2 = spawn('python', ['./script2.py']);

  process2.stdout.on(
    'data',
    (data) => console.log(data.toString())
  );
  res.redirect('results');
});

router.get('/test',function(req,res){
  res.render('test');
})


router.post('/postsketch', upload.array(), function(req, res) {
  var base64Data = req.body.data;
  base64Img.img(base64Data, 'uploads', '1', function(err, filepath) {});
  const process1 = spawn('python', ['./script.py']);
  process1.stdout.on(
    'data',
    (data) => console.log(data.toString())
  );
  const process2 = spawn('python', ['./script2.py']);



});

router.get('/results',function(res,res){
  
    

  const process6 = spawn('rm', ['../public/images/*']);

  process6.stdout.on(
    'data',
    (data) => console.log(data.toString())
  );

  // const process7 = spawn('rm', ['../pytorch-CycleGAN-and-pix2pix/results/faces_pretrained/test_latest/images/hel_fake_B.png']);

  // process7.stdout.on(
  //   'data',
  //   (data) => console.log(data.toString())
  // );
  const process3 = spawn('cp', ['uploads/1.jpg','public/images/a.jpg']);

  process3.stdout.on(
    'data',
    (data) => console.log(data.toString())
  );

 var p2=  spawn('cp', ['pytorch-CycleGAN-and-pix2pix/results/faces_pretrained/test_latest/images/hel_fake_B.png','public/images/hel_fake_B.png'])


  res.render('results',{title: 'Express'})
})


module.exports = router;
// python blhzi.py
// python test.py --dataroot ./datasets/faces --direction BtoA --model pix2pix --name faces_pretrained