/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const getChildren = (el, selector = ':scope > *') => Array.from(el.querySelectorAll(selector));

  // Find the main container (usually with class 'container')
  let container = element.querySelector('.container');
  if (!container) container = element;

  // Find the grid layout (main content)
  let grid = container.querySelector('.grid-layout');
  if (!grid) grid = container;

  // Get all direct children of the grid
  const gridChildren = getChildren(grid);

  // Defensive: find the heading and paragraph
  const heading = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const paragraph = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('paragraph-lg'));

  // Find the nested grid (for divider, avatar, name/title, logo)
  const nestedGrid = gridChildren.find((el) => el.classList.contains('w-layout-grid') && el !== grid);
  let divider = null;
  let avatar = null;
  let nameTitle = null;
  let logo = null;
  if (nestedGrid) {
    const nestedChildren = getChildren(nestedGrid);
    divider = nestedChildren.find((el) => el.classList.contains('divider'));
    // Find the flex-horizontal (avatar, name/title)
    const flexRow = nestedChildren.find((el) => el.classList.contains('flex-horizontal'));
    if (flexRow) {
      const flexChildren = getChildren(flexRow);
      avatar = flexChildren.find((el) => el.classList.contains('avatar'));
      // Name/title block (usually a div with two children)
      nameTitle = flexChildren.find((el) => !el.classList.contains('avatar') && getChildren(el).length === 2);
    }
    // Logo (last child, contains an img)
    logo = nestedChildren.find((el) => el.querySelector('img') && el.classList.contains('utility-display-inline-block'));
  }

  // Compose left column: heading, divider, avatar, name/title
  const leftCol = [];
  if (heading) leftCol.push(heading);
  if (divider) leftCol.push(divider);
  if (avatar) leftCol.push(avatar);
  if (nameTitle) leftCol.push(nameTitle);

  // Compose right column: paragraph, logo
  const rightCol = [];
  if (paragraph) rightCol.push(paragraph);
  if (logo) rightCol.push(logo);

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Second row: two columns (left, right)
  const secondRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
