/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion items (direct children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Header row as required by block spec
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title: .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (toggle) {
      titleCell = toggle;
    }

    // Content: nav.accordion-content (use the whole nav for semantic content)
    let contentCell = '';
    const contentNav = item.querySelector('nav.accordion-content');
    if (contentNav) {
      contentCell = contentNav;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
