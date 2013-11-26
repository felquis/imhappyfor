
var shareURL;

(function () {
	shareURL = function (obj) {

	    var url = 'https://www.facebook.com/sharer/sharer.php?s=100&p[url]=';

	    url += encodeURIComponent(obj.url);

	    if (!!obj.image) {
	        url += '&p[images][0]=' + encodeURIComponent(obj.image);
	    }

	    if (!!obj.title) {
	        url += '&p[title]=' + encodeURIComponent(obj.title);
	    }

	    if (!!obj.summary) {
	        url += '&p[summary]=' + encodeURIComponent(obj.summary);
	    }

	    return url;
	}
}());

(function ($) {
	'use strict';

	/****
		Answers suggestions changings the input placeholder
	****/
	var $introInput = $('.intro-input'),
		$introForm = $('#intro-form'),
		suggest = [
			'e.g. My Family',
			'e.g. My Sons',
			'e.g. The Peace',
			'e.g. Your Love',
			'e.g. My Work',
			'e.g. Food',
			'e.g. Ice Cream'
		],
		suggestTime = setInterval(function () {
			$introInput.attr({
				placeholder: suggest[Math.floor(Math.random(0, 5) * 10)]
			});
		}, 1000);

		$introInput.on('focus', function () {
			clearInterval(suggestTime);
		});

	/*
		First step
			- Get the answer
			- Save it and return the post ID
			- Go to the second step
	*/
	var firstStep = function (event) {
		// TODO: Improve answers verification
		var serialize = $introForm.serializeArray();

		if ( !!serialize[0].value === false ) {
			$('.intro-input-danger').remove();
			$('<div class="text-danger h5 intro-input-danger">')
				.text('Something is wrong with your answer')
				.insertAfter($introInput);

			$introInput.parent().addClass('has-error');

			return false;
		}

		/*
			TODO:
				1 - Save the answer
				2 - Return post ID
				3 - ok - Go to second step

		*/

		// 1 - Sabe the answer
		// Make a post with ajax to /savemyanswer and

		// 2 - Return post ID
		// Save this ID in the hidden input named `answerId`

		// 3 - Go to second step
		$('.second-step-answer').text(serialize[0].value);

		var urlFacebook = shareURL({
		    url: location.protocol + '//' + location.host,
		    image: 'http://felquis.com/img/posts/ilusao-de-muller-lyer.jpg',
		    title: 'I\'m happy for ' + serialize[0].value + ', answers this question too',
		    summary: 'Description'
		});

		var urlTwitter = 'https://twitter.com/intent/tweet?url='+ encodeURIComponent(location.protocol + '//' + location.host + '/') +'&text='+ encodeURIComponent('I\'m happy for ' + serialize[0].value + ', answers this question too');

		$('.facebook.button').attr({ href: urlFacebook });
		$('.twitter.button').attr({ href: urlTwitter });

		$('.first-step').slideUp();
		$('.second-step').slideDown();
	}

	/***
		On enter with the answer
	****/
	// Clicking or pressing the 'Send' button
	$('.btn-success').on('click', firstStep);
	$('.intro-input').on('keypress', function (event) {
		// If pressed key is the ENTER
		if (event.keyCode === 13) {
			firstStep(this);
		}
	});

	// Prevent form submit
	$introForm.on('submit', function (event) {
		event.preventDefault();
	})
}(jQuery))