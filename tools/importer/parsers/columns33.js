/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Expecting two columns: image (left), text (right)
  let leftCol = null;
  let rightCol = null;
  if (children.length >= 2) {
    leftCol = children.find((el) => el.tagName === 'IMG');
    rightCol = children.find((el) => el !== leftCol);
  }

  // Defensive fallback: try to find image and text block
  if (!leftCol || !rightCol) {
    leftCol = grid.querySelector('img');
    rightCol = Array.from(grid.children).find((el) => el !== leftCol);
    if (!leftCol || !rightCol) return;
  }

  // --- LEFT COLUMN: Use the image element directly ---
  // No image creation, just reference the existing image node

  // --- RIGHT COLUMN: Compose content ---
  const rightContent = document.createElement('div');
  // Eyebrow and tag (in a flex row)
  const flexTop = rightCol.querySelector('.flex-horizontal.x-left.y-center');
  if (flexTop) rightContent.appendChild(flexTop);
  // Heading
  const heading = rightCol.querySelector('h2');
  if (heading) rightContent.appendChild(heading);
  // Byline (author, role, date)
  const byline = rightCol.querySelector('.flex-horizontal.flex-gap-xxs');
  if (byline) rightContent.appendChild(byline);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns33)'];
  const contentRow = [leftCol, rightContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
