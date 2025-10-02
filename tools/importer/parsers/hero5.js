/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (contains text and image)
  const gridContainer = element.querySelector('.w-layout-grid.grid-layout');

  // Find the nested grid (contains text content)
  const nestedGrid = gridContainer ? gridContainer.querySelector('.w-layout-grid.container') : null;

  // Find the image (background/hero visual)
  const img = gridContainer ? gridContainer.querySelector('img') : null;

  // Find the section with heading, paragraph, and buttons
  let contentSection = null;
  if (nestedGrid) {
    contentSection = nestedGrid.querySelector('.section');
  } else if (gridContainer) {
    contentSection = gridContainer.querySelector('.section');
  }

  // Defensive: Get heading, paragraph, and button group
  let heading = contentSection ? contentSection.querySelector('h2') : null;
  let paragraph = contentSection ? contentSection.querySelector('.rich-text, .w-richtext, p') : null;
  let buttonGroup = contentSection ? contentSection.querySelector('.button-group') : null;

  // Compose the text cell: heading, paragraph, buttons (if present)
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  if (paragraph) textCellContent.push(paragraph);
  if (buttonGroup) textCellContent.push(buttonGroup);

  // Table rows per block spec
  const headerRow = ['Hero (hero5)'];
  const imageRow = [img ? img : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
