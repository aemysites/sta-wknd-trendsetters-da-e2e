/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: look for the direct child with [role="button"] or .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle[role="button"], .w-dropdown-toggle');
    let title = '';
    if (toggle) {
      // The title is usually in a .paragraph-lg inside the toggle
      const titleEl = toggle.querySelector('.paragraph-lg');
      title = titleEl ? titleEl : document.createTextNode(toggle.textContent.trim());
    }

    // Content: look for the .w-dropdown-list (accordion content)
    const contentNav = item.querySelector('.w-dropdown-list');
    let content = '';
    if (contentNav) {
      // Find the content wrapper inside nav
      const contentWrapper = contentNav.querySelector('.utility-padding-all-1rem, .w-richtext');
      // Prefer the rich text if present
      const richText = contentNav.querySelector('.w-richtext');
      if (richText) {
        content = richText;
      } else if (contentWrapper) {
        content = contentWrapper;
      } else {
        // fallback to all children
        content = Array.from(contentNav.childNodes);
      }
    }

    rows.push([
      title,
      content
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
