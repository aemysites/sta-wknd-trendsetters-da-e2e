/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero6) BLOCK PARSER ---
  // 1. Header row: Must match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row: Find referenced image element
  let imageEl = null;
  // Search for image in the first grid div (background)
  const gridDivs = element.querySelectorAll('.w-layout-grid');
  for (const gridDiv of gridDivs) {
    const img = gridDiv.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row: Heading, subheading, CTA(s)
  let heading = null;
  let subheading = null;
  let ctaGroup = null;
  // Find the card overlay with text/buttons
  let cardDiv = null;
  for (const div of element.querySelectorAll('div')) {
    if (div.classList.contains('card')) {
      cardDiv = div;
      break;
    }
  }
  if (cardDiv) {
    // Heading
    heading = cardDiv.querySelector('h1');
    // Subheading
    subheading = cardDiv.querySelector('p');
    // CTA group (buttons)
    ctaGroup = cardDiv.querySelector('.button-group');
  }
  // Compose content cell: preserve semantic elements
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctaGroup) contentCell.push(ctaGroup);
  const contentRow = [contentCell.length ? contentCell : ''];

  // 4. Build table: Each row as specified
  const cells = [headerRow, imageRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(blockTable);
}
