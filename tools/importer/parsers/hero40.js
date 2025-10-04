/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero40)'];

  // 2. Find the background image (first img in the block)
  const bgImg = element.querySelector('img');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Gather the content for the third row (title, subheading, CTA)
  // Find the container with the text and CTA
  let contentContainer = null;
  // There are two grid-layouts; the second one contains the text & CTA
  const grids = element.querySelectorAll('.grid-layout');
  if (grids.length > 1) {
    // The second grid contains the text
    contentContainer = grids[1];
  }

  // Defensive: fallback if not found
  if (!contentContainer) {
    contentContainer = element;
  }

  // Find the heading (h1)
  const heading = contentContainer.querySelector('h1');

  // Find the subheading (paragraph)
  const subheading = contentContainer.querySelector('p');

  // Find the CTA (first <a> inside .button-group)
  let cta = null;
  const buttonGroup = contentContainer.querySelector('.button-group');
  if (buttonGroup) {
    cta = buttonGroup.querySelector('a');
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  const contentRow = [contentCell];

  // 4. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}
