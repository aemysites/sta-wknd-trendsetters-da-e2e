/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) return;

  // Find background image (first grid child)
  let bgImg = null;
  const gridChildren = gridLayout.querySelectorAll(':scope > div');
  if (gridChildren.length > 0) {
    const bgDiv = gridChildren[0];
    bgImg = bgDiv.querySelector('img');
  }

  // Find content card (second grid child)
  let cardContent = null;
  if (gridChildren.length > 1) {
    const contentDiv = gridChildren[1];
    // Find the card within the nested grid
    const nestedGrid = contentDiv.querySelector('.desktop-1-column');
    if (nestedGrid) {
      cardContent = nestedGrid.querySelector('.card');
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Hero (hero6)'];
  // Second row: background image (reference the element, not clone)
  const imageRow = [bgImg ? bgImg : ''];
  // Third row: all text and CTA content (reference the card element)
  const contentRow = [cardContent ? cardContent : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
