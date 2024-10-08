
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const toggleTranslation = document.getElementById('toggle-translation');
    const saveButton = document.getElementById('save-settings');
  
    // Load saved settings
    chrome.storage.sync.get(['preferredLanguage', 'translationEnabled'], (result) => {
      languageSelect.value = result.preferredLanguage || 'en';
      toggleTranslation.checked = result.translationEnabled !== undefined ? result.translationEnabled : true;
    });
  
    // Save settings on button click
    saveButton.addEventListener('click', () => {
      const preferredLanguage = languageSelect.value;
      const translationEnabled = toggleTranslation.checked;
  
      chrome.storage.sync.set({ preferredLanguage, translationEnabled }, () => {
        alert('Settings saved!');
      });
    });
  });
  