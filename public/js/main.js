(function ($) {
	'use strict';

	var $introInput = $('.intro-input'),
		suggest = [
			'Eg. My Family',
			'Eg. My Sons',
			'Eg. The Piece',
			'Eg. Your Love',
			'Eg. My Work',
			'Eg. Food',
			'Eg. Ice Cream'
		],
		suggestTime = setInterval(function () {
			$introInput.attr({
				placeholder: suggest[Math.floor(Math.random(0, 5) * 10)]
			});
		}, 1000);

		$introInput.on('focus', function () {
			clearInterval(suggestTime);
		});
}(jQuery))