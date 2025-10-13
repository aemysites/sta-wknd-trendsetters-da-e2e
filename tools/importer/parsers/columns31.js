/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find each column element
  const nameCol = grid.querySelector('.paragraph-xl');
  const tagsCol = grid.querySelector('.flex-vertical');
  const headlineCol = grid.querySelector('h2');
  const richTextCol = grid.querySelector('.rich-text');

  // Column 1: name + tags (grouped together as in screenshot)
  const col1 = document.createElement('div');
  if (nameCol) col1.appendChild(nameCol.cloneNode(true));
  if (tagsCol) col1.appendChild(tagsCol.cloneNode(true));

  // Column 2: headline only
  const col2 = headlineCol ? headlineCol.cloneNode(true) : '';

  // Column 3: paragraphs only
  let col3 = '';
  if (richTextCol) {
    // Only move the paragraphs, not the whole rich text wrapper
    col3 = document.createElement('div');
    Array.from(richTextCol.querySelectorAll('p')).forEach(p => {
      col3.appendChild(p.cloneNode(true));
    });
  }

  // Build the table rows
  const headerRow = ['Columns (columns31)'];
  const columnsRow = [col1, col2, col3];

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
