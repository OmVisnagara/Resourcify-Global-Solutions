const headerHTML = `
  <header class="glass-nav">
    <div class="nav-inner">
      <a href="/" class="nav-brand">
        <img src="/assets/Resourcify_Logo.png" alt="Resourcify Global Solutions" style="height:2.5rem;width:auto;border-radius:var(--radius-lg);" />
        <span class="nav-brand-text">Resourcify Global Solutions</span>
      </a>
      <nav class="nav-links">
        <a href="/" data-page="index">Home</a>
        <a href="/recruitment.html" data-page="recruitment">Full-Cycle Recruitment</a>
        <a href="/medical-billing.html" data-page="medical-billing">Medical Billing Services</a>
        <a href="/about.html" data-page="about">About Us</a>
        <a href="/contact.html" data-page="contact">Contact</a>
      </nav>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle navigation menu">
        <span class="material-symbols-outlined" style="font-size:1.75rem;">menu</span>
      </button>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu">
    <a href="/" data-page="index">Home</a>
    <a href="/recruitment.html" data-page="recruitment">Full-Cycle Recruitment</a>
    <a href="/medical-billing.html" data-page="medical-billing">Medical Billing Services</a>
    <a href="/about.html" data-page="about">About Us</a>
    <a href="/contact.html" data-page="contact">Contact</a>
  </div>
`;

const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="/assets/Resourcify_Logo.png" alt="Resourcify Global Solutions" style="height:3.5rem;width:3.5rem;object-fit:contain;border-radius:var(--radius-lg);background:#fff;padding:0.25rem;" />
            <span class="footer-brand-text">Resourcify Global Solutions</span>
          </div>
          <p class="footer-desc">Leading global solutions provider specializing in medical billing, recruitment, and operational consultancy for high-growth organizations.</p>
          <div class="footer-availability">
            <p class="footer-availability-title">Our Services are available</p>
            <div class="footer-flags">
              <div class="footer-flag" title="India">
                <img src="https://flagcdn.com/w80/in.png" alt="India" />
              </div>
              <div class="footer-flag" title="United States">
                <img src="https://flagcdn.com/w80/us.png" alt="United States" />
              </div>
              <div class="footer-flag" title="United Kingdom">
                <img src="https://flagcdn.com/w80/gb.png" alt="United Kingdom" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Contact Info</h4>
          <div class="footer-links">
            <div class="footer-contact-item"><span class="material-symbols-outlined">location_on</span><span>113 First Floor, Aryan Work Space 3,<br/>B/h Manav Mandir Plot,<br/>Memnagar, Ahmedabad - 380052</span></div>
            <div class="footer-contact-item"><span class="material-symbols-outlined">mail</span><span>info@resourcifyglobalsolutions.com</span></div>
            <div class="footer-contact-item"><span class="material-symbols-outlined">call</span><span>+91 97370 50074</span></div>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Follow Us</h4>
          <div class="footer-social" style="margin-top:0;">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Quick Navigation</h4>
          <div class="footer-links">
            <a href="/">Home</a>
            <a href="/recruitment.html">Full-Cycle Recruitment</a>
            <a href="/medical-billing.html">Medical Billing Services</a>
            <a href="/about.html">About Us</a>
            <a href="/contact.html">Contact</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <!-- <p class="footer-bottom-text">© 2024 Resourcify Global Solutions. All rights reserved.</p> -->
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
      </div>
    </div>
  </footer>
`;

// Inject header before body content
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// Inject footer at end of body
document.body.insertAdjacentHTML('beforeend', footerHTML);

// Set active nav link based on current page
const path = window.location.pathname;
let activePage = 'index';
if (path.includes('recruitment')) activePage = 'recruitment';
else if (path.includes('medical-billing')) activePage = 'medical-billing';
else if (path.includes('about')) activePage = 'about';
else if (path.includes('contact')) activePage = 'contact';

document.querySelectorAll('[data-page]').forEach(link => {
  if (link.dataset.page === activePage) link.classList.add('active');
});
