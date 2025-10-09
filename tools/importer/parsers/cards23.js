/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all cards from all tab panes
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const cards = [];
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid.grid-layout');
    if (!grid) return;
    grid.querySelectorAll(':scope > a').forEach((cardEl) => {
      // Image cell: image or placeholder icon if no image
      let imgCell = '';
      const img = cardEl.querySelector('img');
      if (img) {
        imgCell = img;
      } else {
        // Use a simple SVG icon as a placeholder for cards with no image
        const placeholder = document.createElement('span');
        placeholder.innerHTML = '<svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#eee"/><text x="24" y="20" text-anchor="middle" fill="#aaa" font-size="12">No Image</text></svg>';
        imgCell = placeholder;
      }
      // Text cell: heading and description
      const textCell = document.createElement('div');
      const heading = cardEl.querySelector('h3');
      if (heading) textCell.appendChild(heading.cloneNode(true));
      const desc = cardEl.querySelector('.paragraph-sm');
      if (desc) textCell.appendChild(desc.cloneNode(true));
      cards.push([imgCell, textCell]);
    });
  });
  const rows = [['Cards (cards23)'], ...cards];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
