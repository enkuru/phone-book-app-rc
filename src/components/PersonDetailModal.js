import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {Button, Form, Icon, Modal} from 'semantic-ui-react'

import NumberTable from "./NumberTable";

class PersonDetailModal extends Component {
  static propTypes = {person: PropTypes.object.isRequired};

  static defaultProps = {
    modalButtonIcon: 'address card',
    modalButtonColor: 'blue',
    modalButtonSize: 'mini',
    modelButtonContent: '',
    newPerson: false
  };

  initState = {
    modalOpen: false,
    firstName: '',
    lastName: '',
    email: '',
    numbers: []
  };

  state = {
    modalOpen: false,
    firstName: this.props.person.firstName,
    lastName: this.props.person.lastName,
    email: this.props.person.email,
    numbers: this.props.person.numbers
  };

  savePerson = () => this.props.savePerson({
    _id: this.props.person._id ? this.props.person._id : null,
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    numbers: this.state.numbers
  });

  addNumber = number => this.setState({
    numbers: update(this.state.numbers, {$push: [{number, owner: this.props.person._id}]})
  });

  editNumber = (index, number) => this.setState(update(this.state, {numbers: {[index]: {number: {$set: number}}}}));

  deleteNumber = index => this.setState({numbers: update(this.state.numbers, {$splice: [[index, 1]]})});

  handleModal = modalState => this.setState(!modalState && this.props.newPerson ? this.initState : {modalOpen: modalState});

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    const header = this.props.newPerson ? 'New Person' : 'Person Details';

    return (
      <Modal trigger={<Button fluid color={this.props.modalButtonColor} size={this.props.modalButtonSize}
                              content={this.props.modelButtonContent} icon={this.props.modalButtonIcon}
                              onClick={() => this.handleModal(true)}/>}
             open={this.state.modalOpen} onClose={() => this.handleModal(false)} dimmer='blurring' centered={false}>
        <Modal.Header>{header}</Modal.Header>
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
          <Button color='green' onClick={this.savePerson} inverted><Icon name='checkmark'/> Save</Button>

          <Button color='red' onClick={() => this.handleModal(false)} inverted><Icon name='delete'/> Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PersonDetailModal;