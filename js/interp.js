
var IMG_BASE = "sr/figs";
var AUDIO_BASE = "sr/wavs";
var START_V = 1;
var END_V = 3;
// var START_H = 96;
// var END_H = 346;

var v_imgs = {};
var v_audios = {};
function preloadVImages() {
  for (var i = START_V; i <= END_V; i+=1) {
    var path = IMG_BASE + '/p225_001-v-' + String(i) + '.png';
    v_imgs[i] = new Image();
    v_imgs[i].src = path;
	var path_audio = AUDIO_BASE + '/p225_001-v-' + String(i) + '.wav';

    v_audios[i] = "<audio controls preload='none'><source src="+path_audio+"></audio>"
  }
}

var h_imgs = {};
var h_audios = {};
function preloadHImages() {
  for (var i = START_H; i <= END_H; i+=1) {
    var path = IMG_BASE + '/p225_001-h-' + String(i) + '.png';
    h_imgs[i] = new Image();
    h_imgs[i].src = path;
	var path_audio = AUDIO_BASE + '/p225_001-h-' + String(i) + '.wav';
    h_audios[i] = "<audio controls preload='none'><source src="+path_audio+"></audio>"
  }
}

function setVImage(i) {
  var image = v_imgs[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
  var audio = v_audios[i];
  $('#interpolation-audio-wrapper').empty().append(audio);
  
  $('#vertical-rate').empty().append(String(i));
  $('#horizontal-rate').empty().append(String(176));
  // $('#horizontal-slider').prop('value', 176);
}

function setHImage(i) {
  var image = h_imgs[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
  var audio = h_audios[i];
  $('#interpolation-audio-wrapper').empty().append(audio);
  
  $('#horizontal-rate').empty().append(String(i));
  $('#vertical-rate').empty().append(String(80));
  $('#vertical-slider').prop('value', 80);
}


$(document).ready(function() {
  preloadVImages();
	// preloadHImages();

    // $('#horizontal-slider').on('input', function(event) {
    //   setHImage(this.value);
    // });
    // setHImage(176);
    // $('#horizontal-slider').prop('max', 346);
	
	$('#vertical-slider').on('input', function(event) {
      setVImage(this.value);
    });
    setVImage(1);
    $('#vertical-slider').prop('max', 3);

})