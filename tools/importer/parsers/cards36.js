/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards36)'];
  // Get all immediate child divs (each is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Create table and header row
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = headerRow[0];
  headerTh.setAttribute('colspan', '2'); // Ensure header spans both columns
  headerTr.appendChild(headerTh);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (img) {
      const tr = document.createElement('tr');
      const tdImg = document.createElement('td');
      tdImg.appendChild(img.cloneNode(true));
      const tdText = document.createElement('td');
      // Use all available text content in the cardDiv, not just img alt
      let textContent = '';
      cardDiv.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          textContent += node.textContent.trim() + ' ';
        } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
          textContent += node.textContent.trim() + ' ';
        }
      });
      textContent = textContent.trim();
      if (!textContent) {
        textContent = img.getAttribute('alt') || '';
      }
      tdText.textContent = textContent;
      tr.appendChild(tdImg);
      tr.appendChild(tdText);
      tbody.appendChild(tr);
    }
  });
  table.appendChild(tbody);

  // Replace the original element with the block table
  element.replaceWith(table);
}
