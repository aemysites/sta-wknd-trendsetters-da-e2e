/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to safely get direct children by selector
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) {
    // Defensive: fallback, do nothing if structure is unexpected
    return;
  }

  // 3. Get all tab menu links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
  // 4. Get all tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: match tabs by data-w-tab attribute
  tabLinks.forEach(link => {
    const tabLabel = link.textContent.trim();
    const tabId = link.getAttribute('data-w-tab');
    // Find corresponding pane
    const pane = tabPanes.find(p => p.getAttribute('data-w-tab') === tabId);
    if (!pane) return; // skip if not found

    // The pane's content is usually a single grid div
    // We'll use the first child (the grid) if present, else the pane itself
    let tabContentElem = null;
    const grid = pane.querySelector('.w-layout-grid');
    if (grid) {
      tabContentElem = grid;
    } else {
      // fallback: use pane itself
      tabContentElem = pane;
    }

    // Add row: [Tab Label, Tab Content]
    rows.push([
      tabLabel,
      tabContentElem
    ]);
  });

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
