/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Extract all images for the collage background
  const gridLayout = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (gridLayout) {
    images = Array.from(gridLayout.querySelectorAll('img'));
  }
  const backgroundCell = images.length ? images : [''];

  // 3. Extract only the heading, subheading, and CTAs (flattened, no container divs)
  const contentOverlay = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentCell = '';
  if (contentOverlay) {
    const container = contentOverlay.querySelector('.container');
    if (container) {
      // Extract heading
      const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
      // Extract subheading (first <p>)
      const subheading = container.querySelector('p');
      // Extract CTAs (all <a> inside .button-group)
      const buttonGroup = container.querySelector('.button-group');
      let ctas = [];
      if (buttonGroup) {
        ctas = Array.from(buttonGroup.querySelectorAll('a'));
      }
      // Build content cell as an array of elements (no unnecessary wrappers)
      const cellContent = [];
      if (heading) cellContent.push(heading.cloneNode(true));
      if (subheading) cellContent.push(subheading.cloneNode(true));
      ctas.forEach(a => cellContent.push(a.cloneNode(true)));
      contentCell = cellContent.length ? cellContent : '';
    }
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
