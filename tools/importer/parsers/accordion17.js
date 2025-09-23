/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Get all direct children that are accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title: find the toggle, then the paragraph-lg inside
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      // Prefer the .paragraph-lg, fallback to textContent
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        title = titleEl;
      } else {
        // fallback: use the toggle's text
        title = document.createElement('span');
        title.textContent = toggle.textContent.trim();
      }
    }

    // Content: find the .accordion-content (nav), then the .rich-text inside
    let content = '';
    const contentNav = item.querySelector('.accordion-content');
    if (contentNav) {
      // The actual content is inside .rich-text.w-richtext
      const richText = contentNav.querySelector('.rich-text.w-richtext');
      if (richText) {
        content = richText;
      } else {
        // fallback: use all children of contentNav
        content = Array.from(contentNav.children);
        if (content.length === 0) {
          content = contentNav.textContent.trim();
        }
      }
    }

    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
