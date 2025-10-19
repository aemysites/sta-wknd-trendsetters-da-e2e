/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting 4 children in order: name, tags, heading, rich text
  const nameEl = gridChildren[0];
  const tagsEl = gridChildren[1];
  const headingEl = gridChildren[2];
  const richTextEl = gridChildren[3];

  // First column: name only
  let col1 = '';
  if (nameEl) {
    const nameDiv = document.createElement('div');
    nameDiv.textContent = nameEl.textContent;
    col1 = nameDiv;
  }

  // Second column: tags only
  let col2 = '';
  if (tagsEl) {
    const tagsDiv = document.createElement('div');
    Array.from(tagsEl.querySelectorAll('.tag')).forEach(tag => {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tag.textContent;
      tagsDiv.appendChild(tagDiv);
    });
    col2 = tagsDiv;
  }

  // Third column: heading + rich text
  const col3 = document.createElement('div');
  if (headingEl) {
    const heading = document.createElement('h2');
    heading.textContent = headingEl.textContent;
    col3.appendChild(heading);
  }
  if (richTextEl) {
    richTextEl.querySelectorAll('p').forEach(p => {
      const para = document.createElement('p');
      para.textContent = p.textContent;
      col3.appendChild(para);
    });
  }

  // Table header row
  const headerRow = ['Columns block (columns31)'];
  // Table content row: three columns
  const contentRow = [col1, col2, col3];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
