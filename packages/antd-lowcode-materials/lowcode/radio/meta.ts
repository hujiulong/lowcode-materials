import snippets from './snippets';

export default {
  snippets,
  componentName: 'Radio',
  title: '单选框',
  category: '基础',
  props: [
    {
      name: 'children',
      title: { label: '内容', tip: '内容' },
      propType: 'string',
    },
    {
      name: 'autoFocus',
      title: { label: '自动聚焦', tip: '自动获取焦点' },
      propType: 'bool',
      defaultValue: false,
    },
    {
      name: 'defaultChecked',
      title: { label: '默认选中', tip: '初始是否选中' },
      propType: 'bool',
      defaultValue: false,
    },
    {
      name: 'checked',
      title: { label: '是否选中', tip: '指定当前是否选中' },
      propType: 'bool',
      defaultValue: false,
    },
    {
      name: 'disabled',
      title: { label: '是否禁用', tip: '是否为禁用状态' },
      propType: 'bool',
      defaultValue: false,
    },
    // {
    //   name: 'value',
    //   title: {
    //     label: '根据值判断',
    //     tip: '根据 value 进行比较，判断是否选中',
    //   },
    //   propType: 'string',
    // },
  ],
  configure: { supports: { style: true } },
};
