/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items (immediate children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: find the w-dropdown-toggle, then the .paragraph-lg inside
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg');
      // Defensive fallback: if not found, use toggle itself
      if (!title) title = toggle;
    }

    // Content cell: find the nav.accordion-content, then the .rich-text inside
    const contentNav = item.querySelector('nav.accordion-content');
    let content = null;
    if (contentNav) {
      // Find the rich-text block inside
      const richText = contentNav.querySelector('.rich-text');
      if (richText) {
        content = richText;
      } else {
        // Fallback: use the nav itself
        content = contentNav;
      }
    }

    // Defensive: if title or content missing, use empty string
    rows.push([
      title || '',
      content || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
