/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: always block name
  const headerRow = ['Columns (columns3)'];

  // Defensive: get the grid layout container (holds image and right content)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of grid: image and right content
  const gridChildren = Array.from(grid.children);

  // Find image (left column)
  const imgEl = gridChildren.find(el => el.tagName === 'IMG');

  // Find right column (contains heading, subheading, buttons)
  const rightCol = gridChildren.find(el => el !== imgEl);

  // Defensive: if missing required elements, bail
  if (!imgEl || !rightCol) return;

  // Compose right column content: heading, subheading, buttons
  // Get heading
  const heading = rightCol.querySelector('h1');
  // Get subheading/paragraph
  const subheading = rightCol.querySelector('p');
  // Get button group (contains buttons)
  const buttonGroup = rightCol.querySelector('.button-group');

  // Compose right column cell
  const rightColContent = [];
  if (heading) rightColContent.push(heading);
  if (subheading) rightColContent.push(subheading);
  if (buttonGroup) rightColContent.push(buttonGroup);

  // Table row: two columns, left is image, right is content
  const contentRow = [imgEl, rightColContent];

  // Create table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(table);
}
