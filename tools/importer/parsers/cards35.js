/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required by block spec: exactly one column, matching data rows
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Cards (cards35)';
  headerTr.appendChild(th1);
  const th2 = document.createElement('th'); // empty second column for structural consistency
  headerTr.appendChild(th2);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  // Each card is a child div containing an image
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      // Remove empty width/height attributes for cleanliness
      if (img.hasAttribute('width') && img.getAttribute('width') === '') img.removeAttribute('width');
      if (img.hasAttribute('height') && img.getAttribute('height') === '') img.removeAttribute('height');
      const tr = document.createElement('tr');
      const tdImg = document.createElement('td');
      tdImg.appendChild(img.cloneNode(true));
      const tdText = document.createElement('td');
      // Instead of just alt text, include all text content from cardDiv
      let textContent = '';
      cardDiv.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          textContent += node.textContent.trim() + ' ';
        }
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
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
  element.replaceWith(table);
}
