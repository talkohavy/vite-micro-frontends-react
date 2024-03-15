// REGISTER ERROR OVERLAY
function ReactErrorOverlay(error) {
  // must be within function call because that's when the element is defined for sure.
  const ErrorOverlay = customElements.get('vite-error-overlay');
  // don't open outside vite environment

  if (!ErrorOverlay) return;

  console.log(error);

  const overlay = new ErrorOverlay(error);
  document.body.appendChild(overlay);
}

export default ReactErrorOverlay;
