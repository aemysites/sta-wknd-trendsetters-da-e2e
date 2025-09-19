/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards39)'];

  // Helper to extract card info from an anchor card element
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Defensive fallback: direct img inside anchor
    if (!img) {
      img = cardEl.querySelector('img');
    }

    // Find text content
    // Title: h3 (h2-heading or h4-heading)
    let title = cardEl.querySelector('h3');
    // Description: first <p>
    let desc = cardEl.querySelector('p');
    // CTA: .button (optional)
    let cta = cardEl.querySelector('.button');

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Find all card elements
  // There is a nested grid inside the main grid, so we need to get all anchors inside both grids
  // Get all direct children of the main grid
  const mainGrid = element.querySelector('.grid-layout');
  let cardEls = [];
  if (mainGrid) {
    // Get all <a> tags that are direct children of mainGrid
    cardEls = Array.from(mainGrid.children).filter((child) => child.tagName === 'A');
    // Also, get nested grid(s) and their <a> children
    const nestedGrids = mainGrid.querySelectorAll('.grid-layout');
    nestedGrids.forEach((grid) => {
      const nestedCards = Array.from(grid.children).filter((child) => child.tagName === 'A');
      cardEls.push(...nestedCards);
    });
  }

  // Defensive: remove duplicates
  cardEls = Array.from(new Set(cardEls));

  // Build table rows
  const rows = [headerRow];
  cardEls.forEach((cardEl) => {
    const [img, textCell] = extractCardInfo(cardEl);
    // Only add row if image and text exist
    if (img && textCell.length) {
      rows.push([img, textCell]);
    }
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
