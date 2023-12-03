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

const parallax = document.querySelectorAll(".parallax");
if (parallax) {
	document.querySelector("body").onmousemove = function (event) {
		event = event || window.event; // кроссбраузерность
		let x = event.clientX / window.innerWidth;
		let y = event.clientY / window.innerHeight;
		parallax.forEach((item) => {
			item.style.transform = `translate(-${x * 40}px, -${y * 40}px) `;
		});
	};
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let navs = gsap.utils.toArray(".nav-link");
let triggerEnd;
const footerAnimateBox = document.querySelectorAll(".footer-animate");
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
			if (self.progress.toFixed(3) == 1) {
				footerAnimateBox.forEach((item) => {
					item.classList.add("anim-start");
				});
			} else if (self.progress.toFixed(3) <= 0.6) {
				footerAnimateBox.forEach((item) => {
					item.classList.remove("anim-start");
				});
			}
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

