import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Button, Table} from 'semantic-ui-react'
import PersonDetailModal from './PersonDetailModal';

const PersonRow = ({person, loadPerson, deletePerson}) => (
  <Table.Row>
    <Table.Cell>{person.firstName}</Table.Cell>
    <Table.Cell>{person.lastName}</Table.Cell>
    <Table.Cell>{person.email}</Table.Cell>
    <Table.Cell width={2}>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Button fluid color='green' size='mini' content='Detail' icon='address card'
                    onClick={() => loadPerson(person)}/>
            {/*<PersonDetailModal person={person}/>*/}
          </Grid.Column>

          <Grid.Column width={1}>
            <Button color='red' size='mini' onClick={() => deletePerson(person._id)} icon='trash'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Table.Cell>
  </Table.Row>
);

PersonRow.propTypes = {
  person: PropTypes.object.isRequired,
  deletePerson: PropTypes.func.isRequired
};

export default PersonRow;