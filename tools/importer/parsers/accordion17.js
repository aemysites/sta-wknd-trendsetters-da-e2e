/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row: single cell with block name
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (w-dropdown)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the toggle button (role="button") and get its text
    const toggle = item.querySelector('[role="button"]');
    let titleEl = null;
    if (toggle) {
      // The actual title is usually inside a child div with text
      titleEl = toggle.querySelector('.paragraph-lg');
      // Defensive: fallback to toggle itself if not found
      if (!titleEl) titleEl = toggle;
    }

    // Content: find the content nav
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Usually the content is inside a rich-text div
      contentEl = contentNav.querySelector('.w-richtext');
      // Defensive: fallback to contentNav itself if not found
      if (!contentEl) contentEl = contentNav;
    }

    // Each row must be an array of two cells: [title, content]
    rows.push([
      titleEl || document.createTextNode(''),
      contentEl || document.createTextNode(''),
    ]);
  });

  // Create the block table (header row as first row, not <thead>)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
