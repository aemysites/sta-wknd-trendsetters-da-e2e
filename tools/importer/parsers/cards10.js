/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Find the image (mandatory)
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imgWrapper) {
      image = imgWrapper.querySelector('img');
    }

    // Find the text content wrapper
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textWrapper) {
      // Tag (optional, as a label above heading)
      const tag = textWrapper.querySelector('.tag');
      if (tag) {
        // Clone the tag to avoid moving it from the DOM
        const tagClone = tag.cloneNode(true);
        textContent.push(tagClone);
      }
      // Heading (mandatory)
      const heading = textWrapper.querySelector('h3, .h4-heading');
      if (heading) {
        const headingClone = heading.cloneNode(true);
        textContent.push(headingClone);
      }
      // Description (optional)
      const desc = textWrapper.querySelector('p');
      if (desc) {
        const descClone = desc.cloneNode(true);
        textContent.push(descClone);
      }
      // Call-to-Action (optional, use card link if not just '#')
      // Only add CTA if the card link's href is not just '#' and not empty
      if (card.href && card.href !== '#' && card.href !== window.location.href) {
        // Use the heading as CTA label if possible, else fallback
        let ctaLabel = 'Learn more';
        if (heading && heading.textContent) {
          ctaLabel = heading.textContent.trim();
        }
        const cta = document.createElement('a');
        cta.href = card.href;
        cta.textContent = ctaLabel;
        cta.className = 'card-cta';
        textContent.push(cta);
      }
    }

    // Add the row: [image, textContent]
    // Defensive: if no image, use null; if no text, use empty string
    rows.push([
      image || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
