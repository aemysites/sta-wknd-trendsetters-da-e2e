/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: find the .paragraph-lg inside .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the .accordion-content (nav), then its .rich-text
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Defensive: get all children inside nav, not just .rich-text
      const contentWrap = contentNav.querySelector('.utility-padding-all-1rem') || contentNav;
      // If there's a rich-text, use it; else use the wrapper
      contentEl = contentWrap.querySelector('.rich-text') || contentWrap;
    }

    // Add row: [titleEl, contentEl]
    rows.push([titleEl, contentEl]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
