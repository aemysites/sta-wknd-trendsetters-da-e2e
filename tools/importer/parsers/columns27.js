/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (el) => Array.from(el.children).filter(child => child.tagName === 'DIV');

  // Find the main grid inside the section
  const container = element.querySelector('.container');
  if (!container) return;

  // The main grid that holds the two columns
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const mainGridChildren = Array.from(mainGrid.children);

  // Defensive: find the first two <p> (heading and quote)
  const heading = mainGridChildren.find(el => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const quote = mainGridChildren.find(el => el.tagName === 'P' && el.classList.contains('paragraph-lg'));

  // The nested grid with divider, avatar, name, and logo
  const nestedGrid = mainGridChildren.find(el => el.classList.contains('w-layout-grid'));
  let divider = null, avatarBlock = null, logoBlock = null;
  if (nestedGrid) {
    const nestedChildren = Array.from(nestedGrid.children);
    divider = nestedChildren.find(el => el.classList.contains('divider'));
    avatarBlock = nestedChildren.find(el => el.classList.contains('flex-horizontal'));
    logoBlock = nestedChildren.find(el => el.classList.contains('utility-display-inline-block'));
  }

  // Build left column: heading, avatar/name/title
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (divider) leftCol.appendChild(divider);
  if (avatarBlock) leftCol.appendChild(avatarBlock);

  // Build right column: quote, logo
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (divider && !leftCol.contains(divider)) rightCol.appendChild(divider); // Defensive
  if (logoBlock) rightCol.appendChild(logoBlock);

  // Table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
