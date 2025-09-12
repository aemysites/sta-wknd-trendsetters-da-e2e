/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as specified
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // Find the main image (background)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  for (const img of imgCandidates) {
    // Defensive: Only use if src exists and alt is not empty
    if (img.src && img.alt && img.alt.toLowerCase().includes('image')) {
      bgImg = img;
      break;
    }
  }
  // If not found, fallback to first image
  if (!bgImg && imgCandidates.length) {
    bgImg = imgCandidates[0];
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (Heading, Paragraph, CTA) ---
  // Find the content container (the right-side grid cell)
  let contentCell = '';
  // Find the grid cell with the heading
  const gridCells = element.querySelectorAll(':scope > div > div');
  let contentContainer = null;
  for (const cell of gridCells) {
    if (cell.querySelector('h1')) {
      contentContainer = cell;
      break;
    }
  }
  // Defensive: If not found, fallback to first div with h1
  if (!contentContainer) {
    contentContainer = element.querySelector('h1')?.parentElement;
  }
  if (contentContainer) {
    // Compose content: heading, paragraph, button
    const heading = contentContainer.querySelector('h1');
    const paragraph = contentContainer.querySelector('p');
    const button = contentContainer.querySelector('a');
    // Compose cell content array
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (paragraph) cellContent.push(paragraph);
    if (button) cellContent.push(button);
    contentCell = cellContent.length ? cellContent : '';
  }
  const contentRow = [contentCell];

  // --- Compose table ---
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
