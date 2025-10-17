/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (single cell, not colspan)
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an accordion item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the clickable trigger (role="button") and get its text
    let title = '';
    const trigger = item.querySelector('[role="button"]');
    if (trigger) {
      const titleEl = trigger.querySelector('.paragraph-lg');
      title = titleEl ? titleEl.innerHTML : trigger.textContent;
    }

    // Content: find the accordion content area
    let content = '';
    const contentNav = item.querySelector('.accordion-content');
    if (contentNav) {
      const richText = contentNav.querySelector('.w-richtext');
      content = richText ? richText.innerHTML : contentNav.innerHTML;
    }

    // Push a row: [title, content]
    rows.push([title, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
