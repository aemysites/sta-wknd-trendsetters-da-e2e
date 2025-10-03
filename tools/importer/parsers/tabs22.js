/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to defensively get direct children by selector
  const getDirectChildren = (parent, selector) => {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  };

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab labels and tab content panes
  // Tab menu: first child div with role="tablist"
  const tabMenu = element.querySelector('[role="tablist"]');
  // Tab content: second child div with class w-tab-content
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Defensive: if structure is unexpected, remove element and return
    element.replaceWith(WebImporter.DOMUtils.createTable([headerRow], document));
    return;
  }

  // Get all tab links (labels)
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // Get all tab panes (content)
  const tabPanes = getDirectChildren(tabContent, 'div');

  // Defensive: ensure we have matching number of tabs and panes
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  // Build rows: each row is [label, content]
  const rows = [];
  for (let i = 0; i < tabCount; i++) {
    // Tab label: use the inner text of the label div inside the link
    const labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: use the entire grid inside the pane
    // Defensive: find the grid div inside each pane
    const grid = tabPanes[i].querySelector('.grid-layout');
    let content = grid || tabPanes[i]; // fallback to pane if grid missing
    rows.push([label, content]);
  }

  // Compose table: header + tab rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
