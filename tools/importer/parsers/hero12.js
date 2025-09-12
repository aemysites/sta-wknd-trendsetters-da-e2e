/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (first image in the section)
  let backgroundImg = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img.cover-image');
    if (img) backgroundImg = img;
  }
  const imageRow = [backgroundImg];

  // 3. Content row (Title, Subheading, CTA)
  let contentCell = [];
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      // Find the headline
      const headline = cardBody.querySelector('h2');
      if (headline) contentCell.push(headline);
      // Find all paragraph-sm (subheadings)
      const subheadings = Array.from(cardBody.querySelectorAll('p.paragraph-sm'));
      if (subheadings.length) contentCell.push(...subheadings);
      // Find the CTA button
      const cta = cardBody.querySelector('.button-group a.button');
      if (cta) contentCell.push(cta);
    }
  }
  // Always add the content row, but only as an empty string if no content
  const contentRow = [contentCell.length > 0 ? contentCell : undefined];

  // Compose table rows
  const cells = [headerRow, imageRow, contentRow];

  // Remove the last row if it is undefined (no content)
  if (cells[cells.length - 1][0] === undefined) {
    cells.pop();
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
