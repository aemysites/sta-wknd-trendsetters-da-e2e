/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Defensive: get all immediate child accordions
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordions.forEach((accordion) => {
    // Title: find the toggle, then the title text element inside
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // Find the title text inside the toggle
      title = toggle.querySelector('.paragraph-lg');
    }
    // Content: find the dropdown list, then the rich text content inside
    const dropdownList = accordion.querySelector('.w-dropdown-list');
    let content = null;
    if (dropdownList) {
      // The content is inside a utility-padding div, then a .rich-text div
      const paddingDiv = dropdownList.querySelector('.utility-padding-all-1rem');
      if (paddingDiv) {
        const richText = paddingDiv.querySelector('.rich-text');
        if (richText) {
          content = richText;
        } else {
          content = paddingDiv;
        }
      } else {
        content = dropdownList;
      }
    }
    // Defensive: If title or content missing, skip this row
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
