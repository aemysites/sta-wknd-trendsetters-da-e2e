/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout inside the section
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  const mainGrid = mainContainer.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const mainGridChildren = Array.from(mainGrid.children);
  // First two <p> elements are the heading and quote
  const heading = mainGridChildren.find(el => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const quote = mainGridChildren.find(el => el.tagName === 'P' && el.classList.contains('paragraph-lg'));

  // The third child is a nested grid containing divider, avatar+name, and logo
  const nestedGrid = mainGridChildren.find(el => el.classList.contains('w-layout-grid'));

  let leftColumn = [];
  let rightColumn = [];

  // Left column: Heading, divider, avatar, name, role
  if (heading) leftColumn.push(heading);
  if (nestedGrid) {
    // Nested grid children: divider, flex-horizontal (avatar+name+role), logo
    const nestedChildren = Array.from(nestedGrid.children);
    // Divider
    const divider = nestedChildren.find(el => el.classList.contains('divider'));
    if (divider) leftColumn.push(divider);
    // Avatar + name/role
    const flexHorizontal = nestedChildren.find(el => el.classList.contains('flex-horizontal'));
    if (flexHorizontal) {
      leftColumn.push(flexHorizontal);
    }
  }

  // Right column: Quote, logo
  if (quote) rightColumn.push(quote);
  if (nestedGrid) {
    // Logo is the last child in nested grid
    const nestedChildren = Array.from(nestedGrid.children);
    // Find logo container (contains an <img>, not avatar)
    const logoContainer = nestedChildren.find(el => {
      // Must contain an <img> but not the avatar image
      const img = el.querySelector('img');
      return img && !el.classList.contains('avatar');
    });
    if (logoContainer) rightColumn.push(logoContainer);
  }

  // Build table rows
  const headerRow = ['Columns block (columns27)'];
  const columnsRow = [leftColumn, rightColumn];

  // Create and replace
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
