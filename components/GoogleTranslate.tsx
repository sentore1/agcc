'use client';

import { useEffect, useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
];

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Add the Google Translate script
    const addScript = () => {
      if (document.getElementById('google-translate-script')) {
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize function
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,rw,fr,sw',
        },
        'google_translate_element_hidden'
      );
    };

    addScript();

    // Add styles to hide banner and the widget
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .goog-te-banner-frame { display: none !important; }
      #google_translate_element_hidden { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    
    // Find and trigger the Google Translate dropdown
    setTimeout(() => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        setTimeout(() => setIsOpen(false), 300);
      }
    }, 100);
  };

  return (
    <>
      {/* Hidden Google Translate Widget */}
      <div id="google_translate_element_hidden" style={{ display: 'none' }}></div>
      
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
        {/* Globe Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: '#267ABA' }}
          title="Translate Page"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
            />
          </svg>
        </button>

        {/* Popup */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 998
              }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Popup Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '70px',
                left: 0,
                zIndex: 999,
                minWidth: '260px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                border: '1px solid #e5e7eb'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #e5e7eb',
                background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  color: '#111827'
                }}>
                  Select Language
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#6b7280',
                    fontSize: '18px'
                  }}
                >
                  ✕
                </button>
              </div>
              
              {/* Language Buttons */}
              <div style={{ padding: '8px' }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      marginBottom: '4px',
                      border: currentLang === lang.code ? '1px solid #93c5fd' : '1px solid #f3f4f6',
                      borderRadius: '8px',
                      backgroundColor: currentLang === lang.code ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                      fontSize: '14px',
                      boxShadow: currentLang === lang.code ? '0 1px 3px rgba(38, 122, 186, 0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (currentLang !== lang.code) {
                        e.currentTarget.style.backgroundColor = '#fafbfc';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentLang !== lang.code) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#f3f4f6';
                      }
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                    <span style={{ 
                      flex: 1, 
                      textAlign: 'left',
                      fontWeight: currentLang === lang.code ? '600' : 'normal',
                      color: currentLang === lang.code ? '#1e40af' : '#4b5563'
                    }}>
                      {lang.name}
                    </span>
                    {currentLang === lang.code && (
                      <svg 
                        style={{ width: '18px', height: '18px', color: '#3b82f6' }} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
