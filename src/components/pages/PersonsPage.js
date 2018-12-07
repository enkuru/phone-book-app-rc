import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header, Icon} from 'semantic-ui-react'

import {deletePerson, fetchPersons, loadPerson} from './../../actions/persons';
import PersonTable from "../PersonTable";
import PersonDetailModal from "../PersonDetailModal";

class PersonsPage extends Component {
  static propTypes = {
    persons: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired
  };

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
        <PersonTable deletePerson={this.props.deletePerson} loadPerson={this.props.loadPerson}
                     persons={this.props.persons}/>
        <PersonDetailModal/>
      </div>
    );
  }
}

const mapStateToProps = ({persons}) => {
  return {persons};
};

const mapDispatchToProps = {fetchPersons, deletePerson, loadPerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);