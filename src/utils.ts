import { addDisplayName as utilsAddDisplayName } from 'anux-react-utils';

export const addDisplayName: typeof utilsAddDisplayName = (component, name) => utilsAddDisplayName(component, `Anux-React-UI-${name}`);
