/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the main grid
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // Defensive: Find the image (background)
  let imageEl = null;
  if (gridDivs.length > 0) {
    // The first grid div contains the image
    imageEl = gridDivs[0].querySelector('img');
  }

  // Defensive: Find the content area (heading, paragraph, button)
  let headingEl = null;
  let paragraphEl = null;
  let ctaEl = null;
  if (gridDivs.length > 1) {
    // The second grid div contains the content
    const contentGrid = gridDivs[1].querySelector('.grid-layout');
    if (contentGrid) {
      // Heading
      headingEl = contentGrid.querySelector('h1');
      // Paragraph and button group
      const flexVertical = contentGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        paragraphEl = flexVertical.querySelector('p');
        ctaEl = flexVertical.querySelector('.button-group a');
      }
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero41)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [];
  // Compose content cell: heading, paragraph, CTA (if present)
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (paragraphEl) contentCell.push(paragraphEl);
  if (ctaEl) contentCell.push(ctaEl);
  contentRow.push(contentCell);

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
