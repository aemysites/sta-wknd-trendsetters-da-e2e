/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Get all accordion items (direct children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title: find the toggle div with class 'w-dropdown-toggle', then the title text inside
    let title = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // The title is usually in the last child div with class 'paragraph-lg'
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // fallback to the toggle itself
        title = toggle;
      }
    }

    // Content: find the nav.accordion-content > ... > .rich-text (or the nav itself if rich-text not present)
    let content = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Look for .rich-text inside nav
      const richText = nav.querySelector('.rich-text');
      if (richText) {
        content = richText;
      } else {
        // fallback to the nav's content
        content = nav;
      }
    }

    rows.push([
      title,
      content,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
