/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Get all direct children that are accordions
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((accordion) => {
    // Title cell: find the toggle, then the text div inside
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      // The title is usually in a .paragraph-lg div inside the toggle
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // fallback: use the toggle itself
        title = toggle;
      }
    }

    // Content cell: find the nav.accordion-content, then the rich-text div inside
    let content = '';
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      // Find the first .rich-text or just use the nav's inner content
      const richText = nav.querySelector('.rich-text');
      if (richText) {
        content = richText;
      } else {
        // fallback: use the nav's inner content
        content = nav;
      }
    }

    // Defensive: only add if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
