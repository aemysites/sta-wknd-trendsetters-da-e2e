/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: header row
  const headerRow = ['Cards (cards35)'];

  // Find all card containers (direct children with class 'utility-aspect-1x1')
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  // Build rows: each row is [image, ''] (second column empty for no text content)
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  // Create the table with two columns per row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
