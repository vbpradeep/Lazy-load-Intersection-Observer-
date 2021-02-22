// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>Lazy Loading images</h1>`;

const observe = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      const img = entry.target;
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;

      requestIdleCallback(() => {
        if (srcset) {
          img.srcset = srcset;
        }
        img.src = src;
      });
      observer.unobserve(img);
    }
  });
};

const observer = new IntersectionObserver(observe, {
  root: document.querySelector("body"),
  rootMargin: "0px",
  threshold: 1.0
});
const images = document.querySelectorAll("img.lazy");
images.forEach(img => {
  observer.observe(img);
});
