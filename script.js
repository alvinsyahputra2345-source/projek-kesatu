/* MENU NAVIGASI */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
    );
});

// Tutup menu setelah salah satu link diklik
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
    });
});


/* NAVIGASI AKTIF SESUAI BAGIAN */
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-25% 0px -60% 0px"
});

sections.forEach(section => observer.observe(section));


/* EFEK MENGETIK */
const typing = document.getElementById("typing");
const words = [
    "Web Developer",
    "Web Designer",
    "Student of SMKN 1 PASURUAN"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    typing.textContent = currentWord.substring(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (deleting && charIndex > 0) {
        charIndex--;
    } else {
        if (!deleting) {
            deleting = true;
            delay = 1200;
        } else {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


/* MEMBUAT BINTANG SECARA OTOMATIS */
const starsContainer = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = "✦";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (Math.random() * 7 + 3) + "px";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (Math.random() * 3 + 2) + "s";

    starsContainer.appendChild(star);
}


/* TAHUN OTOMATIS */
document.getElementById("year").textContent =
    new Date().getFullYear();


// Form kontak membuka Gmail
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const senderName =
        document.getElementById("senderName").value.trim();

    const senderEmail =
        document.getElementById("senderEmail").value.trim();

    const message =
        document.getElementById("message").value.trim();

    if (!senderName || !senderEmail || !message) {
        formStatus.textContent = "Lengkapi semua kolom terlebih dahulu.";
        return;
    }

    // Alamat Gmail tujuan
    const recipient = "alvinsyahputra2345@gmail.com";

    // Isi email yang akan dibuka di Gmail
    const subject = `Pesan website dari ${senderName}`;

    const body =
        `Nama: ${senderName}\n` +
        `Email pengirim: ${senderEmail}\n\n` +
        `Pesan:\n${message}`;

    const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(recipient) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    formStatus.textContent =
        "Gmail sedang dibuka. Periksa kembali pesan kamu.";

    // Buka Gmail di tab baru
    const gmailWindow = window.open(gmailURL, "_blank");

    if (!gmailWindow) {
        formStatus.textContent =
            "Pop-up diblokir. Izinkan pop-up atau buka Gmail secara manual.";
    }
});