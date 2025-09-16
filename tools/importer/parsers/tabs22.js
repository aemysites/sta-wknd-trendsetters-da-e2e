/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for tab menu and tab content containers
  const tabMenu = Array.from(element.children).find(el => el.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(el => el.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get tab panes
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Build rows: each tab = [label, content]
  const rows = tabLinks.map((tabLink, i) => {
    // Defensive: get label text from child div or fallback to textContent
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Defensive: get tab pane content
    let content = '';
    if (tabPanes[i]) {
      // Use the entire inner grid as content
      const grid = tabPanes[i].querySelector('.w-layout-grid');
      content = grid ? grid : tabPanes[i];
    }
    return [label, content];
  });

  // Table header
  const headerRow = ['Tabs (tabs22)'];
  const cells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
