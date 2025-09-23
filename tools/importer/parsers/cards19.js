/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  // Table header as per block spec
  const headerRow = ['Cards (cards19)'];

  // Build rows for each card
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find icon image (SVG or img)
    let img = cardDiv.querySelector('.icon img');
    // If no image, fallback to icon div
    let imageCell = img || cardDiv.querySelector('.icon') || '';

    // Find text content (first <p> inside cardDiv)
    let textCell = cardDiv.querySelector('p') || '';

    // Always reference DOM nodes, never clone or use string
    return [imageCell, textCell];
  });

  // Compose table
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element
  element.replaceWith(table);
}
