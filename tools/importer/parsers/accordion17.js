/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct accordion blocks
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  accordions.forEach((accordion) => {
    // Title: Find the toggle div with the actual title text
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // The title is usually in a child div with class 'paragraph-lg'
      title = toggle.querySelector('.paragraph-lg');
      if (!title) title = toggle; // fallback to toggle itself
    }

    // Content: Find the dropdown list (nav.accordion-content)
    const nav = accordion.querySelector('nav.accordion-content');
    let content = null;
    if (nav) {
      // The actual content is inside a div.rich-text or similar inside nav
      const rich = nav.querySelector('.rich-text');
      if (rich) {
        content = rich;
      } else {
        content = nav;
      }
    }

    // Only add row if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
