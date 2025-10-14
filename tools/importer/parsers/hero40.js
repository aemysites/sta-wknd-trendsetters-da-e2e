/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // --- Extract background image (row 2) ---
  let imageEl = null;
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }

  // --- Extract content (row 3) ---
  let heading = null;
  let subheading = null;
  let cta = null;
  let contentElements = [];

  // Find the content container (with h1)
  let contentContainer = null;
  for (const child of gridChildren) {
    if (child.querySelector('h1')) {
      contentContainer = child;
      break;
    }
  }

  if (contentContainer) {
    heading = contentContainer.querySelector('h1');
    // Subheading: paragraph inside flex-vertical
    const flexVertical = contentContainer.querySelector('.flex-vertical');
    if (flexVertical) {
      subheading = flexVertical.querySelector('p');
      // CTA: link inside button-group
      const buttonGroup = flexVertical.querySelector('.button-group');
      if (buttonGroup) {
        cta = buttonGroup.querySelector('a');
      }
    }
  }

  if (heading) contentElements.push(heading);
  if (subheading) contentElements.push(subheading);
  if (cta) contentElements.push(cta);

  // --- Compose table ---
  const headerRow = ['Hero (hero40)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentElements.length > 0 ? contentElements : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
