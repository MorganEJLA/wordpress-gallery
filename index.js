const screens = [
  {
    title: "Figma Design System & Wireframes",
    desc: "Initial UX planning, layout systems, and interface concepts developed in Figma.",
    src: "images/figma-screenshot.png",
  },
  {
    title: "Portfolio Gallery — Desktop View",
    desc: "Responsive project gallery built with modular layout patterns and reusable components.",
    src: "images/portfolio-landing.png",
  },
  {
    title: "Portfolio Gallery — Mobile Experience",
    desc: "Mobile-first layout optimized for accessibility, readability, and performance.",
    src: "images/gallery-landing-mobile.jpg",
  },
  {
    title: "Single Project Page — Desktop",
    desc: "Detailed project page featuring structured content, image galleries, and navigation components.",
    src: "images/single-project-desktop.png",
  },
  {
    title: "Single Project Page — Mobile",
    desc: "Mobile-optimized project view with touch-friendly navigation and responsive media.",
    src: "images/e-commerce-mobile-single.jpg",
  },
  {
    title: "Custom Project Carousel",
    desc: "JavaScript-powered slider with SVG navigation, optimized for WordPress block layouts.",
    src: "images/slider-carousel.png",
  },
  {
    title: "Project Carousel — Mobile",
    desc: "Touch-optimized slider experience for small-screen devices.",
    src: "images/carousel-mobile.jpg",
  },
  {
    title: "Custom Breadcrumb Navigation",
    desc: "Custom WordPress breadcrumb component supporting usability and content hierarchy.",
    src: "images/breadcrumbs.png",
  },
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");

const lightbox = document.getElementById("lightbox");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbImg = document.getElementById("lbImg");
const lbOpen = document.getElementById("lbOpen");

function render(items) {
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<p style="color: rgba(59,42,33,0.72);">No matches. Try “Figma”, “Mobile”, “Desktop”, etc.</p>`;
    return;
  }

  items.forEach((item, idx) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("data-idx", idx);

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title} screenshot" loading="lazy" />
      <div class="card__meta">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(item));
    grid.appendChild(card);
  });
}

function openLightbox(item) {
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.desc;
  lbImg.src = item.src;
  lbImg.alt = `${item.title} screenshot`;
  lbOpen.href = item.src;

  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
    closeLightbox();
  }
});

search?.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = screens.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.src.toLowerCase().includes(q)
    );
  });
  render(filtered);
});

document.getElementById("year").textContent = new Date().getFullYear();

render(screens);
