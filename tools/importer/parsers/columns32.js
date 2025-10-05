/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  function getImmediateChildren(parent, selector = 'div') {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  }

  // Find the main grid layout inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = getImmediateChildren(grid);
  if (gridChildren.length < 1) return;

  // The left column: text content (breadcrumbs, heading, author, date, social)
  const leftCol = gridChildren[0];
  // The right column: image (if present)
  const rightCol = gridChildren.length > 1 ? gridChildren[1] : null;

  // Compose left column cell
  const leftColContent = [];
  // Breadcrumbs (flex-horizontal)
  const breadcrumbs = leftCol.querySelector('.flex-horizontal');
  if (breadcrumbs) leftColContent.push(breadcrumbs);
  // Heading
  const heading = leftCol.querySelector('.h2-heading');
  if (heading) leftColContent.push(heading);
  // Author/date block
  const authorBlock = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (authorBlock) leftColContent.push(authorBlock);
  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');
  if (socialList) leftColContent.push(socialList);

  // Compose right column cell
  let rightColContent = [];
  if (rightCol) {
    // Find image in right column
    const img = rightCol.querySelector('img');
    if (img) rightColContent.push(img);
  } else {
    // Sometimes image is in leftCol (defensive)
    const img = leftCol.querySelector('img.image');
    if (img) rightColContent.push(img);
  }

  // Table header row
  const headerRow = ['Columns (columns32)'];
  // Table content row: two columns
  const contentRow = [leftColContent, rightColContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
