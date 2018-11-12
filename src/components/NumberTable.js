import React, {Component} from 'react';
import update from 'immutability-helper';
import {Button, Table, Grid, Input} from 'semantic-ui-react'
import PropTypes from 'prop-types';

class NumberTable extends Component {
  static propTypes = {numbers: PropTypes.array.isRequired};

  state = {
    numbers: this.props.numbers,
    editStates: this.props.numbers.map(() => false)
  };

  toggleEditMode = (index, cancel) => {
    let newState = update(this.state, {editStates: {[index]: {$set: !this.state.editStates[index]}}});

    (!cancel) || (newState.numbers[index] = this.props.numbers[index]);

    this.setState(newState);
  };

  onChangeNumber = e => {
    let newState = update(this.state, {numbers: {[e.target.name]: {number: {$set: e.target.value}}}});
    this.setState(newState);
  };

  render() {
    const header = (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Number</Table.HeaderCell>
          <Table.HeaderCell width={2}>
            <Button positive fluid size='tiny' content='New Number'/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    return (
      <Table celled>
        {header}

        <Table.Body>
          {this.state.numbers.map((item, index) =>
            <Table.Row key={item._id}>
              <Table.Cell>
                <Input value={item.number} fluid onChange={this.onChangeNumber} name={index}
                       readOnly={!this.state.editStates[index]}/>
              </Table.Cell>
              <Table.Cell>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      {this.state.editStates[index] ?
                        <Button color='green' size='mini' onClick={() => {
                          this.props.editNumber(index, this.state.numbers[index].number);
                          this.toggleEditMode(index, false)
                        }} icon='save'/>
                        :
                        <Button color='green' size='mini' onClick={() => this.toggleEditMode(index)} icon='edit'/>
                      }
                    </Grid.Column>
                    <Grid.Column>
                      {this.state.editStates[index] ?
                        <Button color='orange' size='mini' icon='delete'
                                onClick={() => this.toggleEditMode(index, true)}/>
                        :
                        <Button color='red' size='mini' onClick={() => this.props.deleteNumber(index)} icon='trash'/>
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default NumberTable;