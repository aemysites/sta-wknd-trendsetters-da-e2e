/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero29)'];

  // 2. Find the background image (optional)
  // Look for an <img> inside the hero block
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // 3. Find the main heading (h1), subheading, and CTA
  // For this example, only h1 is present
  let textContent = [];
  // Find the container with the heading
  const headingContainer = element.querySelector('h1');
  if (headingContainer) {
    textContent.push(headingContainer);
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : ''],
  ];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element
  element.replaceWith(table);
}
