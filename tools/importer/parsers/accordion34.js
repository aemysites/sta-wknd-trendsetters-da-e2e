/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct accordion items
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Prepare table rows
  const rows = [];
  // Header row as per spec
  rows.push(['Accordion (accordion34)']);

  accordions.forEach((acc) => {
    // Title cell: find the .paragraph-lg inside the toggle
    let title = acc.querySelector('.w-dropdown-toggle .paragraph-lg');
    // Defensive: fallback to first .w-dropdown-toggle child text if needed
    if (!title) {
      const toggle = acc.querySelector('.w-dropdown-toggle');
      if (toggle) {
        title = document.createElement('div');
        title.textContent = toggle.textContent.trim();
      }
    }

    // Content cell: find the .accordion-content (nav) and grab its content
    let content = acc.querySelector('.accordion-content');
    // Defensive: fallback to first nav if needed
    if (!content) {
      content = acc.querySelector('nav');
    }
    // Defensive: if still not found, create empty
    if (!content) {
      content = document.createElement('div');
    }

    rows.push([title, content]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
