/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion18)'];

  // Find all direct children that represent accordion items (each .divider)
  // Defensive: sometimes the top-level element may be a wrapper, so get all .divider children at any level
  const dividers = element.querySelectorAll('.divider');

  const rows = [];

  dividers.forEach(divider => {
    // Each divider contains a grid with two children: heading and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // Find the heading (usually has class h4-heading)
    const titleEl = gridChildren.find(child => child.classList.contains('h4-heading'));
    // Find the content (usually has class w-richtext or paragraph-lg)
    const contentEl = gridChildren.find(child => child.classList.contains('w-richtext') || child.classList.contains('paragraph-lg'));
    // Defensive: fallback if not found
    if (!titleEl || !contentEl) return;
    rows.push([titleEl, contentEl]);
  });

  // If no .divider found, try fallback: maybe the structure is flat
  if (rows.length === 0) {
    // Try to find repeating grid-layouts
    const grids = element.querySelectorAll('.w-layout-grid');
    grids.forEach(grid => {
      const gridChildren = Array.from(grid.children);
      const titleEl = gridChildren.find(child => child.classList.contains('h4-heading'));
      const contentEl = gridChildren.find(child => child.classList.contains('w-richtext') || child.classList.contains('paragraph-lg'));
      if (titleEl && contentEl) {
        rows.push([titleEl, contentEl]);
      }
    });
  }

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
