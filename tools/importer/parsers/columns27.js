/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns27)'];

  // Get the main grid that contains the two main columns (heading and testimonial)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get heading and testimonial
  const mainCols = Array.from(grid.children).filter(child => child.tagName === 'P');
  const leftCol = mainCols[0]; // Heading
  const rightCol = mainCols[1]; // Testimonial

  // Get the divider element
  let divider = grid.querySelector('.divider');
  let dividerCell = '';
  if (divider) {
    dividerCell = document.createElement('hr');
  }

  // Get the avatar/name/title and logo
  let avatarCell = '', logoCell = '';
  const flexRow = grid.querySelector('.flex-horizontal.y-center.flex-gap-xs');
  if (flexRow) {
    const flexChildren = Array.from(flexRow.children);
    // Avatar
    const avatarDiv = flexChildren[0];
    // Name/title
    const nameTitleDiv = flexChildren[1];
    if (avatarDiv && nameTitleDiv) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(avatarDiv.cloneNode(true));
      wrapper.appendChild(nameTitleDiv.cloneNode(true));
      avatarCell = wrapper;
    }
  }
  // Logo cell
  const logoDiv = grid.querySelector('.utility-display-inline-block.utility-margin-left-auto');
  if (logoDiv) {
    logoCell = logoDiv.cloneNode(true);
    // Ensure logo text is included if present
    const logoText = logoDiv.textContent.trim();
    if (logoText) {
      const logoWrapper = document.createElement('div');
      logoWrapper.appendChild(logoCell);
      logoWrapper.appendChild(document.createTextNode(logoText));
      logoCell = logoWrapper;
    }
  }

  // Correct row structure:
  // First content row: heading, testimonial
  const firstContentRow = [leftCol ? leftCol.cloneNode(true) : '', rightCol ? rightCol.cloneNode(true) : ''];
  // Divider row: divider spanning both columns
  const dividerRow = [dividerCell, dividerCell ? dividerCell.cloneNode(true) : ''];
  // Second content row: avatar+text, logo
  const secondContentRow = [avatarCell, logoCell];

  const cells = [
    headerRow,
    firstContentRow,
    dividerRow,
    secondContentRow
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
