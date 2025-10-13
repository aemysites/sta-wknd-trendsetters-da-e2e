/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Hero (hero25)'];

  // --- 1. Find the background image or embed (row 2) ---
  let backgroundCellContent = [];
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find the video embed container
    const embedDiv = Array.from(grid.children).find(child => child.querySelector('iframe'));
    if (embedDiv) {
      // Add img if present
      const img = embedDiv.querySelector('img');
      if (img) backgroundCellContent.push(img);
      // Add iframe src as a link if present
      const iframe = embedDiv.querySelector('iframe');
      if (iframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = 'Watch video';
        backgroundCellContent.push(a);
      }
    }
  }
  const backgroundRow = [backgroundCellContent.length ? backgroundCellContent : ''];

  // --- 2. Find the content (row 3): heading, subheading, CTA(s) ---
  let contentElements = [];
  if (grid) {
    // Heading (visible headline only)
    const heading = grid.querySelector('.h1-heading');
    if (heading) contentElements.push(heading);
    // Subheading: look for .subheading or first <p>
    const subheading = grid.querySelector('.subheading, p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons: look for .button-group
    const buttonGroup = grid.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }
  const contentRow = [contentElements];

  // --- Compose the table ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
