/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Build rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title: find the toggle button (role="button") and get its label
    const toggle = item.querySelector('[role="button"]');
    let titleEl = null;
    if (toggle) {
      // The label is usually the last child div inside the toggle
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    } else {
      // Fallback: find a direct child div with text
      titleEl = item.querySelector('.paragraph-lg') || item;
    }

    // Content: find the accordion content panel
    const contentPanel = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentPanel) {
      // Find the rich text content inside the panel
      contentEl = contentPanel.querySelector('.w-richtext') || contentPanel;
    } else {
      // Fallback: use the item itself
      contentEl = item;
    }

    return [titleEl, contentEl];
  });

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
