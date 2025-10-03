/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Each accordion item is a .w-dropdown
  const accordionItems = getDirectChildren(element, '.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        title = titleEl;
      } else {
        // fallback: use text content of toggle
        title = document.createElement('div');
        title.textContent = toggle.textContent.trim();
      }
    }

    // Content: .w-dropdown-list .w-richtext (or the whole .w-dropdown-list)
    let content = '';
    const dropdownList = item.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // Prefer rich text if present
      const richText = dropdownList.querySelector('.w-richtext');
      if (richText) {
        content = richText;
      } else {
        // fallback: use the dropdownList content
        content = dropdownList;
      }
    }

    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
