/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified (EXACTLY one column)
  const headerRow = ['Cards (cards35)'];

  // Get all immediate child divs (each card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image (mandatory) and all text content (if any)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    const imageCell = img ? img : '';

    // Extract all text content from the card div, including alt attribute
    let textCell = '';
    let texts = [];
    cardDiv.querySelectorAll('*').forEach(el => {
      if (el !== img && el.textContent && el.textContent.trim()) {
        texts.push(el.textContent.trim());
      }
    });
    if (texts.length > 0) {
      textCell = texts.join(' ');
    } else if (img && img.alt && img.alt.trim()) {
      textCell = img.alt.trim();
    }
    return [imageCell, textCell];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: Header row should be a single cell with colspan=2 to match data rows
  const th = block.querySelector('th');
  if (th) th.setAttribute('colspan', '2');

  // Replace the original element with the new block table
  element.replaceWith(block);
}
