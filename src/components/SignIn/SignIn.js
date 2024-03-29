import React, { Component } from 'react'
import FormFields from '../UI/formFields';
import {validate} from '../UI/misc';

import {firebase} from '../../firebase';
import {withRouter} from 'react-router-dom';


class SignIn extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        // console.log(newFormData);
        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid; 
        }
        if (formIsValid){
            firebase.auth()
                .signInWithEmailAndPassword(
                    dataToSubmit.email,
                    dataToSubmit.password
                )
                .then(() => {
                    this.props.history.push('/dashboard');
                    console.log('logged in successfully')
                })
                .catch(err => {
                    this.setState({formError: true});
                })
        }else{
            this.setState({formError: true})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{margin: '100px'}}>
                    <form onSubmit={this.submitForm}>
                        <h2>Please Login</h2>
                        <FormFields 
                            id={`email`}
                            formData={this.state.formData.email}
                            change={this.updateForm}
                            />
                        <FormFields 
                            id={`password`}
                            formData={this.state.formData.password}
                            change={this.updateForm}
                            />

                            {this.state.formError ? 
                                <div className="error_label">Invalid email/password. Try again</div> : null
                            }
                            <button>Log In</button>
                    </form>
                </div>
                
            </div>
        )
    }
}
export default withRouter(SignIn)