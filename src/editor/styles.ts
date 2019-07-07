import { flex } from '../styles';
import { style } from '../styles/uiStyle';

export default {

  root: style(flex.content.stack),

  toolbar: {

    root: style({
      ...flex.content.wrap,
      flexWrap: 'nowrap',
      marginTop: 'auto',
    }),

    customContainer: style({
      ...flex.full.wrap,
      flexWrap: 'nowrap',
    }),

  },

};

