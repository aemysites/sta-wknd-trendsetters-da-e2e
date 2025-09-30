/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (multi-column)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Column 1: Name and tags
  const nameEl = gridChildren.find(el => el.classList.contains('paragraph-xl'));
  const tagsEl = gridChildren.find(el => el.classList.contains('flex-vertical'));
  const col1 = [];
  if (nameEl) col1.push(nameEl);
  if (tagsEl) col1.push(tagsEl);

  // Column 2: Heading
  const headingEl = gridChildren.find(el => el.tagName === 'H2');
  const col2 = headingEl ? [headingEl] : [];

  // Column 3: Rich text
  const richTextParent = gridChildren.find(el => el.querySelector('.rich-text'));
  let col3 = [];
  if (richTextParent) {
    const richTextEl = richTextParent.querySelector('.rich-text');
    if (richTextEl) {
      col3 = [richTextEl];
    } else {
      col3 = [richTextParent];
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns31)'];
  const columnsRow = [col1, col2, col3];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace original element
  element.replaceWith(table);
}
