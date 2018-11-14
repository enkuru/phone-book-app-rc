import React, {Component} from 'react';
import update from 'immutability-helper';
import {Button, Form, Icon, Modal} from 'semantic-ui-react'

import {loadPerson} from '../actions/personModal';
import NumberTable from "./NumberTable";
import {connect} from "react-redux";

class PersonDetailModal extends Component {
  state = {
    newPerson: !this.props.personModal.person._id,
    firstName: this.props.personModal.person.firstName,
    lastName: this.props.personModal.person.lastName,
    email: this.props.personModal.person.email,
    numbers: this.props.personModal.person.numbers,
    modalOpen: this.props.personModal.modalOpen
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      newPerson: !nextProps.personModal.person._id,
      firstName: nextProps.personModal.person.firstName,
      lastName: nextProps.personModal.person.lastName,
      email: nextProps.personModal.person.email,
      numbers: nextProps.personModal.person.numbers,
      modalOpen: nextProps.personModal.modalOpen
    });
  }

  savePerson = () => {
    this.props.savePerson({
      _id: this.props.personModal.person._id ? this.props.personModal.person._id : null,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      numbers: this.state.numbers
    })
  };

  addNumber = number => this.setState({
    numbers: update(this.state.numbers, {
      $push: [{number, owner: this.props.personModal.person._id ? this.props.personModal.person._id : null}]
    })
  });

  editNumber = (index, number) => this.setState(update(this.state, {numbers: {[index]: {number: {$set: number}}}}));

  deleteNumber = index => this.setState({numbers: update(this.state.numbers, {$splice: [[index, 1]]})});

  handleModal = modalState => this.setState({modalOpen: modalState});

  handleChange = e => this.setState({[e.target.name]: e.target.value});

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

const mapStateToProps = ({personModal}) => {
  return {personModal};
};

const mapDispatchToProps = {loadPerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetailModal);