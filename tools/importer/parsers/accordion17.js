/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (immediate children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title: find the toggle div with class 'w-dropdown-toggle' and get the text element inside
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // The title is likely in a div with class 'paragraph-lg' inside the toggle
      titleEl = toggle.querySelector('.paragraph-lg');
      // Fallback: if not found, use the toggle itself
      if (!titleEl) titleEl = toggle;
    }

    // Content: find the nav.accordion-content and get the inner content
    const contentNav = item.querySelector('nav.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // The content is inside a div.rich-text.w-richtext, but we want the whole content area
      // (in case there are other elements)
      // Use the first child div inside nav (usually utility-padding-all-1rem...)
      const contentContainer = contentNav.querySelector(':scope > div');
      if (contentContainer) {
        contentEl = contentContainer;
      } else {
        // fallback to nav itself
        contentEl = contentNav;
      }
    }

    // Defensive: if either is missing, skip this item
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix: ensure header row is a single cell spanning two columns
  const thead = table.querySelector('thead');
  if (thead) {
    const th = thead.querySelector('th');
    if (th) {
      th.setAttribute('colspan', '2');
    }
  }

  // Replace the original element
  element.replaceWith(table);
}
