/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tag, heading, description from a card
  function extractCardContent(card) {
    const content = [];
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      const tag = tagGroup.querySelector('.tag');
      if (tag) {
        content.push(tag);
      }
    }
    // Heading (h3 preferred, fallback to h4)
    let heading = card.querySelector('h3, h4');
    if (heading) {
      content.push(heading);
    }
    // Description (p)
    const desc = card.querySelector('p');
    if (desc) {
      content.push(desc);
    }
    return content;
  }

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // First card: large feature card (image left, text right)
  const featureCard = gridChildren.find((el) => el.tagName === 'A');
  // Next: two vertical stacks of cards
  const rightColGroups = gridChildren.filter((el) => el.classList.contains('flex-horizontal'));

  // Prepare rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // Feature card (left column, big image)
  if (featureCard) {
    // Image
    const imgWrapper = featureCard.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Text content
    const textContent = extractCardContent(featureCard);
    rows.push([
      img || '',
      textContent
    ]);
  }

  // Now process the right column groups
  rightColGroups.forEach((group) => {
    // Each group contains multiple cards (A tags), possibly with dividers between them
    const cardLinks = Array.from(group.querySelectorAll('a.utility-link-content-block'));
    cardLinks.forEach((card) => {
      // Image (optional)
      const imgWrapper = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      let img = imgWrapper ? imgWrapper.querySelector('img') : null;
      // Text content
      const textContent = extractCardContent(card);
      rows.push([
        img || '',
        textContent
      ]);
    });
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
