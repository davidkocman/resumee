(function($) {
	"use strict";

	/* Splash screen page load
	/* ------------------------------------------------------ */
	var pageLoad = function() {
		$(window).on("load", function() {
			$(".loader-wrapper")
				.delay(1700)
				.fadeOut(1000);
			$("#main").show();
		});
	};

	/* Scroll position check <-- not in use
	/* ------------------------------------------------------ */
	var scrollPositionCheck = function() {
		var burgerMenu = $(".burger-menu");

		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll > 100) {
				burgerMenu.addClass("darkBackground");
			} else {
				burgerMenu.removeClass("darkBackground");
			}
		});
	};

	/* Scroll position indicator
	/* ------------------------------------------------------ */

	var pageScrollPosition = function() {
		window.onscroll = function() {
			var winScroll =
				document.body.scrollTop || document.documentElement.scrollTop;
			var height =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			var scrolled = (winScroll / height) * 100;
			document.getElementById("scrollProgress").style.width = scrolled + "%";
		};
	};

	/* Calculate age
	/* ------------------------------------------------------ */
	var getAge = function(date) {
		var partsArr = date.split("/").map(Number),
			ageDif = Date.now() - new Date(partsArr[0], partsArr[1] - 1, partsArr[2]),
			ageDate = new Date(ageDif),
			age = Math.abs(ageDate.getUTCFullYear() - 1970);

		$(".age").append(age);
	};

	/* Scroll to section
	/* - handle links with @href started with '#' only
	/* ------------------------------------------------------ */
	var scrollToPosition = function() {
		$(document).on("click", 'a[href^="#"]', function(e) {
			var id = $(this).attr("href");
			var $id = $(id);

			if ($id.length === 0) {
				return;
			}
			// prevent standard hash navigation (avoid blinking in IE)
			e.preventDefault();
			// top position relative to the document
			var position = $(id).offset().top;
			//animate top scrolling
			$("body, html").animate({
				scrollTop: position
			});
		});
	};

	/* OffCanvas Menu
	/* ------------------------------------------------------ */
	var bcOffCanvas = function() {
		var menuTrigger = $(".burger-menu"),
			nav = $("nav"),
			closeButton = nav.find("#close-button"),
			siteBody = $("body");

		// open menu by clicking on the menu icon
		menuTrigger.on("click", function(e) {
			e.preventDefault();
			nav.toggleClass("is-active");
			siteBody.toggleClass("menu-open");
		});

		// close menu clicking outside the menu itself
		siteBody.on("click", function(e) {
			e.preventDefault();
			if (!$(e.target).is(".burger-menu, nav")) {
				nav.removeClass("is-active");
				siteBody.removeClass("menu-open");
			}
		});
		// close menu clicking on close button (X)
		closeButton.on("click", function(e) {
			e.preventDefault();
			nav.removeClass("is-active");
			siteBody.removeClass("menu-open");
		});
	};

	/* Contact Form Field Reset
	/* ------------------------------------------------------ */
	var resetFormFields = function() {
		$('input[type="text"]').val("");
		$('input[type="email"]').val("");
		$("#contactMessage").val("");
	};

	/* Contact Form Validation
	/* ------------------------------------------------------ */
	var validate = {
		// Name must be at least 2 [a-zA-Z ] chars long
		nameRegex: /^[a-zA-Z ]{2,}$/,
		emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

		name: function(name) {
			return this.nameRegex.test(name);
		},

		email: function(email) {
			return this.emailRegex.test(email);
		},

		form: function() {
			var name = $("#contactName").val();
			var email = $("#contactEmail").val();
			var message = $("#contactMessage").val();
			var errorName = true,
				errorEmail = true,
				errorMessage = true;

			if (this.name(name)) {
				errorName = false;
				$("#contactName").removeClass("formError");
				$("#nameError").hide();
			} else {
				$("#contactName").addClass("formError");
				$("#nameError").show();
			}
			if (this.email(email)) {
				errorEmail = false;
				$("#contactEmail").removeClass("formError");
				$("#mailError").hide();
			} else {
				$("#contactEmail").addClass("formError");
				$("#mailError").show();
			}
			if (message === null || message === "") {
				$("#contactMessage").addClass("formError");
				$("#messageError").show();
			} else {
				errorMessage = false;
				$("#contactMessage").removeClass("formError");
				$("#messageError").hide();
			}
			if (errorName === true || errorEmail === true || errorMessage === true) {
				return false;
			} else {
				return true;
			}
		}
	};

	/* Contact Form Submit
	/* ------------------------------------------------------ */
	var sendEmail = function() {
		var sLoader = $(".loader-wrapper"),
			successMsg = $(".modal.success"),
			errorMsg = $(".modal.error"),
			form = $("form");

		$.ajax({
			type: "post",
			url: "inc/sendEmail.php",
			data: form.serialize(),
			/*
			beforeSend: function() {
				sLoader.fadeIn();
				sLoading.fadeIn();
			},
			*/
			success: function(msg) {
				// Message was sent
				if (msg.error === false || msg.error === "false") {
					resetFormFields();
					successMsg.addClass("modalShown");
					setTimeout(function() {
						successMsg.removeClass("modalShown");
					}, 4000);
				}
				// There was an error
				else {
					errorMsg.addClass("modalShown");
					setTimeout(function() {
						errorMsg.removeClass("modalShown");
					}, 4000);
				}
			},
			error: function(msg) {
				errorMsg.addClass("modalShown");
				setTimeout(function() {
					errorMsg.removeClass("modalShown");
				}, 4000);
			}
		});
	};

	var submitButton = $(".submit-form");
	submitButton.on("click", function(event) {
		event.preventDefault();
		if (validate.form()) {
			sendEmail();
		}
	});

	$(".md-close").on("click", function() {
		$(this).fadeOut();
		$(".loader-wrapper").fadeOut();
	});

	/* Initialize
	/* ------------------------------------------------------ */
	var init = (function() {
		pageLoad();
		scrollPositionCheck();
		scrollToPosition();
		bcOffCanvas();
		getAge("1985/12/29");
		pageScrollPosition();
	})();

	window.sr = ScrollReveal({
		duration: 750,
		mobile: true
	});
	sr.reveal(".skills", {
		delay: 100
	});
	sr.reveal(".exps", {
		delay: 200
	});
	sr.reveal(".experience", {
		delay: 100
	});
	sr.reveal(".education", {
		delay: 200
	});
	sr.reveal(".blog-card", {
		delay: 100
	});
	sr.reveal(".info .col", {
		delay: 100,
		origin: "bottom"
	});
	sr.reveal(".item", {
		delay: 100,
		origin: "top"
	});
})(jQuery);
