import React from 'react'
import isEmail from 'validator/lib/isEmail'

const content = document.createElement('div');
document.body.appendChild(content);



module.exports = class extends React.Component {
    static displayName = "07a-basic-validation"

    state = {
        fields: {
            name: '',
            email: ''
        },
        fieldErrors: {},
        people: []
    }

    onSubmit = evt => {
        const people = [...this.state.people];
        const person = this.state.fields;
        const fieldErrors = this.validate(person);
        this.setState({fieldErrors})
        evt.preventDefault();
        
        if (Object.keys(fieldErrors).length) return;

        this.setState({
            people: people.concat(person),
            fields: {
                name: '',
                email: ''
            }
        })


    }

    onChangeInput = (evt) => {
        const fields = Object.assign({}, this.state.fields)
        fields[evt.target.name]=evt.target.value
        this.setState({fields})

    }

    validate = person => {
        const errors = {};
        if(!person.name) errors.name = "Name required";
        if(!person.email) errors.email = "Email required";
        if(person.email && !isEmail(person.email)) errors.email = "Invalid Email";

        return errors
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        placeholder='Name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onChangeInput}
                    />
                    <span style={{color: 'red'}}>{this.state.fieldErrors.name}</span>
                    <br/>
                    <input
                        placeholder='Email'
                        name='email'
                        value={this.state.fields.email}
                        onChange={this.onChangeInput}
                    />
                    <span style={{color: 'Red'}}>{this.state.fieldErrors.email}</span>
                    <br/>
                    <input type="Submit"/>

                </form>

                <br/>

                <ul>
                    {this.state.people.map(({name,email}, i) => (
                        <li key={i}>
                        {name} ({email})
                        </li>
                    ))}
                </ul>


            </div>

        )
    }
}