const toggle = document.getElementById('grayscaleToggle');
const statusText = document.getElementById('statusText');
const statusBox = document.getElementById('statusBox');

// Load the current state
chrome.storage.local.get('grayscaleEnabled', (result) => {
  const enabled = result.grayscaleEnabled || false;
  toggle.checked = enabled;
  updateStatus(enabled);
});

// Handle toggle change
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ grayscaleEnabled: enabled });

  // Apply to current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: applyGrayscale,
      args: [enabled]
    });
  });

  updateStatus(enabled);
});

function updateStatus(enabled) {
  if (enabled) {
    statusText.textContent = 'On';
    statusBox.textContent = 'Grayscale is enabled';
    statusBox.classList.add('active');
  } else {
    statusText.textContent = 'Off';
    statusBox.textContent = 'Grayscale is disabled';
    statusBox.classList.remove('active');
  }
}

function applyGrayscale(enabled) {
  const styleId = 'grayscale-style';
  let style = document.getElementById(styleId);

  if (enabled) {
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = 'html { filter: grayscale(100%); }';
      document.head.appendChild(style);
    }
  } else {
    if (style) {
      style.remove();
    }
  }
}
