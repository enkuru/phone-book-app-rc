import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header, Icon} from 'semantic-ui-react'

import {fetchPersons, deletePerson} from './../../actions/persons';
import PersonTable from "../PersonTable";

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
        <PersonTable deletePerson={this.props.deletePerson} persons={this.props.persons}/>
      </div>
    );
  }
}

const mapStateToProps = ({persons}) => {
  return {persons};
};

const mapDispatchToProps = {fetchPersons, deletePerson};

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);