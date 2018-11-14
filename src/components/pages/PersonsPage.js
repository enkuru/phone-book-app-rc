import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header, Icon} from 'semantic-ui-react'

import {deletePerson, fetchPersons, savePerson, updatePerson} from './../../actions/persons';
import {loadPerson} from './../../actions/personModal';
import PersonTable from "../PersonTable";
import PersonDetailModal from "../PersonDetailModal";

class PersonsPage extends Component {
  static propTypes = {
    persons: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired
  };
  /**/
  savePerson = person => person._id ? this.props.updatePerson(person) : this.props.savePerson(person);

  componentDidMount() {
    this.props.fetchPersons();
  }

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
        <PersonTable deletePerson={this.props.deletePerson} savePerson={this.props.savePerson} loadPerson={this.props.loadPerson}
                     persons={this.props.persons}/>
        <PersonDetailModal savePerson={savePerson}/>
      </div>
    );
  }
}

const mapStateToProps = ({persons}) => {
  return {persons};
};

const mapDispatchToProps = {fetchPersons, savePerson, updatePerson, deletePerson, loadPerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);