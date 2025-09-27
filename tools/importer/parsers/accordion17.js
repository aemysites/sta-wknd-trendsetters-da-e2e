/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Defensive: Get all immediate child accordions
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((accordion) => {
    // Title cell: find the toggle, then the title text element
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Find the first child with text (usually .paragraph-lg)
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        titleCell = titleEl;
      } else {
        // Fallback: use toggle itself if no .paragraph-lg
        titleCell = toggle;
      }
    }

    // Content cell: find the dropdown list
    const contentNav = accordion.querySelector('.w-dropdown-list');
    let contentCell = '';
    if (contentNav) {
      // Find the rich text content inside
      const richText = contentNav.querySelector('.w-richtext');
      if (richText) {
        contentCell = richText;
      } else {
        // Fallback: use all children of contentNav
        contentCell = Array.from(contentNav.children);
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
