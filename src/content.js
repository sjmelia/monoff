// Check if grayscale should be enabled and apply it
chrome.storage.local.get('grayscaleEnabled', (result) => {
  if (result.grayscaleEnabled) {
    applyGrayscale();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleGrayscale') {
    if (request.enabled) {
      applyGrayscale();
    } else {
      removeGrayscale();
    }
    sendResponse({ status: 'applied' });
  }
});

function applyGrayscale() {
  const styleId = 'grayscale-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = 'html { filter: grayscale(100%); }';
    document.head.appendChild(style);
  }
}

function removeGrayscale() {
  const style = document.getElementById('grayscale-style');
  if (style) {
    style.remove();
  }
}
