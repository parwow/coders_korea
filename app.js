i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',

    detection: {
      order: ['localStorage', 'navigator'], // 저장된 언어 → 브라우저 언어
      caches: ['localStorage'] // 선택한 언어 기억
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  }, function(err, t) {
    updateContent();
    setLanguageSelector();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerText = i18next.t(el.dataset.i18n);
  });
}

function setLanguageSelector() {
  const select = document.getElementById('langSelect');

  // 현재 언어 반영
  select.value = i18next.language;

  // 언어 변경 이벤트
  select.addEventListener('change', (e) => {
    const lang = e.target.value;

    i18next.changeLanguage(lang, () => {
      updateContent();
    });
  });
}
