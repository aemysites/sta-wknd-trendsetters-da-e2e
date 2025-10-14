/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items (w-dropdown)
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Build rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title: find the toggle element (role="button") and get its label
    const toggle = item.querySelector('[role="button"]');
    let title = null;
    if (toggle) {
      // The title is usually inside a child div with class 'paragraph-lg'
      const titleDiv = toggle.querySelector('.paragraph-lg');
      title = titleDiv ? titleDiv : toggle;
    }

    // Content: find the dropdown content
    const contentNav = item.querySelector('nav.accordion-content');
    let content = null;
    if (contentNav) {
      // Look for rich text inside the content area
      const richText = contentNav.querySelector('.rich-text, .w-richtext');
      content = richText ? richText : contentNav;
    }

    // Defensive: fallback to empty div if not found
    if (!title) title = document.createElement('div');
    if (!content) content = document.createElement('div');

    return [title, content];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
