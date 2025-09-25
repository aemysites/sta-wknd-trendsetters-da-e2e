/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, first col is image, second col is text (title/desc/cta)
  // Header row must have exactly one column: block name
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Get all immediate children (each is a .utility-aspect-1x1 div containing an <img>)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((div) => {
    // Find the image inside
    const img = div.querySelector('img');
    if (img) {
      // Use alt text as the card's text content if no other text is present
      const altText = img.getAttribute('alt') || '';
      // Create a paragraph for the alt text
      const textEl = document.createElement('p');
      textEl.textContent = altText;
      rows.push([img, textEl]);
    }
  });

  // Create table with correct header row and card rows
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix header row to span two columns for visual consistency
  const header = table.querySelector('tr:first-child th');
  if (header) {
    header.setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
