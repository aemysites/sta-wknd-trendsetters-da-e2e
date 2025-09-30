/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements (EXACTLY ONE COLUMN)
  const headerRow = ['Cards (cards7)'];

  // Get all direct child divs (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');
  if (!cardDivs || cardDivs.length === 0) return;

  // For each card: first cell is the image, second cell is the alt text (as description)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    const alt = img.getAttribute('alt') || '';
    // Compose the second cell as a paragraph element for the alt text
    const desc = document.createElement('p');
    desc.textContent = alt;
    return [img, desc];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
