/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid layout
  function extractCards(grid) {
    const cards = [];
    // Select all direct child <a> elements (each card)
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((cardLink) => {
      let imgEl = cardLink.querySelector('img');
      if (!imgEl) return;
      // Compose the text cell by including ALL text content in the card
      // Instead of just heading and .paragraph-sm, collect all text nodes
      const textCell = [];
      // Find all elements that could contain text
      // Use less specific selectors to ensure all text is captured
      // Get heading
      let headingEl = cardLink.querySelector('h3, .h4-heading');
      if (headingEl) textCell.push(headingEl);
      // Get all paragraphs and divs (for description)
      // Also include direct text nodes
      // Collect all <div>, <p>, and text nodes inside cardLink except for image containers
      cardLink.childNodes.forEach((node) => {
        // Skip the image container
        if (node.nodeType === 1 && node.querySelector('img')) return;
        // If element and not heading, add if contains text
        if (node.nodeType === 1 && node !== headingEl) {
          if (node.textContent.trim()) textCell.push(node);
        }
        // If text node and not empty
        if (node.nodeType === 3 && node.textContent.trim()) {
          textCell.push(document.createTextNode(node.textContent.trim()));
        }
      });
      // Also check for nested text in .utility-text-align-center (for alternate layout)
      let centerDiv = cardLink.querySelector('.utility-text-align-center');
      if (centerDiv) {
        centerDiv.childNodes.forEach((node) => {
          if (node.nodeType === 1 && node !== headingEl) {
            if (node.textContent.trim()) textCell.push(node);
          }
          if (node.nodeType === 3 && node.textContent.trim()) {
            textCell.push(document.createTextNode(node.textContent.trim()));
          }
        });
      }
      cards.push([imgEl, textCell]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  let rows = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid layout inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCards(grid);
      rows = rows.concat(cards);
    }
  });

  // Compose table rows
  const headerRow = ['Cards (cards18)'];
  const tableCells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
