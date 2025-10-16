/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  let bgImg = '';
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // 3. Content row: Heading, subheading, CTA (if any)
  // Fix: Ensure heading text matches screenshot and HTML casing (all uppercase)
  let contentCell = '';
  const h1 = element.querySelector('h1');
  if (h1) {
    // Use the textContent and transform to uppercase, preserving line breaks
    const lines = h1.innerHTML.split('<br>');
    const heading = document.createElement('h1');
    heading.innerHTML = lines.map(line => line.trim().toUpperCase()).join('<br>');
    contentCell = heading;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
