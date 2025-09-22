/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion items (direct children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row as specified
  const headerRow = ['Accordion (accordion17)'];

  // Build rows: each row is [title, content]
  const rows = accordionItems.map((item) => {
    // Title cell: find the label inside the toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Prefer the .paragraph-lg (the visible label)
      const label = toggle.querySelector('.paragraph-lg');
      titleCell = label ? label : toggle;
    }
    // Content cell: find the nav.accordion-content > .utility-padding... > .rich-text
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Find the rich text content
      const rich = nav.querySelector('.rich-text');
      contentCell = rich ? rich : nav;
    }
    return [titleCell, contentCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
