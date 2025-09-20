/* global WebImporter */
export default function parse(element, { document }) {
  // --- Critical Review: Extract all dynamic content, preserve semantic structure, use proper HTML elements, and follow block/table rules ---

  // 1. Find the background image (row 2)
  let bgImg = null;
  // The background image is the absolutely positioned .cover-image in the first grid cell
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    const gridChildren = gridLayout.children;
    for (const child of gridChildren) {
      const img = child.querySelector('img.cover-image.utility-position-absolute');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }
  // Defensive fallback: first .cover-image if not found
  if (!bgImg) {
    bgImg = element.querySelector('img.cover-image');
  }

  // 2. Find the content cell (row 3)
  // This includes: headline (h2), feature list (with icons and text), CTA button
  let contentFragments = [];
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Headline
    const h2 = cardBody.querySelector('h2');
    if (h2) contentFragments.push(h2);

    // Features (each flex-horizontal inside .flex-vertical)
    const flexVertical = cardBody.querySelector('.flex-vertical');
    if (flexVertical) {
      // For each feature row, preserve icon and text
      const featureRows = flexVertical.querySelectorAll('.flex-horizontal');
      featureRows.forEach(row => {
        // Clone row to preserve icon and text
        contentFragments.push(row);
      });
    }

    // CTA Button
    const buttonGroup = cardBody.querySelector('.button-group');
    if (buttonGroup) {
      contentFragments.push(buttonGroup);
    }
  }

  // Edge case: If no content found, fallback to all children
  if (contentFragments.length === 0) {
    contentFragments = Array.from(element.children);
  }

  // 3. Build table rows as per block spec
  const headerRow = ['Hero (hero13)']; // Block name, exact per instructions
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentFragments]; // All fragments in one cell

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow
  ], document);

  // 5. Replace element
  element.replaceWith(table);
}
