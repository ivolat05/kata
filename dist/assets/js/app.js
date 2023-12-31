//import * as isWepb from "./vendor/isWebp.js";
//isWepb.isWebp();
// проверка поддержки браузером Webp
function isWebp() {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        if (support == true) {
            document.querySelector("body").classList.add("webp");
        } else {
            document.querySelector("body").classList.add("no-webp");
        }
    });
}
isWebp();


// menu
const menu = () => {
	const btn = document.querySelector(".header__btn-open");
	const body = document.querySelector("body");
	const headerMenu = document.querySelector(".header__row");
	if (btn) {
		btn.addEventListener("click", () => {
			headerMenu.classList.add("--active");
			body.classList.add("--stop");
		});
	}
};
menu();

// menu close
const menuClose = () => {
	const btnClose = document.querySelectorAll(".close-menu");
	const body = document.querySelector("body");
	const headerMenu = document.querySelector(".header__row");
	if (btnClose) {
		btnClose.forEach((item) => {
			item.addEventListener("click", () => {
				headerMenu.classList.remove("--active");
				body.classList.remove("--stop");
			});
		});
	}
};
menuClose();

const parallaxOne = document.querySelectorAll(".parallax-1");
const parallaxTwo = document.querySelectorAll(".parallax-2");
const parallaxThree = document.querySelectorAll(".parallax-3");
const parallaxFoure = document.querySelectorAll(".parallax-4");
const parallaxfive = document.querySelectorAll(".parallax-5");
if (parallaxOne && parallaxTwo) {
	document.querySelector("body").onmousemove = function (event) {
		event = event || window.event; // кроссбраузерность
		let x = event.clientX / window.innerWidth;
		let y = event.clientY / window.innerHeight;
		parallaxOne.forEach((item) => {
			item.style.transform = `translate(-${x * 15 * 2}px, -${
				y * 30 * 2
			}px) `;
		});
		parallaxTwo.forEach((item) => {
			item.style.transform = `translate(${x * 12 * 2}px, -${
				y * 56 * 2
			}px) `;
		});
		parallaxThree.forEach((item) => {
			item.style.transform = `rotate(${x * 5 * 2}deg) `;
		});
		parallaxFoure.forEach((item) => {
			item.style.transform = `rotate(-${x * 5 * 2}deg) `;
		});
		parallaxfive.forEach((item) => {
			item.style.transform = `translate(-${x * 18 * 2}px, ${
				y * 22 * 2
			}px) `;
		});
	};
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let navs = gsap.utils.toArray(".nav-link");
let triggerEnd;
const footerAnimateBox = document.querySelectorAll(".footer-animate");
const headerWrapp = document.querySelector(".header__wrapp");
gsap.utils.toArray(".section").forEach((panel, i) => {
	if (window.innerWidth >= 580) {
		triggerEnd = "bottom 90px";
	} else if (window.innerWidth >= 992) {
		triggerEnd = "bottom 125px";
	} else {
		triggerEnd = "bottom 60px";
	}
	let trigger = ScrollTrigger.create({
		trigger: panel,
		start: "bottom bottom",
		end: triggerEnd,
		pin: true,
		pinSpacing: false,
		onUpdate: (self) => {
			if (
				self.trigger.classList.contains("main") &&
				self.progress.toFixed(3) == 0
			) {
				headerWrapp.classList.add("line");
			} else {
				headerWrapp.classList.remove("line");
			}

			animateAbout();
			footerAnimate();
		},
	});
	let nav = navs[i];

	nav.addEventListener("click", function (e) {
		e.preventDefault();
		gsap.to(window, {
			duration: 1.5,
			scrollTo: trigger.end,
		});
	});
});

function footerAnimate() {
	const about = document.querySelector(".footer");
	if (about) {
		let aboutBox = document.querySelectorAll(".footer-animate");
		const aboutOffsetHeight = about.offsetHeight;
		let scrollDistance = window.scrollY;
		let containerSectionHeight =
			document.querySelector(".container-section").scrollHeight;

		if (scrollDistance > containerSectionHeight - aboutOffsetHeight - 100) {
			aboutBox.forEach((item) => {
				item.classList.add("anim-start");
			});
		} else {
			aboutBox.forEach((item) => {
				item.classList.remove("anim-start");
			});
		}
	}
}
function animateAbout() {
	const about = document.querySelector(".about");
	if (about) {
		let aboutBox = document.querySelectorAll(".about__box");
		const aboutOffsetHeight = about.offsetHeight;
		let scrollDistance = window.scrollY;

		if (scrollDistance > aboutOffsetHeight / 2) {
			aboutBox.forEach((item) => {
				item.classList.add("animate");
			});
		} else {
			aboutBox.forEach((item) => {
				item.classList.remove("animate");
			});
		}
	}
}

