
// Listen for changes in storage to update settings dynamically
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.preferredLanguage || changes.translationEnabled) {
      // Re-apply translation settings
      applyTranslations();
    }
  });
  
  // Function to apply translations to existing and new messages
  async function applyTranslations() {
    const { preferredLanguage, translationEnabled } = await getSettings();
  
    if (!translationEnabled) return;
  
    const messageElements = document.querySelectorAll('.message-text'); // Adjust selector
  
    messageElements.forEach(async (msg) => {
      const originalText = msg.getAttribute('data-original-text') || msg.innerText;
      msg.setAttribute('data-original-text', originalText);
  
      if (!msg.getAttribute('data-translated')) {
        const translatedText = await translateText(originalText, preferredLanguage);
        msg.innerText = translatedText;
        msg.setAttribute('data-translated', 'true');
      }
    });
  }
  
  // Function to get settings from storage
  function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['preferredLanguage', 'translationEnabled'], (result) => {
        resolve(result);
      });
    });
  }
  
  // Translation function
  async function translateText(text, targetLang) {
    // Replace with your translation API logic
    const apiKey = 'YOUR_API_KEY';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          target: targetLang
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation API error:', error);
      return text; // Fallback to original text
    }
  }
  
  // Initial translation on load
  document.addEventListener('DOMContentLoaded', applyTranslations);
  