/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify content blocks
  const textBlock = gridChildren.find(el => el.tagName === 'DIV' && el.querySelector('h2') && el.querySelector('h3'));
  const contactList = gridChildren.find(el => el.tagName === 'UL');
  const imageBlock = gridChildren.find(el => el.tagName === 'IMG');

  // Compose left column: text block (all child nodes)
  let leftCell = [];
  if (textBlock) {
    leftCell = Array.from(textBlock.childNodes).filter(node => {
      // Exclude empty text nodes
      return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
    });
  }

  // Compose right column: contact list (as is)
  let rightCell = [];
  if (contactList) {
    rightCell = [contactList];
  }

  // Compose image row: image in left cell only
  let imgCell = [];
  if (imageBlock) {
    imgCell = [imageBlock];
  }

  // Table structure: header, content, image row (image row only has one column)
  const headerRow = ['Columns (columns9)'];
  const contentRow = [leftCell, rightCell];
  const imageRow = [imgCell]; // Only one column for the image row

  const cells = [headerRow, contentRow, imageRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
