// ---------- typewriter ----------
const roles = ["Student", "Cyber Security Aspirant", "Bug Hunter", "CS Teacher"];
let speed = 100;
let textEl;
let roleIndex = 0;
let charIndex = 0;

function typewriter() {
    if (charIndex < roles[roleIndex].length) {
        textEl.innerHTML += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typewriter, speed);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (textEl.innerHTML.length > 0) {
        textEl.innerHTML = textEl.innerHTML.slice(0, -1);
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        setTimeout(typewriter, 500);
    }
}

// ---------- mobile dropdown ----------
function setupDropdown() {
    const dropdownbtn = document.getElementById("dropdownbtn");
    const dropdowncon = document.getElementById("dropdowncontent");
    if (!dropdownbtn || !dropdowncon) return;

    dropdownbtn.addEventListener("click", () => {
        dropdowncon.style.display = (dropdowncon.style.display === "block") ? "none" : "block";
    });

    dropdowncon.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => { dropdowncon.style.display = "none"; });
    });

    document.addEventListener("click", (e) => {
        if (!dropdownbtn.contains(e.target) && !dropdowncon.contains(e.target)) {
            dropdowncon.style.display = "none";
        }
    });
}

// ---------- scroll reveal ----------
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".hiddentxt").forEach((el) => observer.observe(el));
}

// ---------- active nav link on scroll ----------
function setupActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll("nav a, .dropdown-content a");

    function updateActiveLink() {
        let current = sections[0] ? sections[0].id : "";
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollY >= top - height / 3) current = section.id;
        });
        links.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
}

document.addEventListener("DOMContentLoaded", () => {
    textEl = document.querySelector(".typewritter-text");
    if (textEl) typewriter();

    setupDropdown();
    setupScrollReveal();
    setupActiveNav();
});
