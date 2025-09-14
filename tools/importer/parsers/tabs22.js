/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) return;

  // Get tab labels (in order)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));
  // Get tab panes (in order)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Always use the required block name as header
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: use the text content of the tab link (prefer child div if present)
    let label = tabLinks[i].textContent.trim();
    if (!label && tabLinks[i].firstElementChild) {
      label = tabLinks[i].firstElementChild.textContent.trim();
    }

    // Tab content: reference the main content div inside the pane (usually first child)
    let contentElem = tabPanes[i].firstElementChild || tabPanes[i];

    // Always reference the existing DOM node (do not clone)
    rows.push([label, contentElem]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
