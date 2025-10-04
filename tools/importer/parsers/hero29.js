/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Get all immediate children of the grid-layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Find the image (background)
  let imageEl = null;
  for (const child of gridChildren) {
    // Look for a descendant img element
    const img = child.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }

  // 3. Find the headline/text container
  let textContainer = null;
  for (const child of gridChildren) {
    // Look for a descendant h1 element
    const h1 = child.querySelector('h1');
    if (h1) {
      textContainer = child;
      break;
    }
  }

  // 4. Build table rows
  // Row 2: Background image (optional)
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: Headline, subheading, CTA (optional)
  // For this layout, all text is inside textContainer
  const textRow = [textContainer ? textContainer : ''];

  // 5. Assemble table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element
  element.replaceWith(table);
}
