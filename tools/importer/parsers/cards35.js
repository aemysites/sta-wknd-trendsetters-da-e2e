/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards35)'];

  // Get all immediate child divs (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside each card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Extract alt text for text cell
    const alt = img.getAttribute('alt')?.trim() || '';
    // Use the full alt text as the text cell (since no other text is present)
    return [img, alt];
  }).filter(row => row && row.length === 2);

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header row to span two columns
  const firstRow = block.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }

  // Replace original element with block table
  element.replaceWith(block);
}
