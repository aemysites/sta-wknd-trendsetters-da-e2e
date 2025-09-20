/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the header
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- Row 2: Background Asset (image or video placeholder) ---
  let backgroundAsset = '';
  const assetDiv = grid.querySelector('.utility-position-relative');
  if (assetDiv) {
    const embedDiv = assetDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // Prefer image placeholder if present
      const img = embedDiv.querySelector('img');
      if (img) backgroundAsset = img;
      // If no image, but there's an iframe (YouTube), create a link
      if (!backgroundAsset) {
        const iframe = embedDiv.querySelector('iframe');
        if (iframe && iframe.src) {
          const a = document.createElement('a');
          a.href = iframe.src;
          a.textContent = 'Watch video';
          backgroundAsset = a;
        }
      }
    }
  }

  // --- Row 3: Content (title, subheading, CTAs) ---
  const contentParts = [];

  // Title (styled heading)
  const titleDiv = grid.querySelector('.h1-heading');
  if (titleDiv && titleDiv.textContent.trim()) {
    const h1 = document.createElement('h1');
    h1.textContent = titleDiv.textContent.trim();
    contentParts.push(h1);
  }

  // Subheading (paragraph)
  const subheadingDiv = grid.querySelector('.utility-padding-top-2rem');
  if (subheadingDiv) {
    const subheadingP = subheadingDiv.querySelector('p');
    if (subheadingP && subheadingP.textContent.trim()) {
      contentParts.push(subheadingP);
    }
  }

  // Call-to-action buttons
  const buttonGroup = grid.querySelector('.button-group');
  if (buttonGroup) {
    const buttons = Array.from(buttonGroup.querySelectorAll('a')).filter(btn => btn.textContent.trim());
    if (buttons.length) {
      contentParts.push(...buttons);
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero25)'];
  const assetRow = [backgroundAsset || ''];
  const contentRow = [contentParts.length ? contentParts : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    assetRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
