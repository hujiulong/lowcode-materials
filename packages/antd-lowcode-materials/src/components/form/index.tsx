import React, { Component, createRef } from 'react';
import { Form as OriginalForm } from 'antd';

import { withSingleFunctionChild } from '../../utils/hoc';

class Form extends Component<any, any> {
  formRef = createRef<any>();

  componentDidUpdate(prevProps: any) {
    const { values: prevValues } = prevProps;
    const { values: currentValues } = this.props;

    if (prevValues !== currentValues) {
      if (currentValues && Object.keys(currentValues).length > 0) {
        this.formRef.current!.setFieldsValue(currentValues);
      } else {
        this.formRef.current!.resetFields();
      }
    }
  }

  componentDidMount() {
    const { values } = this.props;

    Object.defineProperties(
      this,
      Object.keys(this.formRef.current).reduce((out, key) => {
        const property = this.formRef.current[key];
        let getter = () => property;
        if (typeof property === 'function') {
          getter = () => property.bind(this.formRef.current);
        }
        out[key] = { get: getter };
        return out;
      }, {} as Record<string, any>),
    );

    // 绑定表达式的时候，初次不生效，需要第一次调用一下 setFieldsValue
    if (values) {
      this.formRef.current!.setFieldsValue(values);
    }
  }

  render() {
    const { values, ...rest } = this.props;

    return <OriginalForm ref={this.formRef} {...rest} />;
  }
}

(Form as any).Item = (props: any) => {
  const { name, requiredobj, typeobj, patternobj, lenobj, validator } = props;
  const rules = [];
  if (requiredobj && requiredobj.required) {
    rules.push(requiredobj);
  }
  if (typeobj && typeobj.type) {
    rules.push(typeobj);
  }
  if (patternobj && patternobj.pattern) {
    rules.push(patternobj);
  }
  if (lenobj && (lenobj.max || lenobj.min)) {
    rules.push(lenobj);
  }
  if (validator && typeof validator === 'function') {
    rules.push({
      validator: (_: any, value: any) => validator(value),
    });
  }

  const namePath =
    typeof name === 'string' && name.indexOf('.') > 0 ? name.split('.') : name;

  return (
    <OriginalForm.Item
      {...props}
      name={namePath}
      rules={rules}
    ></OriginalForm.Item>
  );
};

(Form as any).List = withSingleFunctionChild(OriginalForm.List);

export default Form;
