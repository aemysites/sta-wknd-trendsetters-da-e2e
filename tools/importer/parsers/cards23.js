/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');

  tabPanes.forEach((tabPane) => {
    // Find the grid inside each tab
    const grid = tabPane.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Find the image inside the card (mandatory)
      const imgEl = card.querySelector('img');
      if (!imgEl) return; // SKIP cards without an image (mandatory for this block)
      // Compose the text cell
      // Instead of only heading and desc, include all text content from the card
      const textCell = [];
      // Get heading
      const heading = card.querySelector('h3');
      if (heading) textCell.push(heading.cloneNode(true));
      // Get all paragraph-sm elements
      const descs = card.querySelectorAll('.paragraph-sm');
      descs.forEach(desc => {
        textCell.push(desc.cloneNode(true));
      });
      // If no heading or desc, fallback to all text content
      if (textCell.length === 0) {
        // Get all text nodes inside the card
        const text = card.textContent.trim();
        if (text) textCell.push(document.createTextNode(text));
      }
      rows.push([
        imgEl.cloneNode(true),
        textCell
      ]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
