/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero41) block parsing
  // 1 column, 3 rows: [header], [background image], [content]

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero41)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the main image (background asset)
  let bgImg = element.querySelector('img');
  // Use the actual image element if present
  const imageRow = [bgImg ? bgImg : ''];

  // --- CONTENT ROW ---
  // Find the heading, paragraph, and CTA button
  // The heading is the h1
  const heading = element.querySelector('h1');

  // Subheading/paragraph is the first <p> inside the flex-vertical
  let subheading = element.querySelector('.flex-vertical p');

  // CTA button is the first <a> inside .button-group
  let cta = element.querySelector('.button-group a');

  // Compose the content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  const contentRow = [contentCell];

  // --- Build the table ---
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
