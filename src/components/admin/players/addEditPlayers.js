import React, { Component } from 'react'

import AdminLayout from '../../Hoc/AdminLayout';

import FormFields from '../../UI/formFields';
import {validate} from '../../UI/misc';
import {firebasePlayers, firebaseMatches, firebase} from '../../../firebase'; 

class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last Name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key:"Keeper", value: 'Keeper'},
                        {key:"Defence", value: 'Defence'},
                        {key:"Midfield", value: 'Midfield'},
                        {key:"Striker", value: 'Striker'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
        }
    }

    componentDidMount(){
        const playerId = this.props.match.params.id;
        
        if (!playerId){
            this.setState({
                formType: 'Add player'
            })
        }else{

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
            //submit form
        }else{
            this.setState({formError: true})
        }
    }



    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={this.submitForm}>
                            <FormFields 
                                id={`name`}
                                formData={this.state.formData.name}
                                change={this.updateForm}
                                />
                            <FormFields 
                                id={`lastname`}
                                formData={this.state.formData.lastname}
                                change={this.updateForm}
                                />
                            <FormFields 
                                id={`number`}
                                formData={this.state.formData.number}
                                change={this.updateForm}
                                />
                            <FormFields 
                                id={`position`}
                                formData={this.state.formData.position}
                                change={this.updateForm}
                                />


                            <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                    <div className="error_label">
                                        Something is wrong
                                    </div>
                                    : 
                                    ''
                                }

                                <div className="admin_submit">
                                    <button>
                                        {this.state.formType}
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
                
            </AdminLayout>
        )
    }
}

export default AddEditPlayers
