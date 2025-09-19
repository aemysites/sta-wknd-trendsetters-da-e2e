/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab labels
  // The first child div is the tab menu
  const tabMenuDiv = getDirectChildren(element, 'div')[0];
  // Each tab label is inside an <a> with a <div> inside
  const tabLinks = getDirectChildren(tabMenuDiv, 'a');
  const tabLabels = tabLinks.map(a => {
    // Defensive: find the label div inside each tab link
    const labelDiv = a.querySelector('div');
    // If labelDiv exists, use it, otherwise fallback to text
    return labelDiv ? labelDiv.textContent.trim() : a.textContent.trim();
  });

  // 3. Get tab content panes
  // The second child div is the tab content container
  const tabContentDiv = getDirectChildren(element, 'div')[1];
  // Each pane is a direct child div of tabContentDiv
  const tabPanes = getDirectChildren(tabContentDiv, 'div');

  // 4. For each tab, build a row: [label, content]
  const rows = tabLabels.map((label, i) => {
    // Defensive: get the pane for this tab
    const pane = tabPanes[i];
    // For content, use the grid div inside each pane
    let contentDiv = null;
    if (pane) {
      // Find the grid-layout div inside the pane
      contentDiv = getDirectChildren(pane, 'div').find(div => div.classList.contains('grid-layout'));
    }
    // If no contentDiv, fallback to pane itself
    const tabContent = contentDiv || pane || document.createElement('div');
    return [label, tabContent];
  });

  // 5. Assemble table data
  const tableData = [headerRow, ...rows];

  // 6. Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // 7. Replace original element
  element.replaceWith(blockTable);
}
