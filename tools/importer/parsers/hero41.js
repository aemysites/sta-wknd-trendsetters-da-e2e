/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  // Find the main image (background)
  const img = element.querySelector('img');
  const bgImgRow = [img ? img : ''];

  // 3. Content row: heading, subheading, CTA
  // Find the main heading
  const h1 = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Find the subheading (paragraph)
  // Look for a large paragraph or the first <p> under the content area
  let subheading = null;
  const paragraphs = element.querySelectorAll('p');
  if (paragraphs.length > 0) {
    subheading = paragraphs[0];
  }

  // Find the CTA button (anchor)
  let cta = null;
  const ctaBtn = element.querySelector('a.button, a.primary-button-on-inverse, a.w-button, a[href]');
  if (ctaBtn) {
    cta = ctaBtn;
  }

  // Compose content cell
  const contentCell = [];
  if (h1) contentCell.push(h1);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
