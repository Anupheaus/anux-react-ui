import { style, position, flex } from '../styles';
import { CSSProperties } from '@material-ui/styles';
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
    ...flex.full,
    overflow: 'hidden',
  }),

  toaster: {

    root: {
      position: 'absolute',
    } as CSSProperties,

    content: (variant: Variants) => style({
      color: 'white',
      ...variantStyles[variant],
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

};
