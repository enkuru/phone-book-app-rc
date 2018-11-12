import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {Button, Form, Icon, Modal} from 'semantic-ui-react'

import NumberTable from "./NumberTable";

class PersonDetailModal extends Component {
  static propTypes = {person: PropTypes.object.isRequired};

  state = {
    modalOpen: false,
    firstName: this.props.person.firstName,
    lastName: this.props.person.lastName,
    email: this.props.person.email,
    numbers: this.props.person.numbers
  };

  addNumber = number => {
    let newNumbers = update(this.state.numbers, {$push: [{number, owner: this.props.person._id}]});
    this.setState({numbers: newNumbers});
  };

  editNumber = (index, number) => {
    let state = update(this.state, {numbers: {[index]: {number: {$set: number}}}});
    this.setState(state);
  };

  deleteNumber = index => {
    let deletes = update(this.state.numbers, {$splice: [[index, 1]]});
    this.setState({numbers: deletes});
  };

  handleOpen = () => this.setState({modalOpen: true});

  handleClose = () => this.setState({modalOpen: false});

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    return (
      <Modal trigger={<Button color='blue' size='mini' icon='address card' onClick={this.handleOpen}/>}
             open={this.state.modalOpen} onClose={this.handleClose} dimmer='blurring' centered={false}>
        <Modal.Header>Person Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First Name' value={this.state.firstName} id='firstName'
                          placeholder='First Name' onChange={this.handleChange} name='firstName'/>
              <Form.Input fluid label='Last Name' value={this.state.lastName} id='lastName'
                          placeholder='Last Name' onChange={this.handleChange} name='lastName'/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Input fluid label='Email' value={this.state.email} id='email'
                          placeholder='Email' onChange={this.handleChange} name='email'/>
            </Form.Group>

            <Form.Field>
              <NumberTable numbers={this.state.numbers}
                           addNumber={this.addNumber} editNumber={this.editNumber} deleteNumber={this.deleteNumber}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark'/> Save
          </Button>

          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name='delete'/> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PersonDetailModal;