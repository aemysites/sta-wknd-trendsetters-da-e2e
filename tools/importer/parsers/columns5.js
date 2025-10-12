/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div, :scope > img, :scope > section'));

  // Find the main grid container (holds columns)
  let gridContainer = null;
  let imageEl = null;
  for (const child of children) {
    if (child.classList.contains('w-layout-grid')) {
      // Find nested grid with text/buttons
      const nestedGrids = child.querySelectorAll('.w-layout-grid');
      if (nestedGrids.length) {
        gridContainer = nestedGrids[0];
      }
      // Find image directly inside grid
      imageEl = child.querySelector('img');
      if (!imageEl) {
        // If not found, check direct children
        imageEl = child.querySelector(':scope > img');
      }
    }
  }

  // Defensive fallback: If not found, try top-level
  if (!gridContainer) {
    gridContainer = element.querySelector('.w-layout-grid.container');
  }
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }

  // Extract left column (text/buttons)
  let leftColContent = [];
  if (gridContainer) {
    // Find the section with heading, paragraph, buttons
    const section = gridContainer.querySelector('.section');
    if (section) {
      // Heading
      const heading = section.querySelector('h2');
      if (heading) leftColContent.push(heading);
      // Paragraph
      const paragraph = section.querySelector('.rich-text, .w-richtext, p');
      if (paragraph) leftColContent.push(paragraph);
      // Button group
      const buttonGroup = section.querySelector('.button-group');
      if (buttonGroup) leftColContent.push(buttonGroup);
    }
  }

  // Table header row
  const headerRow = ['Columns block (columns5)'];
  // Second row: left column (text/buttons), right column (image)
  const columnsRow = [leftColContent, imageEl].map(cell => Array.isArray(cell) ? cell : [cell].filter(Boolean));

  // Build the table
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
