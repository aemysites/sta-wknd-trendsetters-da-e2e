/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Left column: image
  const image = gridChildren.find((el) => el.tagName === 'IMG');

  // Right column: content (heading, subheading, buttons)
  const rightCol = gridChildren.find((el) => el !== image);

  // Defensive: ensure rightCol exists
  let rightColContent = [];
  if (rightCol) {
    // We'll collect heading, subheading, and button group
    const heading = rightCol.querySelector('h1, h2, h3, h4, h5, h6');
    const subheading = rightCol.querySelector('p');
    const buttonGroup = rightCol.querySelector('.button-group');
    if (heading) rightColContent.push(heading);
    if (subheading) rightColContent.push(subheading);
    if (buttonGroup) rightColContent.push(buttonGroup);
  }

  // Build the table rows
  const headerRow = ['Columns block (columns6)'];
  const contentRow = [image, rightColContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
