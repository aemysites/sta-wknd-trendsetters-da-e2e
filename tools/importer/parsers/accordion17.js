/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (single cell)
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Build rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title: find the toggle button (role="button") and get its text
    const toggle = item.querySelector('[role="button"]');
    let titleCell;
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    } else {
      titleCell = document.createTextNode(item.textContent.trim());
    }

    // Content: find the accordion content panel
    const contentPanel = item.querySelector('.accordion-content');
    let contentCell;
    if (contentPanel) {
      const richText = contentPanel.querySelector('.rich-text, .w-richtext');
      if (richText) {
        contentCell = richText;
      } else {
        contentCell = contentPanel;
      }
    } else {
      contentCell = document.createTextNode('');
    }

    return [titleCell, contentCell];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
