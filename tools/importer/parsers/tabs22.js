/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: ensure both exist
  if (!tabMenu || !tabContent) {
    element.replaceWith(WebImporter.DOMUtils.createTable(rows, document));
    return;
  }

  // 3. Get tab labels
  // Each tab label is a .w-tab-link inside tabMenu
  const tabLinks = tabMenu.querySelectorAll('.w-tab-link');

  // 4. Get tab panes (content)
  // Each tab pane is a .w-tab-pane inside tabContent
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // 5. Build rows for each tab
  tabLinks.forEach((tabLink, i) => {
    // Tab label: get the text content from the child div
    let tabLabel = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }

    // Tab content: find the corresponding tab pane by index
    const tabPane = tabPanes[i];
    let tabContentCell;
    if (tabPane) {
      // Use the grid inside the tab pane as the content block
      const grid = tabPane.querySelector('.w-layout-grid');
      tabContentCell = grid ? grid : tabPane;
    } else {
      tabContentCell = document.createElement('div');
      tabContentCell.textContent = '';
    }

    rows.push([tabLabel, tabContentCell]);
  });

  // 6. Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
