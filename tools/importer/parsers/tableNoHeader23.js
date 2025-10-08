/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader23) block
  // Header row as per guidelines (must be a single row, single cell, NOT a <th>)
  const headerRow = ['Table (no header, tableNoHeader23)'];

  // Each row: .divider > .w-layout-grid > [heading, paragraph]
  const rows = [];
  const dividers = element.querySelectorAll(':scope > div.divider');

  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get first heading and first richtext inside grid
    const heading = grid.querySelector('.h4-heading');
    const richtext = grid.querySelector('.rich-text, .w-richtext');
    if (heading && richtext) {
      // Extract text content for both cells
      rows.push([
        heading.textContent.trim(),
        richtext.textContent.trim()
      ]);
    }
  });

  // Compose table data: header row, then each Q&A row as [question, answer]
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document, { header: false });
  element.replaceWith(table);
}
