/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a node
  function getDirectChildren(parent, selector = '*') {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find the main grid layout containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid-layout inside container is the main 2-column block
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid (should be 2 <p> and 1 inner grid)
  const mainGridChildren = getDirectChildren(mainGrid);
  // Defensive: Find the heading, quote, and the lower grid
  const heading = mainGridChildren.find((el) => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const quote = mainGridChildren.find((el) => el.tagName === 'P' && el.classList.contains('paragraph-lg'));
  const lowerGrid = mainGridChildren.find((el) => el.classList.contains('grid-layout'));

  // Lower grid: divider, flex-horizontal (avatar + name), and logo
  let avatarBlock = null;
  let logoBlock = null;
  if (lowerGrid) {
    const lowerChildren = getDirectChildren(lowerGrid);
    // Find the flex-horizontal (avatar + name)
    const flex = lowerChildren.find((el) => el.classList.contains('flex-horizontal'));
    // Find the logo (img inside .utility-display-inline-block)
    const logoContainer = lowerChildren.find((el) => el.classList.contains('utility-display-inline-block'));
    if (flex) {
      avatarBlock = flex;
    }
    if (logoContainer) {
      logoBlock = logoContainer;
    }
  }

  // Compose left and right columns
  // Left: heading, avatarBlock
  // Right: quote, logoBlock
  const leftColumn = [];
  if (heading) leftColumn.push(heading);
  if (avatarBlock) leftColumn.push(avatarBlock);

  const rightColumn = [];
  if (quote) rightColumn.push(quote);
  if (logoBlock) rightColumn.push(logoBlock);

  // Table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftColumn, rightColumn];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace element
  element.replaceWith(table);
}
