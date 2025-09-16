/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all direct children that are accordions
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell: find the .paragraph-lg inside the toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      }
    }
    // Content cell: find the .accordion-content, then the .rich-text
    let contentCell = '';
    const contentNav = item.querySelector('.accordion-content');
    if (contentNav) {
      // The content is usually inside .rich-text, but we want the whole content block
      const contentBlock = contentNav.querySelector('.utility-padding-all-1rem');
      if (contentBlock) {
        contentCell = contentBlock;
      } else {
        contentCell = contentNav;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
