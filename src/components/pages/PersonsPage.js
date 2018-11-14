import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header, Icon} from 'semantic-ui-react'

import {fetchPersons, savePerson, updatePerson, deletePerson} from './../../actions/persons';
import PersonTable from "../PersonTable";

class PersonsPage extends Component {
  static propTypes = {
    persons: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPersons();
  }

  savePerson = person => person._id ? this.props.updatePerson(person) : this.props.savePerson(person);

  render() {
    const header = (
      <Header as='h2'>
        <Icon name='address book'/>
        <Header.Content>
          Persons List
          <Header.Subheader>Manage your person list and their phone numbers</Header.Subheader>
        </Header.Content>
      </Header>
    );
    return (
      <div>
        {header}
        <PersonTable deletePerson={this.props.deletePerson} savePerson={this.props.savePerson}
                     persons={this.props.persons}/>
      </div>
    );
  }
}

const mapStateToProps = ({persons}) => {
  return {persons};
};

const mapDispatchToProps = {fetchPersons, savePerson, updatePerson, deletePerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);