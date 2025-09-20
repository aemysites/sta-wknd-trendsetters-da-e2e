/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row per block spec
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Defensive: get all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title: find the toggle, then the text
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // Prefer the text element inside toggle
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: find the dropdown list, then the rich text content
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Defensive: look for rich text, else use the wrapper
      contentEl = contentNav.querySelector('.rich-text') || contentNav;
    }

    // Push row: always 2 columns (title, content)
    rows.push([
      titleEl || document.createTextNode(''),
      contentEl || document.createTextNode(''),
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
