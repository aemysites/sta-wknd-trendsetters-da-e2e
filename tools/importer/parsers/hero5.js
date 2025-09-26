/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the image (background asset)
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content container (with heading, paragraph, buttons)
  const contentGrid = gridChildren.find((el) => el.classList.contains('grid-layout'));
  let contentSection = null;
  if (contentGrid) {
    contentSection = Array.from(contentGrid.children).find((el) => el.classList.contains('section'));
  }

  // Prepare content elements for the 3rd row
  let contentElements = [];
  if (contentSection) {
    // Heading
    const heading = contentSection.querySelector('h2');
    if (heading) contentElements.push(heading);
    // Paragraph
    const paragraphDiv = contentSection.querySelector('.rich-text');
    if (paragraphDiv) contentElements.push(paragraphDiv);
    // Button group
    const buttonGroup = contentSection.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }

  // Build table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [img ? img : ''];
  const contentRow = [contentElements.length ? contentElements : ''];
  const cells = [headerRow, imageRow, contentRow];

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
