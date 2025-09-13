/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per spec
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Find tab labels (first child div with role=tablist)
  const tabMenu = Array.from(element.children).find(
    (child) => child.getAttribute('role') === 'tablist'
  );
  // Find tab content container (second child div with role=tabpanel children)
  const tabContent = Array.from(element.children).find(
    (child) => child.classList.contains('w-tab-content')
  );

  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));
  // Get tab panes
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: ensure matching number of tabs and panes
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < tabCount; i++) {
    // Tab label: get text from the inner div (usually the label)
    let label = tabLinks[i].querySelector('div');
    // Defensive: fallback to link text if div not found
    if (!label) {
      label = document.createElement('span');
      label.textContent = tabLinks[i].textContent.trim();
    }

    // Tab content: use the main grid inside each pane
    // Defensive: if grid not found, use pane itself
    let contentGrid = tabPanes[i].querySelector('.w-layout-grid');
    let tabContentElem = contentGrid || tabPanes[i];

    rows.push([label, tabContentElem]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
