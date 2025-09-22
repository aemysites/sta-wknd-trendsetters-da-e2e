/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const slideDivs = Array.from(grid.children);

  // Prepare table rows
  const rows = [];
  // Header row: must be exactly as specified
  const headerRow = ['Carousel (carousel16)'];
  rows.push(headerRow);

  // For each slide, extract the image (mandatory)
  slideDivs.forEach((slideDiv) => {
    // Find the image inside the slide
    const img = slideDiv.querySelector('img');
    // Only add row if image exists
    if (img) {
      rows.push([img, '']); // Always two columns per row, second cell empty if no text
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
