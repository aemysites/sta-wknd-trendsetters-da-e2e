/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero37)'];

  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  // Find grid children
  const gridChildren = grid ? grid.querySelectorAll(':scope > *') : [];

  // We'll need: heading, subheading, CTA (link)
  let heading = null;
  let subheading = null;
  let cta = null;

  // Find the text block and CTA button
  gridChildren.forEach((child) => {
    // Heading and subheading are in a div
    if (child.querySelector('h2')) {
      heading = child.querySelector('h2');
      subheading = child.querySelector('p');
    }
    // CTA is an anchor
    if (child.tagName === 'A') {
      cta = child;
    }
  });

  // Compose the content cell for row 3
  // We'll group heading, subheading, and CTA as per visual hierarchy
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Row 2: Background image (none in this case)
  const imageRow = ['']; // No image present

  // Row 3: Content
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
