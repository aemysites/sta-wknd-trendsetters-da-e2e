/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all accordion items (direct children)
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell: find the .paragraph-lg inside the toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      }
    }

    // Content cell: find the content inside nav.accordion-content
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Find the innermost rich-text content
      const richText = nav.querySelector('.rich-text');
      if (richText) {
        contentCell = richText;
      } else {
        // Fallback: use the nav itself
        contentCell = nav;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
