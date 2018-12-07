import React, {Component} from 'react';
import update from 'immutability-helper';
import {Button, Form, Icon, Modal} from 'semantic-ui-react'

import {loadPerson, savePerson, updatePerson} from '../actions/persons';
import NumberTable from "./NumberTable";
import {connect} from "react-redux";

class PersonDetailModal extends Component {
  state = {
    newPerson: !this.props.persons.person._id,
    firstName: this.props.persons.person.firstName,
    lastName: this.props.persons.person.lastName,
    email: this.props.persons.person.email,
    numbers: this.props.persons.person.numbers,
    modalOpen: this.props.persons.modalOpen
  };

  savePerson = () => {
    let person = {
      _id: this.props.persons.person._id ? this.props.persons.person._id : null,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      numbers: this.state.numbers
    };

    person._id ? this.props.updatePerson(person) : this.props.savePerson(person);
  };

  addNumber = number => this.setState({
    numbers: update(this.state.numbers, {
      $push: [{number, owner: this.props.persons.person._id ? this.props.persons.person._id : null}]
    })
  });

  editNumber = (index, number) => this.setState(update(this.state, {numbers: {[index]: {number: {$set: number}}}}));

  deleteNumber = index => this.setState({numbers: update(this.state.numbers, {$splice: [[index, 1]]})});

  handleModal = modalState => this.setState({modalOpen: modalState});

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  componentWillReceiveProps(nextProps) {
    this.setState({
      newPerson: !nextProps.persons.person._id,
      firstName: nextProps.persons.person.firstName,
      lastName: nextProps.persons.person.lastName,
      email: nextProps.persons.person.email,
      numbers: nextProps.persons.person.numbers,
      modalOpen: nextProps.persons.modalOpen
    });
  }

  render() {
    const header = this.state.newPerson ? 'New Person' : 'Person Details';

    return (
      <Modal open={this.state.modalOpen} onClose={() => this.handleModal(false)} dimmer='blurring' centered={false}>
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
          <Button color='green' onClick={() => this.savePerson()} inverted><Icon name='checkmark'/> Save</Button>

          <Button color='red' onClick={() => this.handleModal(false)} inverted><Icon name='delete'/> Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({persons}) => {
  return {persons};
};

const mapDispatchToProps = {loadPerson, savePerson, updatePerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetailModal);