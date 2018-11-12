import React from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'semantic-ui-react'

import PersonRow from './PersonRow';
import HashLoader from 'react-spinners/HashLoader';
import PersonDetailModal from "./PersonDetailModal";

const newPerson = {firstName: '', lastName: '', email: '', numbers: []};

const PersonTable = ({persons, deletePerson}) => {
  const tableHeader = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>
          <PersonDetailModal person={newPerson}/>
          <Button positive fluid size='tiny' content='New Person'/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const emptyMessage = (
    <div>
      {
        persons.error.response
          ? <h3>Error retrieving data: {persons.error.message}</h3>
          : (!persons.fetching ? <p>There are no persons yet</p> : null)
      }
    </div>
  );

  return (
    <div>
      <HashLoader color={'#35bdb2'} sizeUnit={"px"} size={40} loading={persons.fetching}/>

      <Table celled>
        {tableHeader}

        <Table.Body>
          {persons.list.length ?
            persons.list.map(person => <PersonRow deletePerson={deletePerson} key={person._id} person={person}/>)
            :
            <Table.Row>
              <Table.Cell textAlign='center' colSpan={4}>
                {emptyMessage}
              </Table.Cell>
            </Table.Row>
          }

        </Table.Body>
      </Table>
    </div>
  );
};

PersonTable.propTypes = {
  persons: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
};

export default PersonTable;