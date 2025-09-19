/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as specified
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Defensive: Get all immediate children that are accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title cell: Find the toggle div with the label
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Find the label text (usually in .paragraph-lg)
      const label = toggle.querySelector('.paragraph-lg');
      titleCell = label ? label : document.createTextNode('');
    } else {
      titleCell = document.createTextNode('');
    }

    // Content cell: Find the dropdown content
    const contentNav = item.querySelector('.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // Usually the actual content is inside a .rich-text or similar
      const richText = contentNav.querySelector('.rich-text');
      if (richText) {
        contentCell = richText;
      } else {
        // Fallback: use the whole nav content
        contentCell = contentNav;
      }
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
