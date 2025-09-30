/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  const getImmediateDivs = (parent) => Array.from(parent.children).filter((el) => el.tagName === 'DIV');

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  const divs = getImmediateDivs(element);
  if (divs.length < 2) {
    // Defensive: not enough children
    return;
  }
  const tabMenu = divs[0];
  const tabContent = divs[1];

  // 3. Get tab labels (in order)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // 4. Get tab panes (in order)
  const tabPanes = Array.from(tabContent.querySelectorAll('div.w-tab-pane'));

  // Defensive: ensure matching number of tabs and panes
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < tabCount; i++) {
    // Tab label: get the text content of the inner div (if present), fallback to link text
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }

    // Tab content: find the first grid-layout inside the pane (as in source)
    let content = null;
    const grid = tabPanes[i].querySelector('.grid-layout');
    if (grid) {
      content = grid;
    } else {
      // fallback: use all children of the pane
      content = document.createElement('div');
      Array.from(tabPanes[i].children).forEach(child => content.appendChild(child.cloneNode(true)));
    }

    rows.push([label, content]);
  }

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
