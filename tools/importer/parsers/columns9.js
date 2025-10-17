/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Identify grid children: left (text), right (contacts), and image
  const gridChildren = mainGrid.querySelectorAll(':scope > *');
  let leftCol = null;
  let rightCol = null;
  let imgEl = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h2, h3, p')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      imgEl = child;
    }
  });

  if (!leftCol || !rightCol || !imgEl) return;

  // --- LEFT COLUMN CONTENT ---
  const leftColContent = document.createElement('div');
  leftColContent.append(
    ...Array.from(leftCol.childNodes).filter(
      (n) => n.nodeType === 1 && (['H2', 'H3', 'P'].includes(n.tagName))
    )
  );

  // --- RIGHT COLUMN CONTENT ---
  // Preserve the UL structure for semantic correctness
  const rightColContent = rightCol.cloneNode(true);

  // --- TABLE CONSTRUCTION ---
  // 1st row: block name
  const headerRow = ['Columns block (columns9)'];
  // 2nd row: left and right columns
  const secondRow = [leftColContent, rightColContent];
  // 3rd row: image spanning both columns (single cell array to indicate colspan)
  const thirdRow = [[imgEl]];

  const tableRows = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
