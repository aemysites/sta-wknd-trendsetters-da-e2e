/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = [];
  // Required header row
  const headerRow = ['Accordion (accordion17)'];
  rows.push(headerRow);

  accordionItems.forEach((item) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      const label = toggle.querySelector('.paragraph-lg');
      title = label || toggle;
    }
    // Content cell: .accordion-content > .rich-text (or fallback)
    const contentNav = item.querySelector('.accordion-content');
    let content = '';
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text');
      content = richText || contentNav;
    }
    rows.push([
      title || '',
      content || ''
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
