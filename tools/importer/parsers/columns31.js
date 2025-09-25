/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns block (columns31)'];

  // --- Column 1: Name and tags ---
  const leftColEls = [];
  // Find the name (Taylor Brooks)
  const nameEl = columns.find(el => el.textContent.trim() === 'Taylor Brooks');
  if (nameEl) leftColEls.push(nameEl);
  // Find the tags column (contains .tag)
  const tagsCol = columns.find(el => el.querySelector('.tag'));
  if (tagsCol) {
    // Get all tag elements
    const tags = Array.from(tagsCol.querySelectorAll('.tag'));
    leftColEls.push(...tags);
  }

  // --- Column 2: Heading ---
  const headingCol = columns.find(el => el.tagName === 'H2');

  // --- Column 3: Rich text (paragraphs) ---
  const richTextCol = columns.find(el => el.querySelector('.rich-text'));
  let richTextContent = null;
  if (richTextCol) {
    richTextContent = richTextCol.querySelector('.rich-text');
  }

  // Build the row for columns
  const columnsRow = [leftColEls, headingCol, richTextContent].map(cell => {
    if (!cell) return '';
    if (Array.isArray(cell)) {
      // Defensive: Remove nulls
      return cell.filter(Boolean);
    }
    return cell;
  });

  // Table: header + columns row
  const tableCells = [headerRow, columnsRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
