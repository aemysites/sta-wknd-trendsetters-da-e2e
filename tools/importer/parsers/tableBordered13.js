/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (bordered, tableBordered13)'];

  // Collect all immediate child .divider elements (each is a row)
  const dividers = element.querySelectorAll(':scope > .divider');
  const rows = [];

  dividers.forEach(divider => {
    // Each divider contains a grid-layout with two children: heading and paragraph
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive: skip if missing grid
    const children = grid.children;
    if (children.length < 2) return; // Defensive: skip if missing expected children

    // First child: heading (question)
    const heading = children[0];
    // Second child: paragraph (answer)
    const answer = children[1];

    // Add both to the row (2 columns)
    rows.push([heading, answer]);
  });

  // Compose table cells: header row + all content rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
