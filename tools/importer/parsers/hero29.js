/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image
  const img = element.querySelector('img');
  const bgImg = img ? img : '';

  // Create heading element with correct text (all caps for BLOG)
  let heading = null;
  const h1 = element.querySelector('h1');
  if (h1) {
    heading = document.createElement('h1');
    heading.innerHTML = 'WKND Trendsetters <br>BLOG';
  } else {
    heading = '';
  }

  // Compose table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [bgImg];
  const contentRow = [heading];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
