/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find(el => el.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background Image row
  // Find the image inside the first grid cell
  let imageCell = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    const img = firstGrid.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // 3. Content row: heading, paragraph, button
  let contentCell = null;
  if (gridDivs.length > 1) {
    const secondGrid = gridDivs[1];
    // The content is inside a nested grid
    const nestedGrid = secondGrid.querySelector('.w-layout-grid');
    if (nestedGrid) {
      // Heading
      const heading = nestedGrid.querySelector('h1');
      // Paragraph and button group
      const flexVertical = nestedGrid.querySelector('.flex-vertical');
      // Compose content cell
      const contentParts = [];
      if (heading) contentParts.push(heading);
      if (flexVertical) contentParts.push(flexVertical);
      contentCell = contentParts;
    }
  }

  // Defensive: fallback if parsing fails
  if (!imageCell) imageCell = '';
  if (!contentCell) contentCell = '';

  // Build table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
