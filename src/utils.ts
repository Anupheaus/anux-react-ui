import { anuxFunctionComponent } from 'anux-react-utils';

export const anuxUIFunctionComponent: typeof anuxFunctionComponent = (name, component) => anuxFunctionComponent(`Anux-React-UI-${name}`, component);
