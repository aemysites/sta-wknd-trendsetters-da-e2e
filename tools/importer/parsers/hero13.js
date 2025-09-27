/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero13)'];

  // 2. Background image row (row 2)
  // The background image is the first image in the first grid cell
  let backgroundImg = null;
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    // The first child div contains the background image
    const bgDiv = grid.children[0];
    if (bgDiv) {
      backgroundImg = bgDiv.querySelector('img');
    }
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (row 3)
  // The content is in the card body, which contains the heading, icon+text rows, and button
  let contentCell = '';
  if (grid && grid.children.length > 1) {
    const contentDiv = grid.children[1];
    // Find the card body
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      // The main grid inside card body (3 columns on desktop)
      const innerGrid = cardBody.querySelector('.w-layout-grid.grid-layout');
      if (innerGrid) {
        // The heading and feature list are in the second column (index 1)
        // The first column is a decorative image
        const columns = Array.from(innerGrid.children);
        // Defensive: find the column with the heading
        const headingCol = columns.find(col => col.querySelector('h2'));
        if (headingCol) {
          // We'll collect:
          // - Heading (h2)
          // - Feature list (icon+text rows)
          // - Button group (subscribe)
          const contentParts = [];
          const heading = headingCol.querySelector('h2');
          if (heading) contentParts.push(heading);

          // The vertical flex contains the feature list and button
          const flexVertical = headingCol.querySelector('.flex-vertical');
          if (flexVertical) {
            // Each feature row is a flex-horizontal with icon and text
            const features = flexVertical.querySelectorAll('.flex-horizontal');
            features.forEach(feature => {
              contentParts.push(feature);
            });
            // Add dividers if present
            const dividers = flexVertical.querySelectorAll('.divider');
            dividers.forEach(divider => {
              contentParts.push(divider);
            });
          }
          // Button group
          const buttonGroup = headingCol.querySelector('.button-group');
          if (buttonGroup) contentParts.push(buttonGroup);

          contentCell = contentParts;
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
