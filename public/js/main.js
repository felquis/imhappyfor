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

      prepareShareUrl(data);

      splash.jAnimate('flipInX');
    });
  }

  var prepareShareUrl = function (data) {
    var url, shareText;

    $('.share-popup').each(function (index, element) {

      url = $(element).attr('href'),
      shareText = $(element).data('share-text');

      url = url.replace(/({{url}})/ig, encodeURIComponent('http://' + location.host + '/'));

      if(shareText) {
        shareText = encodeURIComponent(shareText.replace(/({{answer}})/ig, data.answer));
      }

      url = url.replace(/({{share_text}})/ig, shareText);

      console.log(url);

      $(element).attr('href', url);

    });
  }

  $('.share-popup').click(function(){
    var window_size = '';
    var url = this.href;
    var domain = url.split("/")[2];
    switch(domain) {
        case "www.facebook.com":
            window_size = "width=585,height=368";
            break;
        case "www.twitter.com":
            window_size = "width=585,height=261";
            break;
        case "plus.google.com":
            window_size = "width=517,height=511";
            break;
        default:
            window_size = "width=585,height=511";
    }
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,' + window_size);
    return false;
  });
}());
