import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import faker from 'faker';
import fb from '../fb';
// const vrsRef = fb.database().ref('/vrs');

const p1 = { margin: 5, padding: 10, textAlign: 'center', width: 300, height: 500 }
const t1 = { margin: 5, width: 250 }
const b1 = { margin: 5 }

var agents = [
  { uid: 1, username: 'agent1' },
  { uid: 2, username: 'agent2' },
  { uid: 3, username: 'agent3' }
]

export default class GuestForm extends Component {
  constructor() {
    super();
    this.state = {
      // id: '',
      userID: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      gender: '',
      email: '',
      created: '',
      changed: '',
    };
  }

  componentDidMount = () => {
    // vrsRef.child("name").on('value', snapshot => {
    //   this.setState({ name: snapshot.val() });
    // });
  }

  handleChange = name => event => {
    /*
    const amount = ptypes.filter(a => a.name == event.target.value)[0].amount;

    this.setState({
      [name]: event.target.value,
      amount: amount
    });

    // this.setState({amount: +new Date()});
    console.log()
    */

  };

  handleClick = (e, id) => {
    e.preventDefault();

    switch (id) {
      case 'demo':
        var person = {
          userID: faker.random.objectElement(agents).uid,
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          phone: faker.helpers.replaceSymbolWithNumber("080########"),
          address: faker.address.streetAddress("###"),
          gender: faker.random.arrayElement(['M','F']),
          email: faker.internet.email(),
          created: +new Date(),
          changed: +new Date(),
        }
        this.setState({
          userID: person.userID,
          firstname: person.firstname,
          lastname: person.lastname,
          phone: person.phone,
          address: person.address,
          gender: person.gender,
          email: person.email,
          created: person.created,
          changed: person.changed,
        });
        break;

      case 'submit':
        var time = (new Date).getTime();
        const vrsRef = fb.database().ref('/vrs/persons/' + time);
        const item = {
          userID: this.state.userID,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          phone: this.state.phone,
          address: this.state.address,
          gender: this.state.gender,
          email: this.state.email,
          created: this.state.created,
          changed: this.state.changed,
        }
        vrsRef.set(item);
        console.log('person saved!');
        break;

      case 'clear':
        console.log('clear');
        break;


      default:
        console.log('default')
    }

  }

  render() {
    return (
      <div style={{ clear: 'both' }}>
        <form noValidate autoComplete="off">
          <Paper style={p1} elevation={3}>
            <Typography variant="headline" component="h3">Guest Form</Typography>
            <TextField
              id="userID"
              label="User ID"
              style={t1}
              value={this.state.userID}
              onChange={this.handleChange('userID')}
            />
            <TextField
              id="firstname"
              label="First Name"
              style={t1}
              value={this.state.firstname}
              onChange={this.handleChange('firstname')}
            />
            <TextField
              id="lastname"
              label="Last Name"
              style={t1}
              value={this.state.lastname}
              onChange={this.handleChange('lastname')}
            />
            <FormControl style={{ margin: 5, minWidth: 250 }}>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.handleChange('gender')}
                inputProps={{
                  name: 'gender',
                  id: 'gender',
                }}
              >
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="phone"
              label="Phone No."
              style={t1}
              value={this.state.phone}
              onChange={this.handleChange('phone')}
            />
            <TextField
              id="email"
              label="Email Address"
              style={t1}
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            <TextField
              id="address"
              label="Address"
              style={t1}
              value={this.state.address}
              onChange={this.handleChange('address')}
            />

            <Button variant="contained" style={b1} onClick={((e) => this.handleClick(e, 'demo'))}>Demo</Button>
            <Button variant="contained" color="primary" style={b1} onClick={((e) => this.handleClick(e, 'submit'))}>Submit</Button>
            <Button variant="contained" color="secondary" style={b1} onClick={((e) => this.handleClick(e, 'clear'))}>Clear</Button>

          </Paper>
        </form>
      </div>
    );
  }
}