/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns (left: text, right: image)
  const columns = Array.from(grid.children).filter(child => child.tagName === 'DIV');
  if (columns.length < 2) return;

  // --- Extract left column content (flattened, semantic) ---
  const leftCol = columns[0];
  // Breadcrumbs
  const breadcrumbDiv = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  let breadcrumbs = '';
  if (breadcrumbDiv) {
    const links = breadcrumbDiv.querySelectorAll('a');
    breadcrumbs = Array.from(links).map(a => a.textContent.trim()).join(' > ');
  }
  // Heading
  const heading = leftCol.querySelector('h2')?.textContent.trim() || '';
  // Author
  const author = leftCol.querySelector('.utility-margin-bottom-1rem .flex-horizontal.flex-gap-xxs .paragraph-sm.utility-margin-bottom-0:last-child')?.textContent.trim() || '';
  // Date and read time
  const dateDivs = leftCol.querySelectorAll('.utility-margin-bottom-1rem .utility-margin-top-0-5rem .paragraph-sm.utility-text-secondary');
  let date = '';
  let readTime = '';
  if (dateDivs.length >= 3) {
    date = dateDivs[0].textContent.trim();
    readTime = dateDivs[2].textContent.trim();
  }
  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');
  let socialLinks = [];
  if (socialList) {
    socialLinks = Array.from(socialList.querySelectorAll('a')).map(a => {
      const label = a.querySelector('.utility-screen-reader-visible-only')?.textContent.trim();
      return label || '';
    });
  }
  // Compose left cell content
  const leftCell = document.createElement('div');
  if (breadcrumbs) {
    const bc = document.createElement('div');
    bc.textContent = breadcrumbs;
    leftCell.appendChild(bc);
  }
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading;
    leftCell.appendChild(h);
  }
  if (author) {
    const a = document.createElement('div');
    a.textContent = `By ${author}`;
    leftCell.appendChild(a);
  }
  if (date || readTime) {
    const d = document.createElement('div');
    d.textContent = `${date}${date && readTime ? ' • ' : ''}${readTime}`;
    leftCell.appendChild(d);
  }
  if (socialLinks.length) {
    const s = document.createElement('div');
    s.textContent = socialLinks.join(' | ');
    leftCell.appendChild(s);
  }

  // --- Extract right column image ---
  const rightCol = columns[1];
  const img = rightCol.querySelector('img');
  let rightCell = '';
  if (img) {
    rightCell = img.cloneNode(true);
  }

  // --- Build the table rows ---
  const headerRow = ['Columns block (columns32)'];
  const tableRows = [headerRow, [leftCell, rightCell]];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
