// CONSTANTS - NAVIGATION ELEMENTS
const header = document.querySelector("header");
const mainNav = document.getElementById("mainNav");
const navOpen = document.getElementById("navOpen");
const navClose = document.getElementById("navClose");


// THROTTLE
function throttle(func, wait) {
	let waiting = false;
	return function () {
		if (waiting) {
			return;
		}

		waiting = true;
		setTimeout(() => {
			func.apply(this, arguments);
			waiting = false;
		}, wait);
	};
}

// COLLAPSE/EXPAND NAV MENU LINKS

function toggleNav() {

	// Toggle between showing and hiding the nav menu links when the user clicks on the menu toggle

		if (mainNav.classList.contains("nav-visible")) {
			// hide
			mainNav.classList.remove("nav-visible");
			mainNav.classList.add("nav-hidden");
			header.classList.add("nav-collapsed");
			header.classList.remove("nav-expanded");
			navClose.classList.add("hidden");
			navOpen.classList.remove("hidden");
		} else {
			// show
			mainNav.classList.add("nav-visible");
			mainNav.classList.remove("nav-hidden");
			header.classList.remove("nav-collapsed");
			header.classList.add("nav-expanded");
			navOpen.classList.add("hidden");
			navClose.classList.remove("hidden");

		}

}


// DESKTOP
if (matchMedia('only screen and (min-width: 760px)').matches) {

	// Hide header on scroll down
	const scrollDown = "scroll-down";
	let lastScroll = 0;

	let hideHeaderOnScroll = function () {

		window.addEventListener("scroll", () => {
			const currentScroll = window.pageYOffset;
			if (currentScroll <= 0) {
				header.classList.remove(scrollDown);
			return;
			}

		if (currentScroll > lastScroll && !header.classList.contains(scrollDown)) {
			// down
			header.classList.add(scrollDown);
		} else if (currentScroll < lastScroll && header.classList.contains(scrollDown)) {
			// up
			header.classList.remove(scrollDown);
		} else if (mainNav.classList.contains("nav-visible")) {
			//disable when nav is visible
			header.classList.remove(scrollDown);
		}

		lastScroll = currentScroll;

		});

	}


	// Trigger scroll events with throttle
	const onScroll = throttle(() => {
		// Call function
		hideHeaderOnScroll();
	}, 500);

	// On scroll with throttle
	document.addEventListener("scroll", onScroll);

}
