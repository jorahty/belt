export default function applyCSS() {
  const htmlElement = window.document.documentElement;
  const bodyElement = window.document.body;

  htmlElement.style.background = '#000';

  htmlElement.style.height = '100%';
  htmlElement.style.margin = '0';
  bodyElement.style.height = '100%';
  bodyElement.style.margin = '0';
  bodyElement.style.overflow = 'hidden';
  bodyElement.style.touchAction = 'none';

  htmlElement.style.userSelect = 'none';

  // Create a <style> element
  const styleElement = window.document.createElement('style');

  // Define the CSS rule
  const cssCode =
    'html { -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; -webkit-text-size-adjust: none; }';

  // For modern browsers
  styleElement.appendChild(document.createTextNode(cssCode));

  // Add the <style> element to the <head> section
  window.document.head.appendChild(styleElement);
}
