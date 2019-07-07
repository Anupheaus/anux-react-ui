import { setupPage, normalize } from 'csstips';
import { createStyle } from './style';

let hasInitialisedPage = false;

export function initPage(rootElement: string): void {
  if (hasInitialisedPage) { return; }
  hasInitialisedPage = true;
  normalize();
  setupPage(rootElement);
  const style = createStyle({ name: 'anux-react-ui-init', priority: 1 });
  style.cssRule(rootElement, {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
  });
}