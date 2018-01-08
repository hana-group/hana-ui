import React, {Component} from 'react';
import {Form, FormItem, Select, Option, Text,
  Checkbox, CheckboxGroup,
  Radio, RadioGroup,
  Button, TextArea
} from 'hana-ui';

/**
 * @en
 * Base
 * A simple form used `Form` component.
 *
 * @cn
 * 基础
 *
 * 一个简单的表单示例。
 */
export default class ExampleBase extends Component {
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
        <FormItem label="Username:">
          <Select
            name="username"
            auto
            multiple
            value={this.state.value}
            onChange={v => this.setState({value: v})}
          >
            <Option label="Azusa" value="1" />
            <Option label="Mio" value="2" />
          </Select>
        </FormItem>

        <FormItem label="Suggestions:">
          <Text withIcon={false} auto />
        </FormItem>

        <FormItem label="Seasons:">
          <CheckboxGroup value={this.state.seasons} onChange={seasons => this.setState({seasons})}>
            <Checkbox label="Spring" value="1" />
            <Checkbox label="Summer" value="2" />
            <Checkbox label="Autumn" value="3" />
            <Checkbox label="Winter" value="4" />
          </CheckboxGroup>
        </FormItem>

        <FormItem label="Animals:">
          <RadioGroup value={this.state.animal} onChange={animal => this.setState({animal})}>
            <Radio label="Cat" value="1" />
            <Radio label="Dog" value="2" />
            <Radio label="Neko" value="3" />
            <Radio label="Inu" value="4" />
          </RadioGroup>
        </FormItem>

        <FormItem label="Code:">
          <TextArea
            auto
            normal={{show: true, message: 'This is code'}}
          />
        </FormItem>

        <FormItem label="">
          <Button
            type="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}
