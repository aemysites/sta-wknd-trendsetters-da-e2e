/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: exactly one column
  const headerRow = ['Cards (cards35)'];

  // Get all direct child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build table rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    const imageCell = img ? img : '';

    // Extract all text content from the card div (not just img.alt)
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName !== 'IMG' &&
        node.tagName !== 'SCRIPT' &&
        node.tagName !== 'STYLE'
      ) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();

    // Use alt text as heading if present, and other text as description
    let textCell = '';
    if (img && img.alt) {
      const wrapper = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      wrapper.appendChild(heading);
      if (textContent && textContent !== img.alt) {
        const desc = document.createElement('div');
        desc.textContent = textContent;
        wrapper.appendChild(desc);
      }
      textCell = wrapper;
    } else if (textContent) {
      textCell = textContent;
    }

    return [imageCell, textCell];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix header row colspan to match two columns
  const headerTr = blockTable.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
