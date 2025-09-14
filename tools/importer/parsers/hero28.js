/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero (hero28)'];

  // --- Row 2: Background Image ---
  // Find the image inside the parallax/cover-image container
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img.cover-image');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (Heading, Subheading, CTA) ---
  // Find the container with the heading
  let contentContainer = null;
  for (const div of gridDivs) {
    if (div.classList.contains('container')) {
      contentContainer = div;
      break;
    }
  }
  // Defensive: fallback to any container with h1 if not found
  if (!contentContainer) {
    for (const div of gridDivs) {
      if (div.querySelector('h1')) {
        contentContainer = div;
        break;
      }
    }
  }
  // The content cell should include the heading and any subheading/buttons (if present)
  let contentCell = '';
  if (contentContainer) {
    // Only include the main content (not the whole container)
    // Find the first child div with the heading
    const mainContent = contentContainer.querySelector(':scope > div');
    if (mainContent) {
      contentCell = mainContent;
    } else {
      contentCell = contentContainer;
    }
  }
  const contentRow = [contentCell];

  // Compose the table
  const tableCells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}
