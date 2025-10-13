/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Expect two columns: image and text
  let leftCol = null;
  let rightCol = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      leftCol = child;
    } else {
      rightCol = child;
    }
  });

  // Compose right column content, preserving semantic structure
  let rightColContent = [];
  if (rightCol) {
    // Eyebrow and tag row
    const flexTop = rightCol.querySelector('.flex-horizontal.x-left.y-center');
    if (flexTop) {
      rightColContent.push(flexTop);
    }
    // Heading
    const heading = rightCol.querySelector('h2');
    if (heading) {
      rightColContent.push(heading);
    }
    // Byline row (author, role, date)
    const byline = rightCol.querySelector('.flex-horizontal.flex-gap-xxs');
    if (byline) {
      rightColContent.push(byline);
    }
  }

  // Ensure all text and image content from source HTML is included
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftCol, rightColContent];

  // Create the table for the Columns block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
