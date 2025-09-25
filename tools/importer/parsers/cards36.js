/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required: exactly one column
  const headerRow = ['Cards (cards36)'];

  // Get all immediate children (each card is a div with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows (each with 2 columns: image, text)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use the entire cardDiv's text content for the card's text cell
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    if (!textContent.trim()) {
      textContent = img.getAttribute('alt') || '';
    }
    return [img, textContent.trim()];
  }).filter(Boolean);

  // Compose the table data: header row (1 col), then card rows (2 cols)
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Remove any colspan from the header row to ensure exactly one column
  const table = block;
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].removeAttribute('colspan');
  }

  // Replace the original element with the block table
  element.replaceWith(table);
}
