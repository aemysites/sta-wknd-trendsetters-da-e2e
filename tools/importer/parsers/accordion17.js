/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the element with role="button" (the toggle)
    const toggle = item.querySelector('[role="button"]');
    let titleCell;
    if (toggle) {
      // The title is usually in a child div with class .paragraph-lg, fallback to textContent
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    } else {
      titleCell = document.createTextNode('');
    }

    // Content: find the nav.accordion-content or .w-dropdown-list
    let contentCell;
    const contentNav = item.querySelector('.accordion-content, .w-dropdown-list');
    if (contentNav) {
      // Find the first rich text or just use the contentNav itself
      const rich = contentNav.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = contentNav;
      }
    } else {
      contentCell = document.createTextNode('');
    }

    // Push a row: [titleCell, contentCell]
    rows.push([titleCell, contentCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
