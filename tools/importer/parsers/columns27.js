/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns27)'];

  // Get the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get heading and quote
  const heading = grid.querySelector('.h2-heading');
  const quote = grid.querySelector('.paragraph-lg');

  // Get subgrid for divider, author, logo
  const subGrid = grid.querySelector('.w-layout-grid:not(:first-child)');
  if (!heading || !quote || !subGrid) return;

  // Divider
  const divider = subGrid.querySelector('.divider');
  let hr = null;
  if (divider) {
    hr = document.createElement('hr');
  }

  // Author row
  const authorRow = subGrid.querySelector('.flex-horizontal');
  let authorCellContent = [];
  if (authorRow) {
    const avatarImg = authorRow.querySelector('.avatar img');
    const nameDiv = authorRow.querySelector('div > div:nth-child(1)');
    const titleDiv = authorRow.querySelector('div > div:nth-child(2)');
    if (avatarImg) authorCellContent.push(avatarImg);
    // Add a <br> between name and title for clarity
    if (nameDiv) authorCellContent.push(document.createTextNode(nameDiv.textContent));
    if (nameDiv && titleDiv) authorCellContent.push(document.createElement('br'));
    if (titleDiv) authorCellContent.push(document.createTextNode(titleDiv.textContent));
  }

  // Logo row
  const logoRow = subGrid.querySelector('.utility-display-inline-block');
  let logoCellContent = [];
  if (logoRow) {
    const logoImg = logoRow.querySelector('img');
    let logoText = '';
    logoRow.childNodes.forEach((node) => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        logoText += node.textContent.trim();
      }
    });
    if (logoImg && logoText) {
      logoCellContent = [logoImg, document.createTextNode(logoText)];
    } else if (logoImg) {
      logoCellContent = [logoImg];
    } else if (logoText) {
      logoCellContent = [document.createTextNode(logoText)];
    }
  }

  // Compose column cells as per screenshot: upper and lower content grouped per column
  const leftColumn = [heading];
  if (hr) leftColumn.push(hr);
  if (authorCellContent.length) leftColumn.push(...authorCellContent);

  const rightColumn = [quote];
  if (hr) rightColumn.push(hr.cloneNode());
  if (logoCellContent.length) rightColumn.push(...logoCellContent);

  // Table row 2: main columns (left and right)
  const row2 = [leftColumn, rightColumn];

  // Compose table
  const cells = [headerRow, row2];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
