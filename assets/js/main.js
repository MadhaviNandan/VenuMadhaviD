

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			// $gallery.poptrox({
			// 	baseZIndex: 10001,
			// 	useBodyOverflow: false,
			// 	usePopupEasyClose: false,
			// 	overlayColor: '#1f2328',
			// 	overlayOpacity: 0.65,
			// 	usePopupDefaultStyling: false,
			// 	usePopupCaption: true,
			// 	popupLoaderText: '',
			// 	windowMargin: 50,
			// 	usePopupNav: true
			// });

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() 
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});
// Smooth scrolling for anchor links
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = this.hash;
    const $target = $(target);

    $('html, body').animate({
        scrollTop: $target.offset().top - $header.outerHeight() // Adjust based on header height
    }, 1500, 'swing', function() {
        handleScroll();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const skills = document.querySelectorAll(".skill");
    const circles = document.querySelectorAll(".circle");

    // Observer for popping animation
    const skillsObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    skills.forEach((skill) => skillsObserver.observe(skill));

    // Observer for progress bar animation
    const progressObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const progress = parseInt(circle.getAttribute("data-progress"), 10);
                    console.log(`Progress: ${progress}`);
                    requestAnimationFrame(() => {
                        circle.style.setProperty("--progress", progress);
                    });
                    observer.unobserve(circle);
                }
            });
        },
        { threshold: 0.5 }
    );

    circles.forEach((circle) => progressObserver.observe(circle));
});





document.addEventListener("DOMContentLoaded", () => {
    // Function to toggle visibility of the experience box
    document.querySelectorAll(".logo").forEach((logo) => {
        logo.addEventListener("click", () => {
            const position = logo.getAttribute("data-position");
            const targetBox = document.querySelector(`.experience-box.${position === "top" ? "right" : "left"}`);

            // Toggle visibility of the corresponding experience box
            if (targetBox.classList.contains("in-view")) {
                targetBox.classList.remove("in-view"); // Hide the box
            } else {
                targetBox.classList.add("in-view"); // Show the box
            }
        });
    });

    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to add 'in-view' class when elements are in the viewport
    function handleScroll() {
        const boxes = document.querySelectorAll(".experience-box");
        boxes.forEach((box) => {
            if (isElementInViewport(box)) {
                box.classList.add("in-view"); // Trigger sliding animation
            } else {
                // Optionally remove class when out of view
                box.classList.remove("in-view");
            }
        });
    }

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);
    // Call handleScroll on initial load to check elements already in view
    handleScroll();
});


// Function to check if an element is in the viewport

function isElementInViewport(el) {

    const rect = el.getBoundingClientRect();

    return (

        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&

        rect.bottom >= 0

    );

}



// Function to add 'in-view' class when elements are in the viewport

function handleScroll() {

    const boxes = document.querySelectorAll('.experience-box');

    boxes.forEach(box => {

        if (isElementInViewport(box)) {

            box.classList.add('in-view'); // Trigger sliding animation

        }

    });

}

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);

// Also run the handleScroll function on page load to check initial positions
window.addEventListener('load', handleScroll);
// Texts for typing effect
const texts = [
    "I'm a passionate Software Developer.",
    "I specialize in UI/UX Design.",
    "I transform data into actionable insights.",
    "Let's create something exceptional together!"
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Adjust speed (in milliseconds)
const pauseBetweenTexts = 2000; // Pause between texts (in milliseconds)

function typeText() {
    const typingTextElement = document.getElementById("typing-text");

    if (charIndex < texts[textIndex].length) {
        typingTextElement.innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed); // Type the next character
    } else {
        // Pause before starting to delete the text
        setTimeout(() => {
            deleteText();
        }, pauseBetweenTexts);
    }
}

function deleteText() {
    const typingTextElement = document.getElementById("typing-text");

    if (charIndex > 0) {
        typingTextElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, typingSpeed / 2); // Delete the next character faster
    } else {
        // Move to the next text or loop back to the first
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

// Start the typing effect on page load
window.addEventListener("load", typeText);

// Wait for the form to be submitted
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Send form data to EmailJS
        emailjs.send("service_90bmxfb", "template_mfh0dou", {
            from_name: name,    // Name from the form
            reply_to: email,    // Email from the form
            message: message    // Message from the form
        }).then(function(response) {
			alert("Message sent successfully!");
			document.querySelector('#contact-form').reset(); // Reset the form
		}, function(error) {
			console.error("EmailJS Error:", error);
			alert("Oops! Something went wrong. " + JSON.stringify(error)); // Show error details
		});
    });
});






})(jQuery);