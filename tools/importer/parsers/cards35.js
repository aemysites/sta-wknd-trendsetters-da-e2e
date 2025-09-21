/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec: exactly one column
  const headerRow = ['Cards (cards35)'];

  // Get all immediate children (each card is a div with an image inside)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each row is [image, text content].
  const rows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    let textContent = '';
    if (img && img.alt) {
      textContent = img.alt;
    } else {
      textContent = '';
    }
    return [img ? img : '', textContent];
  });

  // Compose the table data: header row is a single column, each data row is two columns
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
