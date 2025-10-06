/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: exactly one column
  const headerRow = ['Cards (cards36)'];

  // Get all immediate child divs (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, create a row: [image, full text content from the card div]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Get all text content from the card div (including alt text)
    let textContent = '';
    // Use the alt attribute if present
    if (img.getAttribute('alt')) {
      textContent += img.getAttribute('alt');
    }
    // Also include any other text nodes inside the cardDiv
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
    });
    // Only output the row if there is some text content
    if (textContent.trim()) {
      return [img, textContent.trim()];
    }
    return null;
  }).filter(Boolean);

  // Only create the table if there is at least one valid card row
  if (rows.length > 0) {
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
    // Fix: set colspan=2 on header cell to match data columns
    const th = blockTable.querySelector('thead tr th');
    if (th) th.setAttribute('colspan', '2');
    element.replaceWith(blockTable);
  } else {
    // If no valid rows, remove the element
    element.replaceWith(document.createTextNode(''));
  }
}
