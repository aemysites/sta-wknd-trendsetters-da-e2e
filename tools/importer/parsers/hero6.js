/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image extraction (row 2)
  let bgImg = null;
  // Look for an <img> inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: find the first image in the block
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // If not found, fallback to any image in the block
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Text, subheading, CTA extraction (row 3)
  let contentCell = [];
  // Find the card with heading, subheading, and buttons
  let card = null;
  for (const div of element.querySelectorAll('div')) {
    if (div.classList.contains('card')) {
      card = div;
      break;
    }
  }
  if (card) {
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include anchor elements (links)
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        contentCell = contentCell.concat(ctas);
      }
    }
  }
  // Defensive: if nothing found, fallback to all text content
  if (contentCell.length === 0) {
    contentCell.push(document.createTextNode(element.textContent.trim()));
  }
  const contentRow = [contentCell];

  // 4. Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(table);
}
