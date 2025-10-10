/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Find image (main visual, right side in grid)
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Gather text content (left side in grid)
  let textContentDiv = null;
  const gridDivs = element.querySelectorAll(':scope .grid-layout > div');
  if (gridDivs.length > 0) {
    // First grid child is the text content
    textContentDiv = gridDivs[0];
  }
  // Defensive: fallback if grid-layout is missing
  if (!textContentDiv) {
    textContentDiv = element.querySelector('h1, h2, h3, h4, h5, h6')?.closest('div') || element;
  }

  // 4. Compose the text content cell
  // Include all children of textContentDiv as a single cell, preserving order and structure
  let textCellContent = [];
  if (textContentDiv) {
    textCellContent = Array.from(textContentDiv.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Exclude empty elements
        return node.textContent.trim() !== '' || node.tagName === 'A' || node.tagName === 'BUTTON';
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return false;
    });
  }
  const textRow = [textCellContent];

  // 5. Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  // 6. Replace original element
  element.replaceWith(table);
}
