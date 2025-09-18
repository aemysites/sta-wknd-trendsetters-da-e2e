/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (the direct child of section)
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Find all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the image (background asset)
  const image = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content container (contains heading, paragraph, buttons)
  const contentGrid = gridChildren.find((el) => el.classList.contains('container'));
  let contentSection = contentGrid;
  if (contentGrid) {
    // The actual content is inside the first child of the contentGrid
    contentSection = contentGrid.querySelector(':scope > div') || contentGrid;
  }

  // Table header
  const headerRow = ['Hero (hero5)'];

  // Second row: image (background asset)
  const imageRow = [image ? image : ''];

  // Third row: content (heading, paragraph, buttons)
  const contentRow = [contentSection ? contentSection : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
