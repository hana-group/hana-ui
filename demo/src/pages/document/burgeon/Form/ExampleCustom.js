import React, {Component} from 'react';
import {
  Form, FormItem, FormGroup,
  Select, Option, Text,
  Checkbox, CheckboxGroup,
  Radio, RadioGroup,
  Button
} from 'hana-ui';

/**
 * @en
 * Custom
 *
 * Use `labelStyle`, `itemLabelStyle`, `elementStyle` to control the `Form`'s style.
 *
 * @cn
 * 自定义
 *
 * 自定义表单，使用`labelStyle`, `itemLabelStyle`, `elementStyle`来控制表单元素的样式。
 */
export default class ExampleCustom extends Component {
  state = {
    value: [],
    seasons: [],
    animal: '1'
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit'); // eslint-disable-line
  }

  render() {
    const labelStyle = {
      width: 100
    };
    const itemLabelStyle = {
      color: '#6cd4a4',
      width: 'auto'
    };
    const elementStyle = {
      color: '#6cd4a4'
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{width: 600, background: '#fff', padding: 20}}>
        <FormItem label="Sex:" labelStyle={labelStyle} elementStyle={elementStyle}>
          <p className="hana-form-text">Male</p>
        </FormItem>

        <FormGroup label="Name:" labelStyle={labelStyle}>
          <FormItem>
            <Select
              name="firstname"
              defaultLabel="Choose FirstName"
              auto
            >
              <Option label="Azusa" value="1" />
              <Option label="Mio" value="2" />
            </Select>
          </FormItem>
          <FormItem>
            <Select
              name="lastname"
              defaultLabel="Choose LastName"
              auto
            >
              <Option label="Nakano" value="1" />
              <Option label="Akiyama" value="2" />
            </Select>
          </FormItem>
        </FormGroup>

        <FormGroup label="Inputs:" labelStyle={labelStyle}>
          <FormItem label="Input1" status="error" info="something wrong" labelStyle={itemLabelStyle}>
            <Text withIcon={false} auto />
          </FormItem>

          <FormItem label="Input2" status="error" info="something wrong" labelStyle={itemLabelStyle}>
            <Text withIcon={false} auto />
          </FormItem>
        </FormGroup>

        <FormItem label="Seasons:" status="warn" info="something need warning" labelStyle={labelStyle}>
          <CheckboxGroup value={this.state.seasons} onChange={seasons => this.setState({seasons})}>
            <Checkbox label="Spring" value="1" />
            <Checkbox label="Summer" value="2" />
            <Checkbox label="Autumn" value="3" />
            <Checkbox label="Winter" value="4" />
          </CheckboxGroup>
        </FormItem>

        <FormItem label="Animals:" status="success" info="something good" labelStyle={labelStyle}>
          <RadioGroup value={this.state.animal} onChange={animal => this.setState({animal})}>
            <Radio label="Cat" value="1" />
            <Radio label="Dog" value="2" />
            <Radio label="Neko" value="3" />
            <Radio label="Inu" value="4" />
          </RadioGroup>
        </FormItem>

        <FormItem label="" labelStyle={labelStyle}>
          <Button type="primary">submit</Button>
        </FormItem>
      </Form>
    );
  }
}
