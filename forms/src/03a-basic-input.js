import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import Field from './03a-field-component-field';


const content = document.createElement('div');
document.body.appendChild(content);


module.exports =  class extends Component {
    static displayName = "03a-basic-input";

    state = {
        fields: {
            name: '',
            email: ''
        },
        fieldErrors: {},
        people: []
    }

    onFromSubmit = evt => {
        const people = [...this.state.people];
        const person = this.state.fields;

        evt.preventDefault();
        
        if(this.validate()) return;

        this.setState({
            people: people.concat(person),
            fields: {
                name: '',
                email: ''
            }
        
        });
    }

    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errorMessage = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

        if(!person.name) return true;
        if(!person.email) return true;
        if(errorMessage.length) return true;

        return false;
    }

    onInputChange = ({name, value, error}) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({fields, fieldErrors});
    }

    render() {
        return (
            <div>
                <h1>Signup Sheet</h1>
                <form onSubmit={this.onFromSubmit} id="Signup" name="Signup">
                    <Field 
                        placeholder='Name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={val => (val ? false: 'Name required')}
                    />

                    <br/>
                    
                    <Field 
                        placeholder='Email'
                        name='email'
                        type='email'
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={val => (isEmail(val) ? false: 'Invalid Email')}
                    />

                    <br/>

                    <input type="submit" disabled={this.validate()}/>
                </form>

                <br/>

                <div>
                
                    <h3>People List</h3>
                    <ul>
                        {
                            this.state.people.map(({name,email}, i) => (
                                <li key={i}>
                                    {name} ({email})
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    }
}