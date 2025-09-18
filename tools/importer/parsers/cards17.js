/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row for the block table
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all direct children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // Skip if no image

    // Always create a row with two columns: image and empty string for text (even if text is missing)
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
