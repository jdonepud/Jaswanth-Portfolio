'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // Element toggle function
  const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
  };
  
  // Sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  document.querySelector("[data-sidebar-btn]").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("active");
  });
  
  // sidebar toggle functionality for mobile
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

  // Debugging: Log sidebar and sidebar button
  console.log("Sidebar:", sidebar);
  console.log("Sidebar Button:", sidebarBtn);

  // Check if sidebarBtn exists before adding event listener
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  } else {
    console.error("Sidebar button not found!");
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      })
      
      ;
    });
  });


  // Modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const overlay = document.querySelector("[data-overlay]");

  // Modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    } else {
      console.error("Modal container or overlay not found!");
    }
  };

  // Custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  // Add event listener to custom select
  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  } else {
    console.error("Custom select not found!");
  }

  // Add event listeners to all select items
  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  
  // Filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // Filter function
  const filterFunc = function (selectedValue) {
    filterItems.forEach((item) => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  const titles = [
    "CS Graduate Student at UB",
    "Software Engineer",
    "Security Enthusiast",
    "Cloud Support Engineer",
    "Automation Engineer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;    // Speed for typing
const deletingSpeed = 50;   // Speed for deleting
const pauseTime = 1500;     // 2 seconds pause

function typeEffect() {
    const currentTitle = titles[titleIndex];
    const titleElement = document.querySelector('.title');

    if (!titleElement) {
        console.error("Title element not found!");
        return;
    }

    // Add console.log for debugging
    console.log('Current Index:', titleIndex);
    console.log('Current Title:', currentTitle);
    console.log('Char Index:', charIndex);

    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    // Force function to continue
    let nextTimeout;
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        nextTimeout = pauseTime;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        nextTimeout = typingSpeed;
    } else {
        nextTimeout = isDeleting ? deletingSpeed : typingSpeed;
    }

    // Always schedule the next call
    setTimeout(typeEffect, nextTimeout);
}

// Start the effect immediately when the page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    typeEffect(); // Start the typing effect
});
 
  // Add event listeners to all filter button items for large screens
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // Page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add event listeners to all navigation links
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Navigation link clicked:", this); // Debugging log
      const targetPage = this.dataset.page; // Use data-page attribute

      // Loop through all pages and toggle active class
      pages.forEach((page) => {
        console.log("Page:", page.dataset.page); // Debugging log
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      // Loop through all navigation links and toggle active class
      navigationLinks.forEach((navLink) => {
        if (navLink === this) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      });

      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });
  });

  const images = document.querySelectorAll(".certificate-image");
  images.forEach((img) => {
    console.log(`Image: ${img.src}, Displayed Width: ${img.clientWidth}, Displayed Height: ${img.clientHeight}`);
  });
  
  document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const cursor2 = document.getElementById('cursor2');
    
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor2.style.left = `${e.clientX}px`;
    cursor2.style.top = `${e.clientY}px`;
  });
  
  // Click animation
  document.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.left = `${e.clientX}px`;
    clickEffect.style.top = `${e.clientY}px`;
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
      clickEffect.remove();
    }, 1000);
  });
  
  // Add click effect style
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
      .click-effect {
        position: fixed;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        animation: click-pulse 0.8s forwards;
      }
  
      @keyframes click-pulse {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });
});

