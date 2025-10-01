/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required (EXACTLY ONE COLUMN)
  const headerRow = ['Cards (cards36)'];

  // Get all immediate child divs (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Extract alt text for each image to use as the card title and description
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use the image alt as the title (mandatory text content)
    const textCell = img.alt && img.alt.trim() ? img.alt.trim() : '[No description]';
    return [img, textCell];
  }).filter(Boolean);

  // Create table manually to ensure header row is a single cell and card rows are two cells
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row: one cell only
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = headerRow[0];
  th.colSpan = 2; // visually span both columns
  trHead.appendChild(th);
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Card rows: two cells each
  rows.forEach(([img, text]) => {
    const tr = document.createElement('tr');
    const tdImg = document.createElement('td');
    tdImg.appendChild(img);
    const tdText = document.createElement('td');
    tdText.textContent = text;
    tr.appendChild(tdImg);
    tr.appendChild(tdText);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  element.replaceWith(table);
}
