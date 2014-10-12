;(function () {
  'use strict';

  var sendingForm = false;

  $('#send-form').on('submit', function (e) {
    e.preventDefault();

    var answer = $('#send-answer').text(),
        background = $('.splash-container').css('background-image').replace(/.*(\d{3}).jpg.*/, '$1');

    if (answer.length < 3 || sendingForm) {
      return false;
    }

    sendingForm = true;

    onSubmitAnimation();

    $.post( '/save', {
      text: answer,
      bg: background
    }).done(function(data) {
      setTimeout(function () {
        onSubmitSuccess(data);
      }, 500);
    }).fail(function() {
      console.log('error: ', arguments);
    });
  });

  var onSubmitAnimation = function () {
    var sendForm = $('#send-form'),
        sendButton = sendForm.find('button'),
        splashContainer = $('.splash-container');

    splashContainer.height(splashContainer.height());

    sendButton.text(sendButton.data('sending-text'));

    sendForm.find('[data-answer-line]').slideUp(function () {
      splashContainer.removeAttr('style');
    });
  }

  var onSubmitSuccess = function (data) {
    var splash = $('.splash'),
        splashContainer = $('.splash-container');

    splash.jAnimate('flipOutX', function (element) {

      splash.addClass('step-2').removeClass('step-1');

      var subhead = splash.find('[data-success-text]');

      subhead.text(subhead.data('success-text').replace(/({{answer}})/ig, data.answer));

      splash.jAnimate('flipInX');
    });
  }
}());
