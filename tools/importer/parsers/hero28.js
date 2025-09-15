/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Find the background image (first img in the parallax container)
  let imageCell = null;
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const imgEl = gridDivs[0].querySelector('img');
    if (imgEl) imageCell = imgEl;
  }

  // 3. Find the text content (title, subtitle, CTA)
  let textCell = '';
  if (gridDivs.length > 1) {
    const textDiv = gridDivs[1];
    const contentContainer = textDiv.querySelector('.utility-margin-bottom-6rem') || textDiv;
    // Gather all block-level elements that could be relevant
    const cellContent = [];
    // Heading
    const h1 = contentContainer.querySelector('h1');
    if (h1) cellContent.push(h1.cloneNode(true));
    // Subheading (h2, h3, etc.)
    const h2 = contentContainer.querySelector('h2');
    if (h2) cellContent.push(h2.cloneNode(true));
    const h3 = contentContainer.querySelector('h3');
    if (h3) cellContent.push(h3.cloneNode(true));
    // Paragraphs
    const paragraphs = contentContainer.querySelectorAll('p');
    paragraphs.forEach(p => cellContent.push(p.cloneNode(true)));
    // Button group (CTA)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      cellContent.push(buttonGroup.cloneNode(true));
    }
    // Always set textCell, even if empty
    textCell = cellContent.length > 0 ? cellContent : '';
  } else {
    textCell = '';
  }

  // 4. Build the table rows (always 3 rows)
  const rows = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
