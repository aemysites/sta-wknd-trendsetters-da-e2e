/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Select all accordion items (immediate children with class 'w-dropdown')
  const accordionItems = element.querySelectorAll(':scope > .w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the .w-dropdown-toggle, then the .paragraph-lg inside it
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: find the nav.accordion-content, then the .rich-text inside it
    let contentEl = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // The rich-text is usually inside a div inside nav
      contentEl = nav.querySelector('.rich-text') || nav;
    }

    // Defensive: fallback to empty div if missing
    if (!titleEl) {
      titleEl = document.createElement('div');
    }
    if (!contentEl) {
      contentEl = document.createElement('div');
    }

    rows.push([titleEl, contentEl]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
