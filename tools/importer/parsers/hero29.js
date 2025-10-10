/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Block name
  const headerRow = ['Hero (hero29)'];

  // 2. Second row: Background image (optional)
  // Find the first <img> in the hero section (background image)
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    // Reference the existing image element, do not clone or use src directly
    bgImg = img;
  }

  // 3. Third row: Title, subheading, CTA (if any)
  // Find the main heading (h1)
  let textContent = [];
  const h1 = element.querySelector('h1');
  if (h1) {
    textContent.push(h1);
  }
  // No subheading or CTA in this example, but code is flexible for future cases

  // Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : ''],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
