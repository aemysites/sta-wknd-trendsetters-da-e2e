/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct child divs (each represents a column)
  const columnDivs = Array.from(element.children);
  const columns = columnDivs.map(div => {
    // Find the image inside the div
    const img = div.querySelector('img');
    if (!img) return '';
    // Create image element
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    // Add alt text below image
    const altP = document.createElement('p');
    altP.textContent = img.alt;
    // Wrap image and alt text
    const cellDiv = document.createElement('div');
    cellDiv.appendChild(imgEl);
    cellDiv.appendChild(altP);
    return cellDiv;
  });

  // Table structure: header row, then one row with one column per image
  const cells = [
    ['Columns (columns1)'],
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
