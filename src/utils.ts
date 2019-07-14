import { anuxPureFunctionComponent } from 'anux-react-utils';

export const anuxUIFunctionComponent: typeof anuxPureFunctionComponent = (name, component) => anuxPureFunctionComponent(`Anux-React-UI-${name}`, component);
