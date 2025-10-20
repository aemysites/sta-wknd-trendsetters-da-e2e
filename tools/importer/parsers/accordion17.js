/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (must be a single cell)
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the clickable header (role="button")
    const titleButton = item.querySelector('[role="button"]');
    let titleContent = '';
    if (titleButton) {
      // Use the .paragraph-lg inside the button if present
      const titleTextDiv = titleButton.querySelector('.paragraph-lg');
      titleContent = titleTextDiv ? titleTextDiv : titleButton;
    }

    // Content: find the accordion content panel
    const contentPanel = item.querySelector('.accordion-content');
    let contentCell = '';
    if (contentPanel) {
      // Use the .rich-text inside the panel if present
      const richText = contentPanel.querySelector('.rich-text');
      contentCell = richText ? richText : contentPanel;
    }

    // Push the row: [title, content]
    rows.push([
      titleContent,
      contentCell
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
