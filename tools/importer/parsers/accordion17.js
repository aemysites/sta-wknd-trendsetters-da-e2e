/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Accordion (accordion17)'];

  // Collect all accordion items (immediate children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Build rows: each row is [title, content]
  const rows = accordionItems.map((item) => {
    // Defensive: Find the toggle/title
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      // Find the title text element inside the toggle
      const titleEl = toggle.querySelector('.paragraph-lg');
      title = titleEl ? titleEl : document.createTextNode('');
    } else {
      title = document.createTextNode('');
    }

    // Defensive: Find the content
    const contentNav = item.querySelector('.accordion-content');
    let content = '';
    if (contentNav) {
      // Find the rich text content inside the nav
      const richText = contentNav.querySelector('.rich-text, .w-richtext');
      content = richText ? richText : document.createTextNode('');
    } else {
      content = document.createTextNode('');
    }

    return [title, content];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
