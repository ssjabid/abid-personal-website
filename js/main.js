document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");

  // 1. Generate Stars
  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars");
  document.body.prepend(starsContainer);

  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 20 + 10}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }

  // 2. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 3. Scroll Animations (The "Smooth Transition" Feature)
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-show");
      }
    });
  }, observerOptions);

  // Select elements to animate
  const hiddenElements = document.querySelectorAll(".scroll-hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // 4. Stock Price Fetcher (Investments Page)
  if (window.location.pathname.includes("investments.html")) {
    const cards = document.querySelectorAll(".investment-card");
    cards.forEach((card) => {
      const ticker = card.dataset.ticker;
      if (ticker) {
        fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1d&interval=1d`
        )
          .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
          })
          .then((data) => {
            const price =
              data.chart.result[0].meta.regularMarketPrice.toFixed(2);
            const priceEl = card.querySelector(".price");
            priceEl.textContent = `$${price}`;
            priceEl.style.color = "#4ade80";
          })
          .catch((err) => {
            console.log("Fetch error (CORS likely):", err);
            card.querySelector(".price").textContent = "Price N/A";
          });
      }
    });
  }
});

// 5. Toggle Expand (Global)
window.toggleExpand = function (btn) {
  btn.classList.toggle("active");
  const content = btn.nextElementSibling;
  if (content && content.classList.contains("expand-content")) {
    content.classList.toggle("show");
  }
};
