/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Locate grid containers ---
  const gridDivs = element.querySelectorAll(':scope > div');

  // --- 2. Extract background image (must reference the actual <img> element) ---
  let bgImg = null;
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // --- 3. Extract content block: headline, subheading, CTA buttons ---
  let contentCell = '';
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      // Extract all text content (including text nodes) and interactive elements
      const wrapper = document.createElement('div');
      card.childNodes.forEach((node) => {
        // Include all element nodes and text nodes with content
        if (
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        ) {
          wrapper.appendChild(node.cloneNode(true));
        }
      });
      contentCell = wrapper.childNodes.length > 0 ? wrapper : '';
    }
  }

  // --- 4. Compose table rows ---
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell ? contentCell : ''];
  const rows = [headerRow, imageRow, contentRow];

  // --- 5. Create table and replace element ---
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
