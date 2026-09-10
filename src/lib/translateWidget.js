/**
 * Google Translate - cookie + reload based (stable approach).
 * Loading overlay bhi yahin manage hoti hai taaki reload ke baad jab tak
 * translation actually apply na ho jaye, blank/blinking content na dikhe.
 */

const COOKIE_NAME = 'googtrans';
const OVERLAY_ID = 'gt-loading-overlay';

export function getCurrentLang() {
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=/en/(\\w+)`));
  return match ? match[1] : 'en';
}

// ---------- Loading overlay ----------

function injectOverlayStyles() {
  if (document.getElementById('gt-overlay-styles')) return;
  const style = document.createElement('style');
  style.id = 'gt-overlay-styles';
  style.textContent = `
    #${OVERLAY_ID} {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #07111F;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      opacity: 1;
      transition: opacity 0.25s ease;
    }
    #${OVERLAY_ID}.gt-fade-out { opacity: 0; pointer-events: none; }
    #${OVERLAY_ID} .gt-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(255, 194, 26, 0.25);
      border-top-color: #FFC21A;
      border-radius: 50%;
      animation: gt-spin 0.8s linear infinite;
    }
    #${OVERLAY_ID} .gt-text {
      color: #F3F5F8;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    @keyframes gt-spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(style);
}

export function showOverlay(text) {
  injectOverlayStyles();
  let overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.innerHTML = `<div class="gt-spinner"></div><div class="gt-text">${text}</div>`;
    document.body.appendChild(overlay);
  }
}

export function hideOverlay() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return;
  overlay.classList.add('gt-fade-out');
  setTimeout(() => overlay.remove(), 250);
}

// ---------- Translate toggle ----------

export function setLanguage(lang) {
  // reload se pehle hi overlay dikha do, taaki blank flash na dikhe
  showOverlay(lang === 'en' ? 'Restoring original language…' : 'भाषा बदली जा रही है…');

  if (lang === 'en') {
    const hostname = window.location.hostname;
    const domainParts = hostname.split('.');
    const rootDomain =
      domainParts.length > 1 ? domainParts.slice(-2).join('.') : hostname;

    // Google translate widget cookie ko `domain=.example.com` (leading dot) ke
    // saath set karta hai. Agar hum bina domain specify kiye clear karein, to
    // sirf host-only cookie delete hota hai aur wo `.example.com` wala reh
    // jata hai — jiski wajah se reload ke baad phir se translate ho jata hai.
    // Isliye har possible variant clear karo.
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
    if (rootDomain !== hostname) {
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
    }
  } else {
    document.cookie = `${COOKIE_NAME}=/en/${lang}; path=/;`;
  }
  window.location.reload();
}

// ---------- Widget script load ----------

let scriptInjected = false;

export function loadTranslateWidget() {
  // agar page reload ke baad translation apply hona hai, to turant overlay
  // dikha do jab tak Google actually translate na kar de
  const targetLang = getCurrentLang();
  if (targetLang !== 'en' && !document.getElementById(OVERLAY_ID)) {
    showOverlay('भाषा बदली जा रही है…');

    // Google translate hone par <html> tag me "translated-ltr"/"translated-rtl"
    // class add karta hai - yahi signal use karke overlay hide karo
    const observer = new MutationObserver(() => {
      const cls = document.documentElement.className;
      if (cls.includes('translated-ltr') || cls.includes('translated-rtl')) {
        hideOverlay();
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // fallback - Google fail/slow ho to overlay hamesha ke liye stuck na rahe
    setTimeout(() => {
      hideOverlay();
      observer.disconnect();
    }, 6000);
  }

  if (scriptInjected) return;
  scriptInjected = true;

  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  window.googleTranslateElementInit = function () {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi',
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };

  if (document.getElementById('google-translate-script')) return;

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src =
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}
