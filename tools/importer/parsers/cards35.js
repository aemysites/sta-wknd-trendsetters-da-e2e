/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required
  const headerRow = ['Cards (cards35)'];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image (reference the real element)
  // Use the image alt text as the text content for the second cell
  // If no alt, use empty string
  const rows = Array.from(cardDivs).map((div) => {
    const img = div.querySelector('img');
    let textContent = '';
    if (img && img.hasAttribute('alt')) {
      textContent = img.getAttribute('alt').trim();
    }
    // If alt text is empty, try to get any text from the div (fallback)
    if (!textContent) {
      textContent = div.textContent.trim();
    }
    return [img, textContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix the header row to span two columns
  const th = table.querySelector('th');
  if (th) {
    th.setAttribute('colspan', '2');
  }

  // Replace the original element
  element.replaceWith(table);
}
