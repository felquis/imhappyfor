;(function () {
  'use strict';

  $('#send-form').on('submit', function (e) {
    e.preventDefault();

    var answer = $('#send-answer').text(),
        background = $('.splash-container').css('background-image').replace(/.*(\d{3}).jpg.*/, '$1');

    // console.log(answer, background, lang);

    if (answer.length < 4) {
      return false;
    }

    $.post( '/save', {
      text: $('#send-answer').text(),
      bg: background
    }).done(function() {
      console.log( 'success', arguments );
    }).fail(function() {
      console.log( 'error: ', arguments );
    });
  })
}());
