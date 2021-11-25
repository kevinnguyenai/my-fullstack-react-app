import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Field extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
    }

    state = {
        value: this.props.value,
        error: false
    }

    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value): value;

        this.setState({value,error})

        this.props.onChange({name,value,error})
    }

    render() {
        return (
            <div>
                <input 
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <span style={{color: 'red'}}>{this.state.error}</span>
            </div>
        );
    }
};

export default Field
