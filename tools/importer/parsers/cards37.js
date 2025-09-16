/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card
  function getCardImage(card) {
    // Find the first img element inside the card
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content from a card
  function getCardText(card) {
    const fragments = [];
    // Heading (h2, h3, h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) fragments.push(heading);
    // Paragraph
    const paragraph = card.querySelector('p');
    if (paragraph) fragments.push(paragraph);
    // Button or CTA (could be a div with class 'button')
    const button = card.querySelector('.button');
    if (button) fragments.push(button);
    return fragments.length ? fragments : '';
  }

  // Find all card containers (utility-link-content-block)
  const cardLinks = Array.from(element.querySelectorAll('.utility-link-content-block'));

  // Table header: block name as required
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  cardLinks.forEach(card => {
    const img = getCardImage(card);
    const textContent = getCardText(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
