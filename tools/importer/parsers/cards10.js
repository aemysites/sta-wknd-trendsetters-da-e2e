/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row as per spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // 2. Each card is an <a> direct child of the grid container
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // Image: always first child div with an <img>
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: the div with .utility-padding-all-1rem
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    // Defensive: fallback to all divs if not found
    let textContent = textDiv;
    if (!textContent) {
      const divs = card.querySelectorAll('div');
      textContent = divs[1] || null;
    }

    // Build row: [image, text content]
    // Use the actual elements, not clones or HTML strings
    const row = [imageEl, textContent];
    rows.push(row);
  });

  // 3. Create table block and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
