/* global WebImporter */

export default function parse(element, { document }) {
  // --- HERO (hero29) block parsing ---
  // Table: 1 col, 3 rows: [header], [image], [content]

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Find the background image (img element)
  let imgEl = element.querySelector('img');
  let imageRow = [imgEl ? imgEl : ''];

  // 3. Find the main heading and possible subheading/CTA
  // In this HTML, heading is inside h1
  let titleEl = element.querySelector('h1');

  // Find subheading (h2, h3, etc.) and CTA (button, a)
  // For this example, there is no subheading or CTA, but code should be robust
  let subheadingEl = element.querySelector('h2, h3');

  // Find CTA: button or anchor
  let ctaEl = element.querySelector('a, button');

  // Compose content cell
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaEl) contentCell.push(ctaEl);

  // Defensive: If nothing found, leave blank
  let contentRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const rows = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
