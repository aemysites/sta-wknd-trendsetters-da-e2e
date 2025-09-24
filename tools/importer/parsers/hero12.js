/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid columns
  const gridDivs = element.querySelectorAll(':scope > div');

  // Background image: first .cover-image.utility-position-absolute in first grid column
  let bgImg = null;
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img.cover-image.utility-position-absolute');
  }

  // Main content: headline, subheading, CTA, etc. (second grid column)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      // Create a fragment to hold all content
      const frag = document.createDocumentFragment();
      // Headline (h2)
      const h2 = cardBody.querySelector('h2');
      if (h2) frag.appendChild(h2.cloneNode(true));
      // All .flex-horizontal rows (icon + text)
      cardBody.querySelectorAll('.flex-horizontal').forEach(row => {
        // Icon (svg img)
        const icon = row.querySelector('.icon-small img');
        // Text
        const text = row.querySelector('p');
        // Compose row content
        if (icon || text) {
          const rowDiv = document.createElement('div');
          if (icon) rowDiv.appendChild(icon.cloneNode(true));
          if (text) rowDiv.appendChild(text.cloneNode(true));
          frag.appendChild(rowDiv);
        }
      });
      // CTA button(s)
      cardBody.querySelectorAll('.button-group a').forEach(a => {
        frag.appendChild(a.cloneNode(true));
      });
      // Assign all content (including all text)
      if (frag.childNodes.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.appendChild(frag);
        contentCell = wrapper;
      }
    }
  }

  // Table rows
  const headerRow = ['Hero (hero12)'];
  const bgRow = [bgImg ? bgImg : ''];
  // Always produce 3 rows: header, bg, content (content cell is empty string if no content)
  const rows = [headerRow, bgRow, [contentCell]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
