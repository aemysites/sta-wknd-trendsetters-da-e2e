/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero29) block parsing
  // 1 column, 3 rows: [header], [image], [text]

  // Header row
  const headerRow = ['Hero (hero29)'];

  // --- Extract background image ---
  // Find the first <img> inside the hero block
  let imgEl = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    imgEl = imgCandidates[0]; // Reference the actual image element
  }

  // --- Extract text content ---
  // Find the main heading (h1)
  let textContent = [];
  const h1 = element.querySelector('h1');
  if (h1) {
    textContent.push(h1); // Reference the actual h1 element
  }
  // No subheading, paragraph, or CTA in this example

  // --- Build table rows ---
  const imageRow = [imgEl ? imgEl : ''];
  const textRow = [textContent.length ? textContent : ''];

  // --- Assemble block table ---
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
