/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: Find the element with role="button" or .w-dropdown-toggle
    const toggle = item.querySelector('[role="button"], .w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // Find the actual title text inside the toggle
      // Usually in a child with .paragraph-lg, but fallback to textContent
      const titleEl = toggle.querySelector('.paragraph-lg') || toggle;
      title = titleEl.cloneNode(true);
    }

    // Content: Find the accordion content panel
    const contentNav = item.querySelector('.accordion-content, .w-dropdown-list');
    let content = null;
    if (contentNav) {
      // Find the rich text content inside the content panel
      const richText = contentNav.querySelector('.w-richtext') || contentNav;
      content = richText.cloneNode(true);
    }

    // Only add row if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
