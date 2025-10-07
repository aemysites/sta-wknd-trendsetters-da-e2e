/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel16) block parsing
  // 1. Table header row
  const headerRow = ['Carousel (carousel16)'];

  // 2. Find carousel grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 3. Get all immediate child divs (each is a slide container)
  const slideDivs = Array.from(grid.children);

  // 4. Build rows for each slide (image only, no text)
  const rows = slideDivs.map((slideDiv) => {
    // Find the image inside the nested structure
    const img = slideDiv.querySelector('img');
    // Defensive: only add row if image exists
    if (img) {
      // Each row: [image] (no empty cell)
      return [img];
    }
    return null;
  }).filter(Boolean);

  // 5. Assemble table cells
  const cells = [headerRow, ...rows];

  // 6. Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace original element
  element.replaceWith(block);
}
