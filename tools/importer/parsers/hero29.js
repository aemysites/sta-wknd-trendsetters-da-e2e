/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  // Find the image element (background image)
  let bgImg = null;
  // Look for the first <img> descendant in the hero block
  bgImg = element.querySelector('img');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (heading, subheading, CTA)
  // Find the main heading (h1, h2, etc.)
  let contentCell = [];
  // We'll look for the largest heading
  let heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    contentCell.push(heading);
  }
  // Subheading: look for h2-h6 that are not the main heading, or a paragraph
  // (In this example, there is no subheading or CTA, but code is robust)
  const allHeadings = element.querySelectorAll('h2, h3, h4, h5, h6');
  for (const sub of allHeadings) {
    if (sub !== heading) {
      contentCell.push(sub);
    }
  }
  // Look for a CTA (button or link)
  const cta = element.querySelector('a, button');
  if (cta) {
    contentCell.push(cta);
  }
  // If no subheading or CTA, just use the heading
  if (contentCell.length === 0 && heading) {
    contentCell = [heading];
  }
  // If still empty, leave blank
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
