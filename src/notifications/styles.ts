import { CSSProperties } from '@material-ui/styles';
import { style, position, flex } from '../styles';
import { Variants } from './models';

const variantStyles: CSSProperties[] = [];

variantStyles[Variants.Standard] = {};
variantStyles[Variants.Error] = { backgroundColor: '#d32f2f' };
variantStyles[Variants.Warning] = { backgroundColor: '#ffa000' };
variantStyles[Variants.Info] = { backgroundColor: '#2196f3' };
variantStyles[Variants.Success] = { backgroundColor: '#43a047' };
variantStyles[Variants.Pending] = { backgroundColor: '#2196f3' };

export default {

  host: style({
    ...position.relative,
    display: 'inherit',
    flex: 'inherit',
    flexDirection: 'inherit',
    width: '100%',
    height: '100%',
  }),

  container: style({
    ...position.absolute.full,
    ...flex.full.stack,
    overflow: 'hidden',
    pointerEvents: 'none',

  }),

  toaster: {

    root: style({
      position: 'absolute',
      maxWidth: '90%',
      width: '100%',
      pointerEvents: 'all',
    }),

    content: (variant: Variants) => style({
      color: 'white',
      ...variantStyles[variant],
      minWidth: 'unset',
      fontSize: '0.8em',
      flexWrap: 'nowrap',
    }),

    progress: style({
      color: 'white',
    }),

    backdrop: (isOpen: boolean) => style({
      ...position.absolute,
      display: isOpen ? 'block' : 'none',
      zIndex: 1000,
    }),

    message: {

      container: style({
        ...flex.full.wrap.align({ vertical: 'center' }),
        flexWrap: 'nowrap',
      }),

      icon: style({
        ...flex.content.stack.align({ vertical: 'center', horizontal: 'center' }),
        marginRight: '10px',
      }),

      content: style({
        ...flex.full,
      }),

    },

    closeIcon: style({
      color: 'inherit',
    }),

  },

  dialog: {
    root: style({
      pointerEvents: 'all',
    }),

    content: {

      text: style({
        cursor: 'default',
      }),

    },
  },

};
