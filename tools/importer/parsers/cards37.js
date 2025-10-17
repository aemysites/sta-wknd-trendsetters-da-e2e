/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tag text if present
  function extractTag(card) {
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      const tag = tagGroup.querySelector('.tag');
      if (tag) return tag;
    }
    return null;
  }

  // Helper to extract heading (h3)
  function extractHeading(card) {
    const heading = card.querySelector('h3');
    if (heading) return heading;
    return null;
  }

  // Helper to extract description (p)
  function extractDescription(card) {
    const desc = card.querySelector('p');
    if (desc) return desc;
    return null;
  }

  // Helper to extract image if present
  function extractImage(card) {
    // Look for .utility-aspect-* container then img
    const aspectDiv = card.querySelector('[class*="utility-aspect"]');
    if (aspectDiv) {
      const img = aspectDiv.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Gather all card-like items (direct children that are <a> or <div> with card links)
  const cardsWithImages = [];
  const cardsNoImages = [];

  // First card is a large feature card (first child <a>)
  const firstCard = grid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    cardsWithImages.push(firstCard);
  }

  // Next, find the flex-horizontal group (contains two cards)
  const flexGroups = grid.querySelectorAll('.flex-horizontal');
  if (flexGroups.length > 0) {
    // The first flex-horizontal contains two cards (both <a>)
    const flex1Cards = flexGroups[0].querySelectorAll('a.utility-link-content-block');
    flex1Cards.forEach(card => {
      // Only push if image exists
      if (extractImage(card)) {
        cardsWithImages.push(card);
      } else {
        cardsNoImages.push(card);
      }
    });
    // The second flex-horizontal contains only text cards separated by dividers
    if (flexGroups.length > 1) {
      const flex2 = flexGroups[1];
      // Only select <a> elements (cards)
      const textCards = flex2.querySelectorAll('a.utility-link-content-block');
      textCards.forEach(card => cardsNoImages.push(card));
    }
  }

  // Build table rows for cards with images
  const rowsWithImages = [];
  rowsWithImages.push(['Cards (cards37)']);
  cardsWithImages.forEach(card => {
    const img = extractImage(card);
    const imageCell = img ? img : '';
    const tag = extractTag(card);
    const heading = extractHeading(card);
    const desc = extractDescription(card);
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (textCellContent.length === 0) {
      textCellContent.push(card.textContent.trim());
    }
    rowsWithImages.push([
      imageCell,
      textCellContent
    ]);
  });

  // Build table rows for cards without images (no images variant)
  const rowsNoImages = [];
  rowsNoImages.push(['Cards (cards37) (no images)']);
  cardsNoImages.forEach(card => {
    const tag = extractTag(card);
    const heading = extractHeading(card);
    const desc = extractDescription(card);
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (textCellContent.length === 0) {
      textCellContent.push(card.textContent.trim());
    }
    rowsNoImages.push([
      textCellContent
    ]);
  });

  // Create tables and replace element
  const tables = [];
  if (rowsWithImages.length > 1) {
    tables.push(WebImporter.DOMUtils.createTable(rowsWithImages, document));
  }
  if (rowsNoImages.length > 1) {
    tables.push(WebImporter.DOMUtils.createTable(rowsNoImages, document));
  }

  if (tables.length === 1) {
    element.replaceWith(tables[0]);
  } else if (tables.length > 1) {
    const wrapper = document.createElement('div');
    tables.forEach(table => wrapper.appendChild(table));
    element.replaceWith(wrapper);
  }
}
