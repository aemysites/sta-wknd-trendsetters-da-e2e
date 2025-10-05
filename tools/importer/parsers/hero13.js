/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header Row
  const headerRow = ['Hero (hero13)'];

  // 2. Background Image Row
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const bgImgCandidate = gridDivs[0].querySelector('img');
    if (bgImgCandidate) bgImg = bgImgCandidate.cloneNode(true);
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content Row (headline, subheading, CTA, and all text content)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        const contentArr = [];
        // Headline
        const headline = cardBody.querySelector('h2');
        if (headline) contentArr.push(headline.cloneNode(true));
        // All subpoints (all <p> inside .flex-horizontal.flex-gap-xxs)
        const subpointRows = cardBody.querySelectorAll('.flex-horizontal.flex-gap-xxs');
        subpointRows.forEach(row => {
          // include icon and p together
          const rowClone = row.cloneNode(true);
          contentArr.push(rowClone);
        });
        // CTA button
        const cta = cardBody.querySelector('.button-group a');
        if (cta) contentArr.push(cta.cloneNode(true));
        // Compose content cell
        if (contentArr.length > 0) {
          const wrapper = document.createElement('div');
          contentArr.forEach(n => wrapper.appendChild(n));
          contentCell = wrapper;
        } else {
          contentCell = '';
        }
      }
    }
  }
  // Always include the third row, even if contentCell is empty
  // FIX: Only include the third row if there is content, otherwise omit it
  const rows = [headerRow, bgImgRow];
  if (contentCell && (typeof contentCell === 'string' ? contentCell.trim() !== '' : contentCell.childNodes.length > 0)) {
    rows.push([contentCell]);
  }

  // 4. Assemble Table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(table);
}
