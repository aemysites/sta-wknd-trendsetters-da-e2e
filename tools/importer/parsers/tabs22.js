/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Defensive: fallback, don't replace if structure is not as expected
    return;
  }

  // 3. Get tab labels (menu)
  // Each tab is an <a> with a <div> inside (label)
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // 4. Get tab panes (content)
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Defensive: match tabs by order
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < tabCount; i++) {
    const tabLink = tabLinks[i];
    // Label: get text content of the inner div, fallback to link text
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Content: get the main content inside the pane
    const pane = tabPanes[i];
    // Defensive: if pane is empty, skip
    if (!pane) continue;
    // Use the first child of the pane as the content block (usually a grid)
    let contentBlock = null;
    if (pane.children.length === 1) {
      contentBlock = pane.firstElementChild;
    } else {
      // fallback: wrap all children in a fragment
      contentBlock = document.createElement('div');
      Array.from(pane.children).forEach(child => contentBlock.appendChild(child.cloneNode(true)));
    }
    rows.push([label, contentBlock]);
  }

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
