/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardLink) {
    // Find the image (mandatory)
    const imgWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Find the text content container
    const textContainer = cardLink.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, as a label above title)
      const tag = textContainer.querySelector('.tag');
      if (tag) {
        // Wrap tag in a <p> for spacing/semantics
        const tagP = document.createElement('p');
        tagP.append(tag.cloneNode(true));
        textContent.push(tagP);
      }
      // Title (h3)
      const title = textContainer.querySelector('h3');
      if (title) {
        textContent.push(title.cloneNode(true));
      }
      // Description (p)
      // Only select <p> that are not inside .tag-group
      const paragraphs = Array.from(textContainer.querySelectorAll('p'));
      paragraphs.forEach((p) => {
        if (!p.closest('.tag-group')) {
          textContent.push(p.cloneNode(true));
        }
      });
    }
    // If no text content, fallback to cardLink text
    if (textContent.length === 0) {
      textContent.push(document.createTextNode(cardLink.textContent.trim()));
    }
    return [img, textContent];
  }

  // Get all card links (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];
  cards.forEach((cardLink) => {
    const [img, textContent] = extractCardContent(cardLink);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
