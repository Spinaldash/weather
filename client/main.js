'use strict';
$(document).ready(init);

function init() {
  $('#get-cams').click(clickGetCams);
  $('#nsa').click(clickNsa);
}

function clickNsa() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var url = 'http://api.wunderground.com/api/7223c528ababc07f/webcams/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';
  paint(url);
}

// 'http://api.wunderground.com/api/7223c528ababc07f/geolookup/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';

function error(err) {
  console.log('could not find position', err);
}

function clickGetCams() {
  var zipCode = $('#zip-code').val();
  var url = 'http://api.wunderground.com/api/7223c528ababc07f/webcams/q/' + zipCode + '.json';
}

function paint(url) {
  $.getJSON(url, function(response) {
    $('images').empty();
    console.log('la respuesta es:', response);
    response.webcams.forEach(function(cam) {
      var $img = $('<div>');
      $img.addClass('image');
      $img.css('background-image', 'url("' + cam.CURRENTIMAGEURL + '")')
      $('#images').append($img);
    });
  });
}
