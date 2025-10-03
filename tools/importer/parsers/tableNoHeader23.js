/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Table (no header, tableNoHeader23)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that represent FAQ items
  // Each divider contains a grid with two children: question and answer
  const faqDividers = Array.from(element.querySelectorAll(':scope > .divider'));

  faqDividers.forEach(divider => {
    // Each divider contains a grid-layout
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if grid missing
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return; // Defensive: skip if not enough children

    // First child: question (heading), second child: answer (rich text)
    const question = gridChildren[0];
    const answer = gridChildren[1];

    // Add row with two columns: question and answer
    rows.push([question, answer]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
