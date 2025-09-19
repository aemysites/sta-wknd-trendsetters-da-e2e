/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Cards (cards36)'];

  // Each card is a div with an image
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows: [image, text content].
  // For each card, try to extract all text content inside the card div (not just img alt)
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Remove the image from the cardDiv clone so we only get text content
    const cardClone = cardDiv.cloneNode(true);
    const imgInClone = cardClone.querySelector('img');
    if (imgInClone) imgInClone.remove();
    // Get all text content (trimmed)
    let textContent = cardClone.textContent.trim();
    // If no text content, fallback to alt
    if (!textContent) {
      textContent = img.getAttribute('alt') || '';
    }
    // Always return a two-column row
    return [img, textContent];
  }).filter(Boolean);

  // Ensure table structure: header row is one column, data rows are two columns
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = headerRow[0];
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  rows.forEach(([img, text]) => {
    const tr = document.createElement('tr');
    const tdImg = document.createElement('td');
    tdImg.appendChild(img);
    const tdText = document.createElement('td');
    tdText.textContent = text;
    tr.appendChild(tdImg);
    tr.appendChild(tdText);
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
