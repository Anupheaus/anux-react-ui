import { flex, position } from '../styles';
import { style } from '../styles/uiStyle';

export default {

  iconInButton: (iconPosition: 'left' | 'right') => style({
    ...flex.full.wrap.align({ vertical: 'center' }),
    ...(iconPosition === 'left' ? { marginRight: '5px' } : { marginLeft: '5px' }),
  }),

  speedDial: style({
    position: 'relative',
  }),

  progress: {

    linear: {

      root: style({
        height: '2px',
      }),

      container: style({
        ...position.absolute.full,
        top: 'unset',
      }),

    },

    circular: {

      root: style({

      }),

      container: style({
        ...position.absolute.withMargin('-2px'),
      }),

    },

  },

};
