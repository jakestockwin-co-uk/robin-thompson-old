// no-unused-vars triggers on the function names, since they're not used in this file.
/* eslint no-unused-vars:0 */

// no-undef triggers on the $ for jquery.
/* eslint no-undef:0 */

var duration = 500;
function changeDiv (event, link, title, heading, active) {
	var headingDisplay = heading.replace('`', "'");
	if (document.getElementsByClassName('active').length > 0) {
		document.getElementsByClassName('active')[0].classList.remove('active');
	}
	if (active != null && active !== undefined) {
		document.getElementById(active).classList.add('active');
	}
	event.preventDefault();
	if (link !== location.pathname) {
		away();
		setTimeout(function () {
			document.title = 'Robin Thompson - ' + title;
			document.getElementById('heading').innerHTML = headingDisplay;
			$('#content').load(link + ' #content > div', function () {
				back();
				var content = document.getElementById('content');
				var state = { content: content.innerHTML, title: title, heading: heading, active: active };
				window.history.pushState(state, 'Title', link);
			});
		}, duration);
	}
}
window.onpopstate = function (e) {
	away();
	setTimeout(function () {
		var state = window.history.state;
		if (document.getElementsByClassName('active').length > 0) {
			document.getElementsByClassName('active')[0].classList.remove('active');
		}
		if (state.active != null && state.active !== undefined) {
			document.getElementById(state.active).classList.add('active');
		}
		document.getElementById('content').innerHTML = state.content;
		document.getElementById('heading').innerHTML = state.heading.replace('`', "'");
		document.title = 'Robin Thompson - ' + state.title;
		back();
	}, duration);
};
function updateState (link, title, heading, active) {
	var state = { content: document.getElementById('content').innerHTML, title: title, heading: heading, actvie: active };
	window.history.replaceState(state, 'Title', link);
}
function away () {
	var content = document.getElementById('animateMe');
	content.style.animationDuration = duration + 'ms';
	content.style.animationFillMode = 'forwards';
	content.style.animationName = 'FadeOut';
}
function back () {
	var content = document.getElementById('animateMe');
	content.style.animationDuration = duration + 'ms';
	content.style.animationFillMode = 'forwards';
	content.style.animationName = 'FadeIn';
}
