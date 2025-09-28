/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 1: Header ---
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background Image ---
  // Find the background image (usually absolutely positioned)
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  // Defensive fallback: If not found, try any .cover-image
  if (!bgImg) {
    bgImg = element.querySelector('img.cover-image');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (Title, Subheading, CTA) ---
  // Find the main card body and extract only the right content (headline, subheading, CTA)
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    const grid = cardBody.querySelector('.grid-layout');
    if (grid) {
      // Find all direct children of grid
      const gridChildren = Array.from(grid.children);
      // Find the right content DIV (not the left image)
      const rightContent = gridChildren.find(
        el => el.tagName === 'DIV'
      );
      if (rightContent) {
        contentCell = rightContent;
      }
    }
  }
  const contentRow = [contentCell ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
