/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row: find the main hero image (referenced, not cloned)
  let imageCell = '';
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const img = parallaxDiv.querySelector('img');
    if (img) {
      imageCell = img; // Reference the actual element
    }
  }

  // 3. Content row: find the heading and any CTA
  let contentCell = '';
  const container = element.querySelector('.container');
  if (container) {
    const headingWrapper = container.querySelector('.utility-margin-bottom-6rem');
    if (headingWrapper) {
      // Collect all heading and CTA elements
      const contentParts = [];
      // Heading (h1)
      const h1 = headingWrapper.querySelector('h1');
      if (h1) contentParts.push(h1);
      // Button group (CTA)
      const buttonGroup = headingWrapper.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        contentParts.push(buttonGroup);
      }
      // Only push if something was found
      if (contentParts.length > 0) {
        contentCell = contentParts;
      }
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
