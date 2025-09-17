/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout containing the two main columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- COLUMN 1: Large Feature Block ---
  // The first child is the large feature link block
  const featureBlock = grid.children[0]; // <a> block with image, tag, heading, paragraph

  // --- COLUMN 2: Stacked Cards ---
  // The second child is a flex container with two stacked cards
  const stackedCardsContainer = grid.children[1];
  // Defensive: Make sure it's a flex container
  if (!stackedCardsContainer || !stackedCardsContainer.classList.contains('flex-horizontal')) return;

  // Get both stacked card <a> blocks
  const stackedCards = Array.from(stackedCardsContainer.querySelectorAll('.utility-link-content-block'));

  // --- COLUMN 3: Vertical List ---
  // The third child is another flex container with a vertical list of link blocks separated by dividers
  const verticalListContainer = grid.children[2];
  if (!verticalListContainer || !verticalListContainer.classList.contains('flex-horizontal')) return;

  // Get all link blocks in the vertical list
  const verticalListLinks = Array.from(verticalListContainer.querySelectorAll('.utility-link-content-block'));

  // --- Build Table Rows ---
  const headerRow = ['Columns (columns2)'];

  // Second row: three columns
  // Column 1: Large feature block
  // Column 2: Stacked cards (as a single cell, both cards)
  // Column 3: Vertical list (as a single cell, all link blocks)
  const column1 = featureBlock;
  const column2 = stackedCards; // array of two <a> blocks
  const column3 = [];
  // Add each link block and divider in order
  Array.from(verticalListContainer.childNodes).forEach(node => {
    if (node.classList && node.classList.contains('utility-link-content-block')) {
      column3.push(node);
    } else if (node.classList && node.classList.contains('divider')) {
      column3.push(node);
    }
  });

  const secondRow = [column1, column2, column3];

  // Create the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
