/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the main container
  const container = element.querySelector('.container') || element;

  // Find the grid layout (holds content)
  const grid = container.querySelector('.grid-layout') || container;
  
  // Find the heading/subheading group (usually a div)
  let headingGroup = null;
  let cta = null;
  // Find all direct children of grid
  const gridChildren = Array.from(grid.children);
  // Assume the first child is the heading group, second is CTA (if present)
  if (gridChildren.length > 0) {
    headingGroup = gridChildren[0];
    if (gridChildren.length > 1) {
      cta = gridChildren[1];
    }
  }

  // Extract heading (h1/h2/h3), subheading (p), and CTA (a)
  let title = null;
  let subheading = null;
  if (headingGroup) {
    title = headingGroup.querySelector('h1, h2, h3, h4, h5, h6');
    subheading = headingGroup.querySelector('p, .subheading');
  }

  // Compose content cell (row 3)
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Build table rows
  const headerRow = ['Hero (hero38)'];
  const imageRow = ['']; // No background image in this HTML
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
