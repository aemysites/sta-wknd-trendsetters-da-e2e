/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, title, description, CTA)
  function extractCardContent(card) {
    // Find image (mandatory)
    let img = card.querySelector('img');
    // Defensive: sometimes image is wrapped in a div
    if (!img) {
      const imgDiv = card.querySelector('div');
      if (imgDiv) img = imgDiv.querySelector('img');
    }
    // Find heading (h2/h3/h4)
    let heading = card.querySelector('h2, h3, h4, h5, h6');
    // Find description (first <p> after heading)
    let description = null;
    if (heading) {
      let next = heading.nextElementSibling;
      while (next) {
        if (next.tagName.toLowerCase() === 'p') {
          description = next;
          break;
        }
        next = next.nextElementSibling;
      }
    } else {
      // fallback: first <p>
      description = card.querySelector('p');
    }
    // Find CTA (button or link styled as button, or .button class)
    let cta = card.querySelector('a.button, button, .button');
    // If CTA is a div, wrap in a <span> for inline
    if (cta && cta.tagName.toLowerCase() === 'div') {
      const span = document.createElement('span');
      span.append(...cta.childNodes);
      cta = span;
    }
    // Compose text cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid containing all cards
  // Defensive: find all direct children grids (cards)
  let cards = [];
  // The first grid is the main grid
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (mainGrid) {
    // The first child is a large card (possibly an <a>), the rest are in a nested grid
    const gridChildren = Array.from(mainGrid.children);
    gridChildren.forEach(child => {
      if (child.classList.contains('w-layout-grid')) {
        // Nested grid: contains multiple cards
        Array.from(child.children).forEach(card => {
          if (card.classList.contains('utility-link-content-block')) {
            cards.push(card);
          }
        });
      } else if (child.classList.contains('utility-link-content-block')) {
        cards.push(child);
      }
    });
  }

  // Defensive: fallback if above fails
  if (cards.length === 0) {
    cards = Array.from(element.querySelectorAll('.utility-link-content-block'));
  }

  // Compose table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  cards.forEach(card => {
    const [img, textContent] = extractCardContent(card);
    // Only add row if image and text exist
    if (img && textContent.length > 0) {
      rows.push([img, textContent]);
    }
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
