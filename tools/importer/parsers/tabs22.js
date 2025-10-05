/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab labels from tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? getDirectChildren(tabMenu, 'a') : [];

  // 3. Get tab panes from tab content
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? getDirectChildren(tabContent, '.w-tab-pane') : [];

  // Defensive: Only proceed if we have both labels and panes
  if (tabLinks.length === 0 || tabPanes.length === 0) {
    // Remove element if empty or malformed
    element.remove();
    return;
  }

  // 4. Build rows: each row is [label, content]
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label: get the inner text of the label div (not the <a> itself)
    let labelDiv = tabLink.querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    // Tab content: get the corresponding pane
    let pane = tabPanes[idx];
    // Defensive: If pane is missing, use empty div
    let contentElem = pane ? pane.querySelector('.w-layout-grid, .grid-layout, div') || pane : document.createElement('div');
    // Return row as [label, contentElem]
    return [label, contentElem];
  });

  // 5. Compose table cells
  const cells = [headerRow, ...rows];

  // 6. Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace original element
  element.replaceWith(block);
}
