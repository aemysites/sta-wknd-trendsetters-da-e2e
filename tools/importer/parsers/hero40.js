/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout (top-level children)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The grid has two main children: left (image) and right (content)
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // --- Row 1: Header ---
  const headerRow = ['Hero (hero40)'];

  // --- Row 2: Background Image ---
  // The first grid child contains the image
  const imageContainer = gridChildren[0];
  const bgImage = imageContainer.querySelector('img');
  const row2 = [bgImage ? bgImage : ''];

  // --- Row 3: Content (headline, paragraph, CTA) ---
  const contentContainer = gridChildren[1];
  // Find the inner grid (contains h1 and the flex vertical group)
  const innerGrid = contentContainer.querySelector('.w-layout-grid.grid-layout');
  let headline = '', paragraph = '', cta = '';
  if (innerGrid) {
    // Headline
    headline = innerGrid.querySelector('h1');
    // Paragraph and CTA are inside the flex-vertical group
    const flexGroup = innerGrid.querySelector('.flex-vertical');
    if (flexGroup) {
      paragraph = flexGroup.querySelector('p');
      cta = flexGroup.querySelector('.button-group a');
    }
  }
  // Compose content cell
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);
  const row3 = [contentCell.length ? contentCell : ''];

  // Build the table
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
