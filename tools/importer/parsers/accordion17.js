/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Prepare rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title: find the trigger element (role="button") and grab its text
    const toggle = item.querySelector('[role="button"]');
    let titleCell = '';
    if (toggle) {
      // Find the title text inside the toggle
      const titleDiv = toggle.querySelector('.paragraph-lg');
      titleCell = titleDiv ? titleDiv : toggle;
    }

    // Content: find the content container
    const contentNav = item.querySelector('nav.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // Find the rich text content inside the nav
      const richText = contentNav.querySelector('.rich-text');
      contentCell = richText ? richText : contentNav;
    }

    return [titleCell, contentCell];
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
