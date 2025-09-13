/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Column 1: Large left block (image + tags + heading + paragraph)
  let leftBlock = null;
  // Column 2: Top right block (image + tags + heading + paragraph)
  let topRightBlock = null;
  // Column 3: Middle right block (image + tags + heading + paragraph)
  let middleRightBlock = null;
  // Column 4: Vertical list of links (headings + paragraphs, divided)
  let verticalListBlock = null;

  // Identify blocks by their structure
  // The first child is the large left block (an <a> with image, tag, heading, paragraph)
  leftBlock = gridChildren[0];

  // The second child is a flex container with two <a> blocks (top and middle right)
  const rightTopContainer = gridChildren[1];
  if (rightTopContainer) {
    const rightTopLinks = rightTopContainer.querySelectorAll(':scope > a');
    topRightBlock = rightTopLinks[0];
    middleRightBlock = rightTopLinks[1];
  }

  // The third child is a flex container with a vertical list of <a> blocks separated by dividers
  verticalListBlock = gridChildren[2];

  // Compose the columns for the second row
  const columnsRow = [
    leftBlock,
    topRightBlock,
    middleRightBlock,
    verticalListBlock
  ];

  // Table header
  const headerRow = ['Columns block (columns2)'];

  // Build the table
  const cells = [
    headerRow,
    columnsRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
