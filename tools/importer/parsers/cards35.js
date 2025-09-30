/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, first col is image, second col is text (title/desc/cta)
  // Source HTML: grid of div.utility-aspect-1x1 > img, alt text contains descriptive text

  // 1. Header row (must be a single cell, but must span two columns for table structure)
  const headerRow = ['Cards (cards35)'];

  // 2. Get all card containers (immediate children of the grid)
  const cardDivs = element.querySelectorAll(':scope > div');

  // 3. Build card rows: each row is [image, text content from alt attribute]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    // Use the alt text for the text content cell
    let textCell = '';
    if (img && img.alt) {
      textCell = img.alt;
    }
    return [img, textCell];
  });

  // 4. Assemble the table data
  const tableData = [headerRow, ...rows];

  // 5. Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Fix the header row to span two columns
  const th = block.querySelector('thead tr th');
  if (th) th.setAttribute('colspan', '2');

  // 7. Replace the original element
  element.replaceWith(block);
}
