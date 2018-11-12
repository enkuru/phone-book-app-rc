import React from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'semantic-ui-react'

import PersonRow from './PersonRow';
import HashLoader from 'react-spinners/HashLoader';

const PersonTable = ({persons, deletePerson}) => {
  const emptyMessage = (
    <div>
      {
        persons.error.response
          ? <h3>Error retrieving data: {persons.error.message}</h3>
          : (!persons.fetching ? <p>There are no persons yet</p> : null)
      }
    </div>
  );

  const tableHeader = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>
          <Button positive fluid size='tiny' content='New Person'/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const personsData = (
    <Table celled>
      {tableHeader}

      <Table.Body>
        {persons.list.map(person => <PersonRow deletePerson={deletePerson} key={person._id} person={person}/>)}
      </Table.Body>
    </Table>
  );

  return (
    <div>
      <HashLoader color={'#35bdb2'} sizeUnit={"px"} size={40} loading={persons.fetching}/>
      {persons.list.length ? personsData : emptyMessage}
    </div>
  );
};

PersonTable.propTypes = {
  persons: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
};

export default PersonTable;