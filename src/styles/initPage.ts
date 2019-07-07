import { setupPage, normalize } from 'csstips';
import { createStyle } from './style';

export function initPage(rootElement: string): void {
  normalize();
  setupPage(rootElement);
  const style = createStyle({ name: 'anux-react-ui-init', priority: 1 });
  style.cssRule(rootElement, {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
  });
}