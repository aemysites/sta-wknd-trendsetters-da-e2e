/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion18) block parser
  // Header row as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Get all direct children that are accordion items (divider blocks)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  accordionItems.forEach(item => {
    // Each item contains a grid-layout with two children: title and content
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // skip if structure is unexpected
    const children = Array.from(grid.children);
    if (children.length < 2) return; // skip if structure is unexpected

    // Title cell: usually a heading (e.g., .h4-heading)
    const titleEl = children[0];
    // Content cell: usually a rich-text paragraph
    const contentEl = children[1];

    rows.push([titleEl, contentEl]);
  });

  // Build the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
