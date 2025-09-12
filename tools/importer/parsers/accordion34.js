/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items (direct children)
  const accordionItems = Array.from(element.children).filter(child => child.classList.contains('accordion'));

  // Header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach(item => {
    // Defensive: Find the toggle/title and content
    // Title: find .paragraph-lg inside .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Content: find .accordion-content (nav) and grab its inner block
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Defensive: find the first .rich-text inside
      contentEl = contentNav.querySelector('.rich-text, .w-richtext');
      // If not found, fallback to the nav itself
      if (!contentEl) contentEl = contentNav;
    }
    // If title or content missing, skip this row
    if (!titleEl || !contentEl) return;
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
