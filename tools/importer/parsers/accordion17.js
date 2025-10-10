/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = element.querySelectorAll('.accordion.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: Look for the clickable header (role="button" or .w-dropdown-toggle)
    const titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    let titleCell;
    if (titleEl) {
      titleCell = titleEl;
    } else {
      // fallback: use the whole toggle
      const toggle = item.querySelector('.w-dropdown-toggle');
      titleCell = toggle ? toggle : document.createElement('span');
    }

    // Content: The collapsible body (nav.accordion-content)
    const contentNav = item.querySelector('nav.accordion-content');
    let contentCell;
    if (contentNav) {
      // Use the inner content, typically a div.rich-text
      const richContent = contentNav.querySelector('.rich-text');
      if (richContent) {
        contentCell = richContent;
      } else {
        // fallback: use all content inside nav
        contentCell = contentNav;
      }
    } else {
      // fallback: empty cell
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
