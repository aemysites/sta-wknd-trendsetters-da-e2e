/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header as a single cell row (must be <td>, not <th>)
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an accordion item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: look for the toggle with [role="button"] or .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle[role="button"], .w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // The title is usually inside a .paragraph-lg
      const titleEl = toggle.querySelector('.paragraph-lg');
      title = titleEl ? titleEl : toggle;
    } else {
      // Fallback: use the first child text
      title = item.firstChild;
    }

    // Content: look for .accordion-content or .w-dropdown-list
    const contentNav = item.querySelector('.accordion-content, .w-dropdown-list');
    let content = null;
    if (contentNav) {
      // Usually the content is inside a .rich-text or similar
      const richText = contentNav.querySelector('.rich-text, .w-richtext');
      content = richText ? richText : contentNav;
    } else {
      // Fallback: use the nav itself
      content = contentNav;
    }

    // Defensive: If either title or content is missing, skip this row
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
