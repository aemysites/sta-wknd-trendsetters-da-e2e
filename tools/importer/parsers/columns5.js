/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (should have 2 children: content and image)
  let leftCol, rightCol;
  const gridContainers = element.querySelectorAll('.grid-layout.container');
  let found = false;
  for (const grid of gridContainers) {
    // Look for section (content) and img (image)
    const section = grid.querySelector('.section');
    const img = grid.querySelector('img');
    if (section && img) {
      leftCol = section;
      rightCol = img;
      found = true;
      break;
    }
  }
  // Fallback: try top-level children
  if (!found) {
    leftCol = element.querySelector('.section');
    rightCol = element.querySelector('img');
  }

  // Compose left column content, preserving the paragraph inside its rich-text container
  let leftContent = [];
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h2');
    if (heading) leftContent.push(heading);
    // Rich text paragraph (preserve <div> with <p> inside)
    const richTextDiv = leftCol.querySelector('.rich-text, .w-richtext');
    if (richTextDiv) {
      // Clone the div and preserve its children
      leftContent.push(richTextDiv.cloneNode(true));
    }
    // Buttons
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Compose right column content
  let rightContent = [];
  if (rightCol) {
    rightContent.push(rightCol);
  }

  // Table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftContent, rightContent];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
