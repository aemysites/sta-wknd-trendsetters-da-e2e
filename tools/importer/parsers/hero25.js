/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing hero content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // --- Row 2: Background Asset ---
  let backgroundAsset = null;
  const aspectDiv = children.find(el => el.classList.contains('utility-aspect-3x2'));
  if (aspectDiv) {
    const embedDiv = aspectDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // Use the image if present
      const img = embedDiv.querySelector('img');
      if (img) backgroundAsset = img;
    }
  }

  // --- Row 3: Content (Headline, Subheading, CTA) ---
  const contentCell = [];
  // Headline
  const headlineDiv = children.find(el => el.classList.contains('h1-heading'));
  if (headlineDiv) {
    // Use as heading (preserve semantic meaning)
    const h1 = document.createElement('h1');
    h1.textContent = headlineDiv.textContent.trim();
    contentCell.push(h1);
  }
  // Subheading (paragraph)
  const subheadingDiv = children.find(el => el.querySelector('.subheading'));
  if (subheadingDiv) {
    const subheading = subheadingDiv.querySelector('.subheading');
    if (subheading) {
      const p = document.createElement('p');
      p.textContent = subheading.textContent.trim();
      contentCell.push(p);
    }
  }
  // CTA buttons
  const buttonDiv = children.find(el => el.classList.contains('button-group'));
  if (buttonDiv) {
    // Reference the actual button elements
    const buttons = buttonDiv.querySelectorAll('a.button, a.secondary-button');
    if (buttons.length) {
      const btnContainer = document.createElement('div');
      buttons.forEach(btn => {
        btnContainer.appendChild(btn);
      });
      contentCell.push(btnContainer);
    }
  }

  // --- Table Construction ---
  const headerRow = ['Hero (hero25)'];
  const backgroundRow = [backgroundAsset || ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
