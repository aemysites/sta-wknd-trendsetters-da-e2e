/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children of a given parent
  function getDirectChildren(parent, selector = '*') {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the main grid layout containing the columns
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the outer grid (the main two-column layout)
  const outerGrid = container.querySelector('.grid-layout');
  if (!outerGrid) return;

  // Get all direct children of the outer grid
  const outerGridChildren = getDirectChildren(outerGrid);

  // Defensive: Ensure we have the expected structure
  // First two children are the left column (heading, paragraph)
  const leftColumnContent = [];
  if (outerGridChildren[0]) leftColumnContent.push(outerGridChildren[0]); // Heading
  if (outerGridChildren[1]) leftColumnContent.push(outerGridChildren[1]); // Paragraph

  // Third child is another grid containing testimonial and logo
  let rightColumnContent = [];
  if (outerGridChildren[2]) {
    const innerGrid = outerGridChildren[2];
    // Get all direct children of the inner grid
    const innerGridChildren = getDirectChildren(innerGrid);
    // Divider
    if (innerGridChildren[0]) rightColumnContent.push(innerGridChildren[0]);
    // Flex horizontal: avatar + name/title
    if (innerGridChildren[1]) rightColumnContent.push(innerGridChildren[1]);
    // Logo image (last child)
    if (innerGridChildren[2]) rightColumnContent.push(innerGridChildren[2]);
  }

  // Build the table rows
  const headerRow = ['Columns block (columns26)'];
  const contentRow = [leftColumnContent, rightColumnContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
