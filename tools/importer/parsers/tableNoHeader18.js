/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirement
  const headerRow = ['Table (no header, tableNoHeader18)'];

  // Find all immediate children with class 'divider' (each is a Q&A pair)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: if no direct divider children, try to find nested ones (for robustness)
  const allDividers = dividers.length > 0 ? dividers : Array.from(element.querySelectorAll('.divider'));

  // For each divider, extract the question and answer
  const rows = allDividers.map(divider => {
    // Each divider contains a grid-layout div with two children: question (h4-heading) and answer (rich-text)
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', '']; // Defensive: skip if structure is unexpected
    const children = Array.from(grid.children);
    // Find question and answer
    const question = children.find(child => child.classList.contains('h4-heading'));
    const answer = children.find(child => child.classList.contains('rich-text'));
    // Reference the existing elements, not clone or create new ones
    return [question || '', answer || ''];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
