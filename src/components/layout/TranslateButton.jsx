import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { loadTranslateWidget, getCurrentLang, setLanguage } from '../../lib/translateWidget';

/**
 * Hindi <-> English translate toggle. Navbar ke Bell/User buttons jaisa
 * hi styled hai (gold-on-navy pill). Cookie+reload based - stable,
 * React DOM conflicts nahi aate. Widget lib/translateWidget.js me
 * singleton hai, isliye button kitni jagah render ho (desktop/mobile),
 * duplicate script/div nahi banti.
 */
export default function TranslateButton() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    setLang(getCurrentLang());
    loadTranslateWidget();
  }, []);

  const toggleLanguage = () => {
    // Google ka free widget kabhi-kabhi translate skip kar deta hai
    // (uske apne backend ki flakiness - ye known/expected behavior hai).
    // Agar aisa ho to user bas button dobara dabaye, reload phir try karega.
    setLanguage(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <>
      <button
        onClick={toggleLanguage}
        className="notranslate flex items-center gap-1.5 bg-gold/10 text-gold px-3 py-2 rounded-full hover:bg-gold/20 transition-colors text-sm font-semibold"
        aria-label="Toggle Hindi / English"
        title={lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
      >
        <Languages size={18} />
        <span>{lang === 'en' ? 'हिं' : 'EN'}</span>
      </button>

      {/* Google apna top banner add karta hai jo layout push kar deta hai
          aur translated text par highlight iframe dikhata hai - dono
          hide kar diye taaki design na bigde */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .skiptranslate iframe { display: none !important; }
      `}</style>
    </>
  );
}
