//@prepros-append jq-start.js
//@prepros-append forms.js
//@prepros-append script.js
//@prepros-append responsive.js
//@prepros-append jq-end.js
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//FORMS
function forms() {
	//SELECT
	if ($('select').length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}
			var opt = {
				cursorcolor: "#5a84c5",
				cursorwidth: "3px",
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "0px",
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select() {
			$.each($('select'), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent('.select-block').length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
				} else {
					$(this).parent('.select-block').find('.select').remove();
				}
				var milti = '';
				var check = '';
				var sblock = $(this).parent('.select-block');
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr('multiple') == 'multiple') {
					milti = 'multiple';
					check = 'check';
				}
				$.each($(this).find('option'), function (index, val) {
					if ($(this).attr('value') != '') {
						soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
					} else if ($(this).parent().attr('data-label') == 'on') {
						if (sblock.find('.select__label').length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr('data-type') == 'search') {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
						"</div>" +
						soptions +
						"</div>");
					$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
						parentSectionClass: 'select-options_' + ind,
						parentLookupClass: 'select-options__value_' + ind,
						childBlockClass: 'select-options__value_' + ind
					});
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
						"</div>" +
						soptions +
						"</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != '') {
					sblock.find('.select').addClass('focus');
				}
				if ($(this).attr('data-req') == 'on') {
					$(this).addClass('req');
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
			});
		}
		select();

		$('body').on('click', '.select', function () {
			if (!$(this).hasClass('disabled')) {
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr('data-type') == 'search') {
					if (!$(this).hasClass('active')) {
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});

		$('body').on('click', '.select-options__value', function () {
			if ($(this).parents('.select').hasClass('multiple')) {
				if ($(this).hasClass('active')) {
					if ($(this).parents('.select').find('.select-title__value span').length > 0) {
						$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
					} else {
						$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				} else {
					$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
					if ($(this).parents('.select').find('.select-title__value span').length == 0) {
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
				}
				return false;
			}

			if ($(this).parents('.select').attr('data-type') == 'search') {
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
			} else {
				$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

			$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if ($.trim($(this).data('value')) != '') {
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
			} else {
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
			}


			if ($(this).parents('.select-block').find('select').val() != '') {
				$(this).parents('.select-block').find('.select').addClass('focus');
			} else {
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if (!$(this).parents('.select').data('tags') != "") {
				if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if ($(this).parents('.select-block').find('select').data('update') == 'on') {
				select();
			}
		});

		$(document).on('click touchstart', function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			};
		});

		$(document).on('keydown', function (e) {
			if (e.which == 27) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});

	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
		});
	});

	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});


	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+7(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});

	//CHECK
	$.each($('.check'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$('body').off('click', '.check', function (event) { });
	$('body').on('click', '.check', function (event) {
		if (!$(this).hasClass('disable')) {
			var target = $(event.target);
			if (!target.is("a")) {
				$(this).toggleClass('active');
				if ($(this).hasClass('active')) {
					$(this).find('input').prop('checked', true);
				} else {
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function (index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function (event) {
		if (!$(this).hasClass('disable')) {
			if ($(this).hasClass('active') && $(this).hasClass('order')) {
				$(this).toggleClass('orderactive');
			}
			$(this).parents('.options').find('.option').removeClass('active');
			$(this).toggleClass('active');
			$(this).children('input').prop('checked', true).trigger("change");
		}
	});
}
forms();

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);

		//ОПТРАВКА ФОРМЫ ТОЛЬКО ДЛЯ ТЕХ ФОРМ У КОТОРЫХ ЕСТЬ ДАТА АТРИБУТ <ms> [ПРИМЕР: <form action="" data-ms="success"></form>]
		function showResponse(html) {
			if (!form.hasClass('nomessage')) {
				showMessage(messagehtml);
			}
			if (!form.hasClass('noclear')) {
				clearForm(form);
			}
		}
		// Form plugin: http://jquery.malsup.com/form/
		var options = {
			success: showResponse
		};
		form.ajaxForm(options);

		setTimeout(function () {
			if (!form.hasClass('nomessage')) {
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if (!form.hasClass('noclear')) {
				clearForm(form);
			}
		}, 0);

		return false;

	} else {
		return false;
	}
});

function formValidate(input) {
	var er = 0;
	var form = input.parents('form');

	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}

	if (input.parent().hasClass('captcha')) {

		var firstNum = parseInt(input.prev().find('.first-num').text());
		var secondNum = parseInt(input.prev().find('.second-num').text());
		var res = firstNum + secondNum;

		if (input.val() != res || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}


	return er;
}

function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}

function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen(ms, '');
}

function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}

function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}

function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}

function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}

function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}

function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}

function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}

function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}

function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
	if ($(".cart").length) {
		if (hsh == "seperate") {
			$(".cart__select option").removeAttr("selected");
			$(".cart__select option").eq(1).attr("selected", "selected");
		}
		if (hsh == "full") {
			$(".cart__select option").removeAttr("selected");
			$(".cart__select option").eq(0).attr("selected", "selected");
		}
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}


$('.header-menu__icon').click(function (event) {
	$(this).toggleClass('active');
	$('.header-menu').toggleClass('active');
	$('.header').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});

// Parallax Mouse
$("header, .whyus").on("mousemove", function (e) {
	const x = e.pageX / $("header, .whyus").width();
	const y = e.pageY / $("header, .whyus").height();

	$(".parallax-elem-1, .parallax-elem-2, .parallax-elem-3").css("opacity", 1);
	$(".parallax-elem-1").css(
		"transform",
		"translate(-" + x * 120 + "px, " + y * 90 + "px) rotate(-15deg)"
	);
	$(".parallax-elem-2").css(
		"transform",
		"translate(" + x * 80 + "px, -" + y * 120 + "px) rotate(45deg)"
	);
	$(".parallax-elem-3").css(
		"transform",
		"translate(-" + x * 150 + "px, " + y * 50 + "px) rotate(-35deg)"
	);
});

// Random
function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
$(".first-num").text(randomInteger(0, 10));
$(".second-num").text(randomInteger(0, 10));

// Draw SVG
var svgsArr = [];
var successSvgs = 0;
for (let i = 0; i < $('.steps-item').length; i++) {
	svgsArr.push($('.steps-item__trg').eq(i).drawsvg());
}
$('.steps').waypoint(function (direction) {
	if (successSvgs == 0) {
		for (let i = 0; i < $('.steps-item').length; i++) {
			setTimeout(function () {
				svgsArr[i].drawsvg('animate');
				$(".steps-item__trg").eq(i).delay(1000).queue(function () {
					$(this).parent().parent().addClass('active').dequeue();
					if (i == ($(".steps-item").length - 4)) $(".steps__row").css("transform", "scale(1)");
				});
			}, i * 1000);
		}
		successSvgs = 1;
	}
}, {
	offset: '50%'
});


// Waypoints Animating
$(".whyus-tabs__navitem").css('opacity', 0);
$(".header-content__left").css("opacity", 0);
$(".whyus .portfolio-item").css("opacity", 0);
$(".homeservices-item").css("opacity", 0);
$(".services-item").css("opacity", 0);

$('.header').waypoint(function (direction) {
	$(".header-content__left").addClass('fadeInLeft');
	$(".header-service").addClass('zoomIn');
}, {
	offset: '100%'
});

$('.whyus').waypoint(function (direction) {
	$(".whyus-tabs__navitem").addClass('fadeInLeft visible');
	$(".portfolio-item").addClass('fadeIn');
}, {
	offset: '50%'
});

$('.homeservices').waypoint(function (direction) {
	$(".homeservices-item").eq(0).addClass('fadeInLeft');
	$(".homeservices-item").eq(1).addClass('fadeInDown');
	$(".homeservices-item").eq(2).addClass('fadeInRight');
	$(".homeservices-full").eq(0).addClass('fadeInUp');
}, {
	offset: '50%'
});

$('.services').waypoint(function (direction) {
	$(".services-item").addClass('fadeIn visible');
}, {
	offset: '50%'
});


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	var dataSelect = $(this).data('select');
	console.log(dataSelect);
	if (pl == "callback") {
		if (dataSelect >= 0) {
			$(".popup-callback").find('.select-normal option').removeAttr("selected");
			$(".popup-callback").find('.select-normal option').eq(dataSelect).attr("selected", "selected");
			$(".popup-callback").find('.select-title__value').text($(".popup-callback").find('.select-normal option').eq(dataSelect).text());
		} else {
			$(".popup-callback").find('.select-normal option').removeAttr("selected");
			$(".popup-callback").find('.select-normal option').eq(0).attr("selected", "selected");
			$(".popup-callback").find('.select-title__value').text($(".popup-callback").find('.select-normal option').eq(0).text());
		}
	}
	popupOpen(pl, v);
	return false;
});

function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.header-menu').hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}

function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}

function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.header-menu').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}

$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});

$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});

$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});


function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

// Табы
$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
	if ($(this).hasClass('all')) {
		$(this).closest('.tabs').find('.tab__item').addClass('active');
	}
});



// Cart Page
var sum = 0;

// Cart Select
if ($(".cart__select").val() == 1) {
	$(".cart-ready").stop().fadeIn();
	$(".cart-sep").stop().fadeOut();
} else {
	$(".cart-ready").stop().fadeOut();
	$(".cart-sep").stop().fadeIn();
}
$(".cart__select").on("change", function () {
	if ($(this).val() == 1) {
		$(".cart-ready").stop().fadeIn();
		$(".cart-sep").stop().fadeOut();
	} else {
		$(".cart-ready").stop().fadeOut();
		$(".cart-sep").stop().fadeIn();
	}
	sum = 0;
	$('.cart-price-wrap__big span').text(numberWithDots(sum));
});

// Cart
if ($(".rect-tabs__navitem").parents('.cart-ready').length) {
	$(".rect-tabs__navitem").not('.cart-ready-clear').click(function () {
		var arr = $(this).data('attrs').split("|");
		var eq = 0;
		var arrSplited = 0;
		for (var i = 0; i < arr.length; i++) {
			arrSplited = arr[i].trim().split("-");
			eq = parseInt(arrSplited[0]) - 1;
			$(".options").eq(eq).find('.option').removeClass('active');
			$(".options").eq(eq).find('input').prop("checked", false).trigger("change");
			$(".options").eq(eq).find("input[value*='" + arrSplited[1] + "']").prop("checked", true).trigger("change").parent().addClass('active');
		}
	});

	$(".rect-tabs__navitem.cart-ready-clear").click(function () {
		$(".options").find('.option').removeClass('active');
		$(".options").find('input').prop("checked", false).trigger("change");
	});
}


function numberWithDots(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$(".cart-price-wrap__btn").click(function () {
	if ($('.cart-ready').is(":visible")) {
		$(".options").each(function (i) {
			if ($(this).find('input:checked').length) {
				sum += parseInt($(this).find('input:checked').parent().data('price'));
			}
		});
		$('.cart-price-wrap__big span').text(numberWithDots(sum));
		sum = 0;
	} else {

		$(".check").each(function (i) {
			if ($(this).find('input:checked').length) {
				sum += parseInt($(this).find('input:checked').parent().data('price'));
			}
		});

		$('.cart-price-wrap__big span').text(numberWithDots(sum));
		sum = 0;
	}
});
//Adaptive functions
$(window).resize(function (event) {
	adaptive_function();
});

function adaptive_wrap(w, h) {
	var a = $(".header-body__btn, .header-body__phone, .header-body__mail");
	var b = $(".homeservices-body__column-2 .homeservices-item");

	// 768
	if (w < 768) {
		if (!a.hasClass('done')) {
			a.addClass('done').wrapAll("<div class='header-body__wrap' />")
			$('.header-body__wrap').insertAfter(".header-menu__list");
			$('.header-menu>.container').removeClass();
		}

	} else {
		if (a.hasClass('done')) {
			$('.header-body__wrap').appendTo(".header-body");
			a.removeClass('done').unwrap();
			$('.header-menu>div').addClass("container");
		}
	}

	// 993
	if (w < 993) {
		if (!b.hasClass('done')) {
			b.addClass('done').addClass("homeservices-item--vertical");
		}

	} else {
		if (b.hasClass('done')) {
			b.removeClass('done').removeClass("homeservices-item--vertical");
		}
	}
}



function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_wrap(w, h);

	if (w > 1282) {
		var arr = [], max = 0;
		for (var i = 0; i < $(".steps-item__descr").length; i++) {
			arr.push(parseInt($(".steps-item__descr").eq(i).outerHeight()));
			if (i == 4) {
				max = Math.max(arr[0], arr[1], arr[2], arr[3], arr[4]);
				$(".steps__row").css("margin-top", max + 70);
			}
		}
	}

}
adaptive_function();
});

$(window).on("load", function () {
	$(".loader").fadeToggle(500);
	$("body").removeClass("lock");
});
