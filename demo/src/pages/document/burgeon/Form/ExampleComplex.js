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
 * Complex
 * A complex form used `Form` component, having nested items and info.
 *
 * @cn
 * 较复杂的例子
 *
 * 一个较复杂的表单示例，带有嵌套、提示。
 */
export default class ExampleComplex extends Component {
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
    return (
      <Form onSubmit={this.handleSubmit} style={{width: 600, background: '#fff', padding: 20}}>
        <FormItem label="Sex:">
          <p className="hana-form-text">Male</p>
        </FormItem>

        <FormGroup label="Name:">
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

        <FormGroup label="Inputs:">
          <FormItem label="Input1" status="error" info="something wrong">
            <Text withIcon={false} auto />
          </FormItem>

          <FormItem label="Input2" status="error" info="something wrong">
            <Text withIcon={false} auto />
          </FormItem>
        </FormGroup>

        <FormItem label="Seasons:" status="warn" info="something need warning">
          <CheckboxGroup value={this.state.seasons} onChange={seasons => this.setState({seasons})}>
            <Checkbox label="Spring" value="1" />
            <Checkbox label="Summer" value="2" />
            <Checkbox label="Autumn" value="3" />
            <Checkbox label="Winter" value="4" />
          </CheckboxGroup>
        </FormItem>

        <FormItem label="Animals:" status="success" info="something good">
          <RadioGroup value={this.state.animal} onChange={animal => this.setState({animal})}>
            <Radio label="Cat" value="1" />
            <Radio label="Dog" value="2" />
            <Radio label="Neko" value="3" />
            <Radio label="Inu" value="4" />
          </RadioGroup>
        </FormItem>

        <FormItem label="">
          <Button type="primary">submit</Button>
        </FormItem>
      </Form>
    );
  }
}
