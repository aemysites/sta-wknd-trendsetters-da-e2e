/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row (row 2)
  // Find the image inside the hero background wrapper
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image (should be the hero background)
    bgImg = imgCandidates[0];
  }

  // 3. Text content row (row 3)
  // Find the main heading (h1)
  let textContent = [];
  const heading = element.querySelector('h1');
  if (heading) {
    textContent.push(heading);
  }
  // No subheading or CTA in this example, but if present, add here

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : ''],
  ];

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
