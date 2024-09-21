import alertify from "alertifyjs";
import React, { Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Col } from "reactstrap";

export default class FormDemo2 extends Component {
  state = { email: "", password: "", city: "", description: "" };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alertify.success(this.state.email + "added to db");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          
          <FormGroup row>
            <Label for="Email" >
              Email
            </Label>
            
              <Input
                id="email"
                name="email"
                placeholder="Enter email"
                type="email"
                onchange = {this.handleChange}
              />
        
          </FormGroup>
          <FormGroup row>
            <Label for="Password" >
              Password
            </Label>
            
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                onchange = {this.handleChange}
              />
        
          </FormGroup>
          <FormGroup row>
            <Label for="description" >
            Description
            </Label>
            
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
                type="textarea"
                onchange = {this.handleChange}
              />
        
          </FormGroup>
          <FormGroup row>
            <Label for="city" >
            City
            </Label>
            
              <Input
                id="city"
                name="city"
                type="select"
                onchange = {this.handleChange}
              >
                <option>İstanbul</option>
                <option>Ankara</option>
                <option>İzmir</option>
                <option>Adana</option>
                <option>Diyarbakır</option>
              </Input>
        
          </FormGroup>
          <Button type="submit">Save</Button>
        </Form>

        
      </div>
    );
  }
}
