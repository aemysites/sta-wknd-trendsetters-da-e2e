/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout container (contains image and text columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Defensive: Expecting two columns: [image, text+buttons]
  let imgCol = null;
  let textCol = null;

  // Find image and text columns
  for (const child of children) {
    if (child.tagName === 'IMG') {
      imgCol = child;
    } else {
      textCol = child;
    }
  }

  // Defensive: If not found, fallback to first/second child
  if (!imgCol && children[0] && children[0].tagName === 'IMG') {
    imgCol = children[0];
    textCol = children[1];
  }

  // Compose the right column: heading, subheading, button group
  let rightColContent = [];
  if (textCol) {
    // Find heading, subheading, button group
    const heading = textCol.querySelector('h1');
    if (heading) rightColContent.push(heading);
    const subheading = textCol.querySelector('p');
    if (subheading) rightColContent.push(subheading);
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup) rightColContent.push(buttonGroup);
  }

  // Build the table rows
  const headerRow = ['Columns block (columns3)'];
  const contentRow = [imgCol, rightColContent];

  const cells = [headerRow, contentRow];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
