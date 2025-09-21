/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If missing, abort
  if (!tabMenu || !tabContent) return;

  // 3. Get tab labels
  const tabLinks = tabMenu.querySelectorAll('a.w-tab-link');

  // 4. Get tab panes (contents)
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Defensive: If mismatch, abort
  if (tabLinks.length !== tabPanes.length) return;

  // 5. Build rows: [label, content]
  const rows = [];
  tabLinks.forEach((tabLink, i) => {
    // Tab label: Use inner text of the label div inside the link
    const labelDiv = tabLink.querySelector('div');
    const tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();

    // Tab content: Use the grid inside the pane (h3 + img)
    const pane = tabPanes[i];
    let tabContentCell;
    const grid = pane.querySelector('.w-layout-grid');
    if (grid) {
      // Use the grid element directly for resilience
      tabContentCell = grid;
    } else {
      // Fallback: use pane itself
      tabContentCell = pane;
    }
    rows.push([tabLabel, tabContentCell]);
  });

  // 6. Assemble table data
  const tableData = [headerRow, ...rows];

  // 7. Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 8. Replace original element
  element.replaceWith(block);
}
