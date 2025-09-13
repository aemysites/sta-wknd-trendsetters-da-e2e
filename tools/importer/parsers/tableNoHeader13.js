/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (no header, tableNoHeader13)'];

  // Collect all immediate child .divider elements (each is a row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: If no .divider children, try fallback (for robustness)
  const fallbackDividers = dividers.length ? dividers : [element];

  // Build table rows
  const rows = fallbackDividers.map(divider => {
    // Each divider contains a grid-layout with two children: heading and paragraph
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return ['']; // Defensive: empty row if missing
    const children = Array.from(grid.children);
    // Find heading and paragraph
    const heading = children.find(child => child.classList.contains('h4-heading'));
    const paragraph = children.find(child => child.classList.contains('rich-text'));
    // Defensive: fallback to empty string if missing
    return [heading || '', paragraph || ''];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
