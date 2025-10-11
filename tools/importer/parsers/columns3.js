/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));
  // The main grid container is the first child
  const grid = children.find((child) => child.classList.contains('w-layout-grid'));

  // Defensive: If grid not found, fallback to all children
  const gridChildren = grid ? Array.from(grid.children) : children;

  // Find image and content columns
  let imgEl = null;
  let contentCol = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      imgEl = child;
    } else if (child.querySelector('h1, .h1-heading')) {
      contentCol = child;
    }
  });

  // Defensive: If not found, try fallback selectors
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  if (!contentCol) {
    contentCol = element.querySelector('h1, .h1-heading')?.parentElement;
  }

  // Compose right column: heading, paragraph, buttons
  let rightCol = [];
  if (contentCol) {
    // Heading
    const heading = contentCol.querySelector('h1, .h1-heading');
    if (heading) rightCol.push(heading);
    // Subheading/paragraph
    const subheading = contentCol.querySelector('p, .subheading');
    if (subheading) rightCol.push(subheading);
    // Button group
    const btnGroup = contentCol.querySelector('.button-group');
    if (btnGroup) {
      // Use the button group as-is
      rightCol.push(btnGroup);
    }
  }

  // Table rows
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [imgEl, rightCol];

  const cells = [headerRow, columnsRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
