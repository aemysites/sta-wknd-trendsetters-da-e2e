/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all direct children divs of the grid layout
  const grid = element.querySelector('.grid-layout');
  const children = grid ? Array.from(grid.children) : [];

  // 1. Header row
  const headerRow = ['Hero (hero25)'];

  // 2. Background image or video row
  let bgCell = '';
  const videoDiv = children.find(child => child.classList.contains('utility-position-relative'));
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      const img = embedDiv.querySelector('img');
      if (img && img.src && img.src !== 'about:blank') {
        bgCell = img;
      }
    }
  }
  const bgRow = [bgCell];

  // 3. Content row (title, subheading, CTA)
  const content = [];
  // Title
  const titleDiv = children.find(child => child.classList.contains('h1-heading'));
  if (titleDiv) content.push(titleDiv);
  // Subheading (paragraph)
  const subDiv = children.find(child => child.querySelector('p.subheading'));
  if (subDiv) {
    const p = subDiv.querySelector('p.subheading');
    if (p) content.push(p);
  }
  // CTA buttons
  const btnDiv = children.find(child => child.classList.contains('button-group'));
  if (btnDiv) {
    const ctas = Array.from(btnDiv.querySelectorAll('a'));
    if (ctas.length) content.push(...ctas);
  }
  const contentRow = [content];

  // Compose table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
