import { style, flex } from '../../styles';

const common = {
  ...flex.content,
  padding: '0 0 2px',
  width: '100%',

  $nest: {
    '&>div': {
      ...flex.full,
    },

    '.MuiInputBase-root': {
      fontSize: 'inherit',
    },

    '.MuiSelect-selectMenu': {
      padding: 0,
      height: 'auto',
    },

    '.MuiInputBase-input': {
      height: '1.6em',
    },

  },
};

export default {

  progress: style({
    margin: '-1px 0 0',
    padding: '1px 0 0',
    height: '1px',
  }),

  autocompleteField: {

    root: style(common),

    popupMenu: style({
      $nest: {
        '&>div>ul': {
          margin: 0,
          padding: '8px 0',
          listStyleType: 'none',

          $nest: {
            '&>li': {
              display: 'block',
            },
          },
        },
      },
    }),

  },

  dateTimeField: style(common),

  dropdownField: style(common),

  numberField: style(common),

  textField: style(common),

  toggleField: {

    root: style({ ...common, ...flex.content.wrap.align({ vertical: 'center' }) }),

    label: style(flex.full),

    span: style(flex.content),

  },

};

// export default styles;
