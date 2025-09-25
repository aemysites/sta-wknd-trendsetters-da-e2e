/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs (for layout resilience)
  const container = element.querySelector(':scope > div');
  if (!container) return;
  const grid = container.querySelector(':scope > div');
  if (!grid) return;
  const children = Array.from(grid.children);

  // --- 1. Header row ---
  const headerRow = ['Hero (hero25)'];

  // --- 2. Background asset row ---
  // Find the video/image wrapper
  let backgroundCell = '';
  const videoDiv = children.find((child) => child.classList.contains('utility-position-relative'));
  if (videoDiv) {
    // The videoDiv contains a w-embed-youtubevideo div
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // If there's an <img> inside, use it as the background asset
      const img = embedDiv.querySelector('img');
      if (img) {
        backgroundCell = img;
      } else {
        // If no image, but an iframe, add a link to the video src
        const iframe = embedDiv.querySelector('iframe');
        if (iframe && iframe.src) {
          const link = document.createElement('a');
          link.href = iframe.src;
          link.textContent = 'Video';
          backgroundCell = link;
        }
      }
    }
  }
  // Defensive: If no video/image, leave cell blank

  // --- 3. Content row ---
  // Title, subheading, CTA
  const contentElements = [];

  // Title (h1 or styled div)
  const h1 = children.find((child) => child.tagName === 'H1');
  if (h1) {
    contentElements.push(h1);
  }
  // Styled headline div (sometimes used instead of h1)
  const headlineDiv = children.find((child) => child.classList.contains('h1-heading'));
  if (headlineDiv) {
    contentElements.push(headlineDiv);
  }

  // Subheading (look for a div with a <p> inside)
  const subheadingDiv = children.find((child) => child.querySelector('p.subheading'));
  if (subheadingDiv) {
    const subheadingP = subheadingDiv.querySelector('p.subheading');
    if (subheadingP) {
      contentElements.push(subheadingP);
    }
  }

  // CTA buttons (look for button-group div)
  const buttonGroupDiv = children.find((child) => child.classList.contains('button-group'));
  if (buttonGroupDiv) {
    // Add all <a> buttons
    const buttons = Array.from(buttonGroupDiv.querySelectorAll('a'));
    if (buttons.length) {
      contentElements.push(...buttons);
    }
  }

  // Defensive: If nothing found, leave cell blank

  // --- Compose table ---
  const cells = [
    headerRow,
    [backgroundCell],
    [contentElements.length ? contentElements : ''],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
