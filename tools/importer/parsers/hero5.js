/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const mainGrid = element.querySelector(':scope > div');
  if (!mainGrid) return;

  // Find all direct children of the main grid
  const gridChildren = mainGrid.children;

  // Find the image (background asset)
  let imageEl = null;
  let contentContainer = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else if (child.tagName === 'DIV') {
      contentContainer = child;
    }
  }

  // Defensive: If contentContainer is a grid, get the inner section
  if (contentContainer && contentContainer.classList.contains('grid-layout')) {
    const innerSection = contentContainer.querySelector(':scope > div.section');
    if (innerSection) {
      contentContainer = innerSection;
    }
  }

  // Extract heading, paragraph, and buttons from contentContainer
  let headingEl = null;
  let paragraphEl = null;
  let buttonGroupEl = null;
  if (contentContainer) {
    headingEl = contentContainer.querySelector('h2');
    paragraphEl = contentContainer.querySelector('.rich-text, .w-richtext, p');
    buttonGroupEl = contentContainer.querySelector('.button-group');
  }

  // Compose the text cell: heading, paragraph, buttons (if present)
  const textCellContent = [];
  if (headingEl) textCellContent.push(headingEl);
  if (paragraphEl) textCellContent.push(paragraphEl);
  if (buttonGroupEl) textCellContent.push(buttonGroupEl);

  // Build the table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  const cells = [headerRow, imageRow, textRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
