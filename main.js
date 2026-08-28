/* AQUACRAFT PLUMBING INC. — minimal vanilla JS (no dependencies) */
(function () {
  "use strict";

  // --- Mobile navigation toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu after tapping a link (single-page anchors / navigation)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });
  }

  // --- Current year in footer ---
  var years = document.querySelectorAll("[data-year]");
  var y = new Date().getFullYear();
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = y;
  }
})();

/* --- Service-specific FAQs and matching search-engine structured data --- */
(function () {
  "use strict";

  var key = window.location.pathname.split("/").pop().replace(/\.html$/, "");
  var pages = {
    "drain-cleaning": [
      ["What types of drains do you clean?", "We clear sinks, tubs, showers, floor drains, and main drain lines in residential and light commercial properties."],
      ["What can recurring clogs mean?", "Recurring clogs may point to buildup or a larger drain-line issue. We assess the symptoms and explain the appropriate next step."],
      ["Do you offer urgent drain service?", "Call or text 707-757-3838 to describe the problem. Same-day and emergency assistance is subject to availability."]
    ],
    "water-heaters": [
      ["Do you work on tank and tankless water heaters?", "Yes. We repair, service, and install both traditional tank and tankless water heaters."],
      ["Should I repair or replace my water heater?", "That depends on the unit's age, condition, and the problem. We evaluate it and explain the repair and replacement options."],
      ["What should I do if I have no hot water?", "Call or text 707-757-3838 and describe what is happening. Same-day assistance is subject to availability."]
    ],
    "fixture-installation": [
      ["What plumbing fixtures do you install and repair?", "We work on faucets, sinks, toilets, shut-off valves, supply connections, and other common plumbing fixtures."],
      ["Can you install a fixture I already purchased?", "Contact us with the fixture model and property details so we can confirm fit, scope, and scheduling."],
      ["Do you work on light commercial properties?", "Yes. We provide fixture services for homes and light commercial properties in Sonoma, Napa, and Marin counties."]
    ],
    "leak-repair": [
      ["What are common signs of a water leak?", "Visible water, damp areas, the sound of running water, or unexplained water use can be signs of a leak."],
      ["Can plumbing leaks be hidden?", "Yes. Leaks can occur behind walls or under floors. We evaluate the signs and work to identify the source."],
      ["What should I do for an urgent leak?", "If you know how and can do so safely, shut off the water, then call or text 707-757-3838. Same-day and emergency assistance is subject to availability."]
    ],
    "sewer-services": [
      ["What are signs of a sewer-line problem?", "Recurring backups, several slow drains, or wastewater odors may indicate a sewer-line problem."],
      ["Is every slow drain a sewer problem?", "No. One slow fixture may have a local clog, while several slow or recurring drains can indicate a larger line issue."],
      ["Do you provide sewer service for homes and businesses?", "We handle sewer-service inquiries for homes and light commercial properties across Sonoma, Napa, and Marin counties."]
    ],
    "backflow-services": [
      ["Where are you backflow certified?", "AQUACRAFT PLUMBING INC. is backflow certified in California and Nevada."],
      ["What information should I have when I call?", "Have the device, property, jurisdiction, and any notice details available so we can understand the requested service."],
      ["Do you provide residential and light commercial backflow services?", "Yes. Contact us about residential or light commercial backflow needs, and we will confirm the scope and scheduling."]
    ]
  };

  var items = pages[key];
  var cta = document.querySelector("main .cta-band");
  if (!items || !cta) return;

  var section = document.createElement("section");
  section.className = "section service-faq";
  var container = document.createElement("div");
  container.className = "container";
  container.innerHTML = '<div class="section-head"><span class="eyebrow">FAQ</span><h2>Questions about this service</h2></div>';
  var list = document.createElement("div");
  list.className = "faq";

  items.forEach(function (item) {
    var details = document.createElement("details");
    details.className = "faq-item";
    var summary = document.createElement("summary");
    summary.textContent = item[0];
    var answer = document.createElement("p");
    answer.className = "faq-a";
    answer.textContent = item[1];
    details.appendChild(summary);
    details.appendChild(answer);
    list.appendChild(details);
  });

  container.appendChild(list);
  section.appendChild(container);
  cta.parentNode.insertBefore(section, cta);

  var schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(function (item) {
      return {
        "@type": "Question",
        "name": item[0],
        "acceptedAnswer": { "@type": "Answer", "text": item[1] }
      };
    })
  });
  document.head.appendChild(schema);
})();

/* --- Modern enhancements: header shadow on scroll + scroll-reveal --- */
(function () {
  "use strict";

  // Header gets a soft shadow once the page is scrolled
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Reveal elements as they enter the viewport
  var items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  items.forEach(function (el) { io.observe(el); });
})();
