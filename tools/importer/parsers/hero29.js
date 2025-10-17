/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  // CRITICAL: Use the target block name exactly
  const headerRow = ['Hero (hero29)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the first <img> in the element (background image)
  const img = element.querySelector('img');
  // Reference the actual image element, do not clone or use src directly
  const imageRow = [img ? img : ''];

  // --- CONTENT ROW ---
  // Find the main heading (h1)
  const heading = element.querySelector('h1');
  // Use the actual heading element, preserving its semantic meaning
  // No subheading or CTA present in this example
  const contentRow = [heading ? heading : ''];

  // --- BUILD TABLE ---
  // Create the table with 1 column and 3 rows, matching the markdown example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
