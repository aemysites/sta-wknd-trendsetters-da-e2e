/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract tab labels from the tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('a') : [];

  // 2. Extract tab panes (content)
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // 3. Prepare table rows
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Only process as many tabs as exist in both menu and content
  const numTabs = Math.min(tabLinks.length, tabPanes.length);
  for (let i = 0; i < numTabs; i++) {
    // Tab label: get text from child div if present, else from link
    let label = '';
    const menuLink = tabLinks[i];
    const labelDiv = menuLink.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : menuLink.textContent.trim();

    // Tab content: use the grid inside the pane if available
    const pane = tabPanes[i];
    const grid = pane.querySelector('.grid-layout');
    // Use the grid element directly (reference, not clone)
    const contentElem = grid || pane;

    rows.push([label, contentElem]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
