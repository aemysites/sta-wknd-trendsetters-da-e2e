/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background Image (optional) ---
  // Find the background image (the absolutely positioned image)
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  const row2 = [bgImg ? bgImg : ''];

  // --- Row 3: Content ---
  // Find the card body
  let cardBody = element.querySelector('.card-body');
  let contentCell = [];
  if (cardBody) {
    // Find the main grid inside the card body
    let grid = cardBody.querySelector('.grid-layout');
    if (grid) {
      // Get all children of the grid
      let gridChildren = Array.from(grid.children);
      // Find the image (optional, but not needed in content cell)
      // Find the text block
      let textBlock = gridChildren.find(child => child.querySelector('h2'));
      if (textBlock) {
        // Heading
        let heading = textBlock.querySelector('h2');
        if (heading) contentCell.push(heading.cloneNode(true));
        // All the flex-vertical content (subheadings, paragraphs, icons, etc)
        let flexVertical = textBlock.querySelector('.flex-vertical');
        if (flexVertical) {
          // Clone and include all its children (including dividers, icons, paragraphs)
          contentCell.push(flexVertical.cloneNode(true));
        }
        // Button group (CTA)
        let buttonGroup = textBlock.querySelector('.button-group');
        if (buttonGroup) {
          contentCell.push(buttonGroup.cloneNode(true));
        }
      }
    }
  }
  const row3 = [contentCell.length > 0 ? contentCell : ''];

  // Always include 3 rows: header, bg image, content
  const cells = [headerRow, row2, row3];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
