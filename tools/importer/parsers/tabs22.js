/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children with selector
  const getDirectChildren = (parent, selector) => {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  };

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Get tab labels and tab content panes
  // Find tab menu and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Defensive: If structure is missing, don't replace
    return;
  }

  // Get tab menu links (labels)
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // Get tab panes (content)
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Defensive: Only process matching pairs
  const numTabs = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < numTabs; i++) {
    // Tab label: Use the inner text of the menu link's child div
    let tabLabel = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLinks[i].textContent.trim();
    }

    // Tab content: Use the entire tab pane's main grid content
    // Find the first grid-layout inside the tab pane
    const gridContent = tabPanes[i].querySelector('.grid-layout');
    let tabContentCell;
    if (gridContent) {
      tabContentCell = gridContent;
    } else {
      // Fallback: use entire tab pane
      tabContentCell = tabPanes[i];
    }

    rows.push([tabLabel, tabContentCell]);
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
