/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid-layout container, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: h2 and the content div)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the heading (h2)
  const heading = gridChildren[0];

  // Second column: the content div (contains paragraph and button)
  const contentDiv = gridChildren[1];
  // Get all children of the contentDiv
  const contentChildren = Array.from(contentDiv.children);

  // Defensive: Find the paragraph and the button
  const paragraph = contentDiv.querySelector('p');
  const buttonLink = contentDiv.querySelector('a');

  // Compose the second column cell
  const secondColContent = [];
  if (paragraph) secondColContent.push(paragraph);
  if (buttonLink) secondColContent.push(buttonLink);

  // Table header row
  const headerRow = ['Columns (columns13)'];
  // Table content row: two columns, heading and content
  const contentRow = [heading, secondColContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
