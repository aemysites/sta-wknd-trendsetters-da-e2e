/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for block name
  const headerRow = ['Hero (hero28)'];

  // 2. Find the background image (first .ix-parallax-scale-out-hero img)
  let bgImg = null;
  const gridDiv = element.querySelector('.w-layout-grid');
  if (gridDiv) {
    const imgWrapper = gridDiv.querySelector('.ix-parallax-scale-out-hero');
    if (imgWrapper) {
      bgImg = imgWrapper.querySelector('img');
    }
  }
  // Defensive: if not found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Find the text content (title, subheading, CTA)
  // The text is in the second .container inside the grid
  let textContent = null;
  if (gridDiv) {
    const containers = gridDiv.querySelectorAll('.container');
    if (containers.length > 0) {
      // The first (and only) container holds the text content
      const container = containers[0];
      // We'll include the whole container for resilience
      textContent = container;
    }
  }
  const textRow = [textContent ? textContent : ''];

  // 4. Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
