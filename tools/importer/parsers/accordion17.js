/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare rows: header row must be a single cell spanning two columns
  const rows = [];

  // Create header row with colspan=2
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Accordion (accordion17)';
  headerCell.setAttribute('colspan', '2');
  const headerRow = document.createElement('tr');
  headerRow.appendChild(headerCell);
  rows.push(headerRow);

  // Find all accordion items
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title cell
    let titleCell = document.createElement('td');
    const toggle = item.querySelector('[role="button"]');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell.appendChild(titleDiv.cloneNode(true));
      } else {
        titleCell.appendChild(toggle.cloneNode(true));
      }
    }
    // Content cell
    let contentCell = document.createElement('td');
    const contentNav = item.querySelector('nav.accordion-content');
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text.w-richtext');
      if (richText) {
        contentCell.appendChild(richText.cloneNode(true));
      } else {
        contentCell.appendChild(contentNav.cloneNode(true));
      }
    }
    // Build row
    const row = document.createElement('tr');
    row.appendChild(titleCell);
    row.appendChild(contentCell);
    rows.push(row);
  });

  // Build table manually
  const table = document.createElement('table');
  rows.forEach((row) => table.appendChild(row));

  // Replace the original element
  element.replaceWith(table);
}
