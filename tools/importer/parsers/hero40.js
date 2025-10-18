/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (should reference the actual <img> element)
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // Find the main content area (heading, paragraph, CTA)
  // The heading is inside a div with class 'container', then inside another grid div
  const contentContainer = element.querySelector('.container');
  let heading = null;
  let subheading = null;
  let cta = null;
  if (contentContainer) {
    // Heading: h1, h2, or h3
    heading = contentContainer.querySelector('h1, h2, h3');
    // Subheading: paragraph
    subheading = contentContainer.querySelector('p');
    // CTA: anchor or button
    cta = contentContainer.querySelector('a, button');
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero40)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
