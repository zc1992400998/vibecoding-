/**
 * 个人信息展示页 - JavaScript
 * 包含：导航交互、滚动动画、数字统计、技能进度条、表单验证
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavToggle();
  initScrollSpy();
  initStatsCounter();
  initSkillBars();
  initContactForm();
});

/* ========== 导航栏滚动效果 ========== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

/* ========== 移动端导航菜单 ========== */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  // 点击菜单链接后关闭菜单
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
}

/* ========== 滚动监听 - 高亮当前导航项 ========== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const offset = 80;

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", throttle(highlightNav, 100));
}

/* ========== 数字统计动画 ========== */
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateStats() {
    if (animated) return;

    const statsSection = document.querySelector(".about-stats");
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inView) return;
    animated = true;

    stats.forEach((stat) => {
      const target = parseInt(stat.dataset.target, 10);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  window.addEventListener("scroll", throttle(animateStats, 100));
  animateStats();
}

/* ========== 技能进度条动画 ========== */
function initSkillBars() {
  const progressBars = document.querySelectorAll(".skill-progress");
  let animated = false;

  function animateSkills() {
    if (animated) return;

    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inView) return;
    animated = true;

    progressBars.forEach((bar) => {
      const width = bar.dataset.width;
      // 延迟逐个显示
      const index = Array.from(progressBars).indexOf(bar);
      setTimeout(() => {
        bar.style.width = `${width}%`;
      }, index * 100);
    });
  }

  window.addEventListener("scroll", throttle(animateSkills, 100));
  animateSkills();
}

/* ========== 联系表单验证 ========== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 简单的字段验证
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    let isValid = true;

    // 重置错误状态
    [name, email, message].forEach((field) => {
      field.style.borderColor = "";
    });

    if (!name.value.trim()) {
      name.style.borderColor = "#e74c3c";
      isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.style.borderColor = "#e74c3c";
      isValid = false;
    }

    if (!message.value.trim()) {
      message.style.borderColor = "#e74c3c";
      isValid = false;
    }

    if (isValid) {
      // 模拟提交
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "发送中...";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = "发送成功!";
        btn.style.background = "#27ae60";
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      }, 1500);
    }
  });

  // 实时移除错误状态
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.style.borderColor = "";
    });
  });
}

/* ========== 辅助函数 ========== */
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
