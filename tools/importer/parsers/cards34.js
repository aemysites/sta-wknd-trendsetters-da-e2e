/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block header
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all direct child anchors (each card is an <a> block)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Find the image (mandatory, always first child)
    const img = card.querySelector('img');

    // Find the text container (the div after the img)
    const contentDiv = img.nextElementSibling;
    if (!img || !contentDiv) return; // Defensive

    // We'll build a fragment for the text cell
    const frag = document.createDocumentFragment();

    // Tag and min read (in a horizontal flex container)
    const tagRow = contentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Clone the tagRow for preservation
      frag.append(tagRow.cloneNode(true));
    }

    // Heading (h3)
    const heading = contentDiv.querySelector('h3, .h4-heading');
    if (heading) {
      frag.append(heading.cloneNode(true));
    }

    // Description (p)
    const desc = contentDiv.querySelector('p');
    if (desc) {
      frag.append(desc.cloneNode(true));
    }

    // CTA ("Read") - find the last div in contentDiv
    // It's always a div with textContent 'Read' (not a link, but the parent <a> is the card link)
    // We'll create a link element for the CTA
    const ctaDivs = contentDiv.querySelectorAll('div');
    let ctaDiv = null;
    ctaDivs.forEach((d) => {
      if (d.textContent.trim().toLowerCase() === 'read') {
        ctaDiv = d;
      }
    });
    if (ctaDiv) {
      const cta = document.createElement('a');
      cta.href = card.href;
      cta.textContent = ctaDiv.textContent.trim();
      frag.append(cta);
    }

    // Add the row: [image, text fragment]
    rows.push([img, frag]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
