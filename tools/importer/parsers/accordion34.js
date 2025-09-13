/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate accordion items
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header: must be a single cell in a row (not two cells)
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordions.forEach((acc) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) titleCell = titleDiv;
      else titleCell = toggle;
    }

    // Content cell: .w-dropdown-list (nav.accordion-content)
    let contentCell = '';
    const nav = acc.querySelector('.w-dropdown-list');
    if (nav) {
      // Use the inner content div if present, else the nav itself
      const inner = nav.querySelector('.utility-padding-all-1rem, .rich-text, div');
      if (inner) contentCell = inner;
      else contentCell = nav;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
