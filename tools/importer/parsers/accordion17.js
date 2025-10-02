/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Defensive: get all immediate child accordions
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((accordion) => {
    // Title cell: find the dropdown toggle and get the label
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // Find the label inside the toggle (usually .paragraph-lg)
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the dropdown content
    const nav = accordion.querySelector('.accordion-content');
    let contentEl = null;
    if (nav) {
      // Usually the content is inside a .utility-padding-all-1rem > .rich-text
      const richText = nav.querySelector('.rich-text') || nav;
      contentEl = richText;
    }

    // Push row: always 2 columns (title, content)
    rows.push([
      titleEl || '',
      contentEl || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
