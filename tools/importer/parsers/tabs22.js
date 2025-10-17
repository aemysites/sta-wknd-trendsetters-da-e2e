/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu (tab headers)
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  // Find tab content container (tab panels)
  const tabContent = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));

  // Defensive: If missing, abort
  if (!tabMenu || !tabContent) return;

  // Get tab header elements (anchors or buttons)
  const tabHeaderEls = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  // Get tab content panels (direct children with role="tabpanel")
  const tabPanels = Array.from(tabContent.children).filter(
    child => child.getAttribute('role') === 'tabpanel'
  );

  // Build rows: First row is always header
  const rows = [['Tabs (tabs22)']];

  // For each tab, extract label and content
  for (let i = 0; i < tabHeaderEls.length; i++) {
    const headerEl = tabHeaderEls[i];
    // Tab label: Use textContent of the inner div (if present), fallback to anchor text
    let tabLabel = '';
    const labelDiv = headerEl.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = headerEl.textContent.trim();
    }

    // Tab content: Find panel with matching data-w-tab
    const tabName = headerEl.getAttribute('data-w-tab');
    const panel = tabPanels.find(p => p.getAttribute('data-w-tab') === tabName);
    let tabContentCell;
    if (panel) {
      // Use the entire content grid inside the panel
      // Defensive: Find the grid div inside the panel (usually first child)
      const grid = panel.querySelector('.w-layout-grid') || panel.firstElementChild || panel;
      tabContentCell = grid;
    } else {
      tabContentCell = document.createElement('div');
      tabContentCell.textContent = '';
    }
    rows.push([tabLabel, tabContentCell]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
