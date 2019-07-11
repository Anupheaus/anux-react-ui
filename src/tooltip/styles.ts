import { style } from '../styles/uiStyle';
import { position } from '../styles';

export default {

  root: style({
    ...position.absolute.full,
    pointerEvents: 'none',
  }),

  tooltip: style({
    backgroundColor: '#eaeaea',
    borderRadius: '4px',
    padding: '3px',
    fontSize: '0.7em',
    margin: '3px',
    boxShadow: '0 1px 2px 0px #00000040',
  }),

};
