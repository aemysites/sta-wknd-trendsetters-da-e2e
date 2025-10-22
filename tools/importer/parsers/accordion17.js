/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Select all accordion items (each .w-dropdown)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the clickable header (role="button")
    const titleBtn = item.querySelector('[role="button"]');
    let titleContent = '';
    if (titleBtn) {
      // Try to find the main title text inside the button
      // Often in a .paragraph-lg or similar
      const titleTextEl = titleBtn.querySelector('.paragraph-lg');
      titleContent = titleTextEl ? titleTextEl : titleBtn;
    }

    // Content: find the content area (accordion-content)
    const contentNav = item.querySelector('.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // The actual content is usually inside a .rich-text or similar
      const richContent = contentNav.querySelector('.rich-text, .w-richtext');
      contentCell = richContent ? richContent : contentNav;
    }

    rows.push([
      titleContent,
      contentCell
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
