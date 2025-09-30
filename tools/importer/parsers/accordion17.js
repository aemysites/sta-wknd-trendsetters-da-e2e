/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all accordion items (direct children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // 2. Prepare the table rows
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title: .w-dropdown-toggle > .paragraph-lg (or fallback to .w-dropdown-toggle)
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: nav.accordion-content > .rich-text (or fallback to nav.accordion-content)
    const contentNav = item.querySelector('nav.accordion-content');
    let contentEl = null;
    if (contentNav) {
      contentEl = contentNav.querySelector('.rich-text') || contentNav;
    }

    // Defensive: skip if both are missing
    if (!titleEl && !contentEl) return;

    // Always reference the existing DOM nodes
    rows.push([
      titleEl || '',
      contentEl || ''
    ]);
  });

  // 3. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
