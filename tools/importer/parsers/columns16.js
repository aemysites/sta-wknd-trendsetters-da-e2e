/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div (contains all columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be: left text, contacts, image)
  const gridChildren = Array.from(grid.children);

  // Defensive: Identify each part
  let leftContent = null;
  let contactsContent = null;
  let imageContent = null;

  // Find left content (text block)
  leftContent = gridChildren.find((el) => el.querySelector('h2') && el.querySelector('h3'));
  // Find contacts (ul)
  contactsContent = gridChildren.find((el) => el.tagName === 'UL');
  // Find image
  imageContent = gridChildren.find((el) => el.tagName === 'IMG');

  // Extract all text from leftContent as a single block
  let leftText = '';
  if (leftContent) {
    leftText = Array.from(leftContent.children)
      .map((child) => child.textContent.trim())
      .filter(Boolean)
      .join('\n');
  }

  // Compose contacts cell: include icons, headings, and text
  let contactsCell = document.createElement('div');
  if (contactsContent) {
    Array.from(contactsContent.children).forEach((li) => {
      let icon = li.querySelector('img');
      let heading = li.querySelector('h4');
      let detail = li.querySelector('a, div:not([class])');
      let block = document.createElement('div');
      if (icon) block.appendChild(icon.cloneNode(true));
      if (heading) block.appendChild(document.createTextNode(heading.textContent.trim() + '\n'));
      if (detail) block.appendChild(document.createTextNode(detail.textContent.trim()));
      contactsCell.appendChild(block);
    });
  }

  // Compose image cell
  let imageCell = null;
  if (imageContent) {
    imageCell = imageContent.cloneNode(true);
  }

  // Build header row
  const headerRow = ['Columns (columns16)'];

  // Build second row: left (text), right (contacts)
  const secondRow = [leftText, contactsCell];

  // Build third row: image (left), right (contacts again for visual balance)
  const thirdRow = [imageCell, contactsCell.cloneNode(true)];

  // Compose table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
