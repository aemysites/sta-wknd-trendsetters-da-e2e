/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each grid child
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text content: look for h3 and p inside nested divs
    let heading = null;
    let description = null;
    // Defensive: look for h3 and p anywhere inside cardEl
    heading = cardEl.querySelector('h3');
    description = cardEl.querySelector('p');
    // Compose the text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    // If neither heading nor description, leave cell empty
    return [img, textCell.childNodes.length ? textCell : ''];
  }

  // Build the table rows
  const cells = [];
  // Header row
  cells.push(['Cards (cards25)']);

  // Get all immediate children of the grid (each card)
  const cardEls = element.querySelectorAll(':scope > div');
  cardEls.forEach((cardEl) => {
    // Only process if there's an image (mandatory for this block)
    const img = cardEl.querySelector('img');
    if (img) {
      const row = extractCardContent(cardEl);
      cells.push(row);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
