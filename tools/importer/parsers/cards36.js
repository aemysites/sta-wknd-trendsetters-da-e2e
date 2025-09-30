/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    let img = cardAnchor.querySelector('img');
    let tagGroup = cardAnchor.querySelector('.tag-group');
    let heading = cardAnchor.querySelector('h3');
    let desc = cardAnchor.querySelector('p');
    const textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    return [img, textCell.filter(Boolean)];
  }

  // Helper to extract card info from a text-only card anchor
  function extractTextCardInfo(cardAnchor) {
    let heading = cardAnchor.querySelector('h3');
    let desc = cardAnchor.querySelector('p');
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    // Instead of [null, ...], use ["", ...] so the cell is empty
    return ["", textCell.filter(Boolean)];
  }

  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const cardAnchors = Array.from(grid.querySelectorAll(':scope > a.utility-link-content-block'));
  const firstCard = cardAnchors[0];

  const flexHoriz1 = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  let flex1Cards = [];
  if (flexHoriz1) {
    flex1Cards = Array.from(flexHoriz1.querySelectorAll(':scope > a.utility-link-content-block'));
  }

  const flexHoriz2 = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[1];
  let flex2Cards = [];
  if (flexHoriz2) {
    flex2Cards = Array.from(flexHoriz2.querySelectorAll(':scope > a.utility-link-content-block'));
  }

  const rows = [];
  rows.push(['Cards (cards36)']);

  if (firstCard) {
    const [img, textCell] = extractCardInfo(firstCard);
    rows.push([img, textCell]);
  }

  flex1Cards.forEach(card => {
    const [img, textCell] = extractCardInfo(card);
    rows.push([img, textCell]);
  });

  flex2Cards.forEach(card => {
    const [img, textCell] = extractTextCardInfo(card);
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
