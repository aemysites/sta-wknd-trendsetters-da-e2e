/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Block header row as specified (one column, but span two columns for table consistency)
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Extract each card (each child div)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Remove empty width/height attributes for clean output
    img.removeAttribute('width');
    img.removeAttribute('height');
    // Use the full alt text as the cell content (as a paragraph)
    const altText = img.getAttribute('alt') || '';
    const textCell = document.createElement('div');
    if (altText) {
      const p = document.createElement('p');
      p.textContent = altText;
      textCell.appendChild(p);
    }
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set colspan=2 on the header cell to match the two-column data rows
  const th = table.querySelector('th');
  if (th && cardDivs.length > 0) {
    th.setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
