import { expect as chaiExpect } from 'chai';
import * as ReactObj from 'react';
import * as ReactDOMObj from 'react-dom';

declare global {
  export const expect: typeof chaiExpect;
  export const React: typeof ReactObj;
  export const ReactDOM: typeof ReactDOMObj;
}
