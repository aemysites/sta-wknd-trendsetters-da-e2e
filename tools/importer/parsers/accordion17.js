/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Each row: [title, content]
  const rows = accordionItems.map((item) => {
    // Title: clickable header (role="button")
    let title = item.querySelector('[role="button"] .paragraph-lg') || item.querySelector('[role="button"]') || document.createElement('div');

    // Content: collapsible panel
    let content = item.querySelector('nav.accordion-content .w-richtext') || item.querySelector('nav.accordion-content') || document.createElement('div');

    return [title, content];
  });

  // Build table: header row, then item rows
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(table);
}
