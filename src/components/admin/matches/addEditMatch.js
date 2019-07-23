import React, { Component } from 'react'
import AdminLayout from '../../Hoc/AdminLayout';

import FormFields from '../../UI/formFields';
import {validate} from '../../UI/misc';

class AddEditMatch extends Component {

    state = {

        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select an away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key: 'W', value: 'W'},
                        {key: 'L', value: 'L'},
                        {key: 'D', value: 'D'},
                        {key: 'n/a', value: 'n/a'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played ?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {key: 'Yes', value: 'Yes'},
                        {key: 'No', value: 'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
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
    }

    render() {
        return (
            <div>
                <AdminLayout>

                    <div className="editmatch_dialog_wrapper">
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div>
                            <form onSubmit={this.submitForm}>
                                <FormFields 
                                    id={`date`}
                                    formData={this.state.formData.date}
                                    change={this.updateForm}
                                    />


                                    <div className="select_team_layout">
                                        <div className="label_inputs">Local</div>
                                        <div className="wrapper">
                                            <div className="left">
                                                <FormFields 
                                                    id={`local`}
                                                    formData={this.state.formData.local}
                                                    change={this.updateForm}
                                                    />

                                            </div>
                                            <div>
                                                <FormFields 
                                                    id={`resultLocal`}
                                                    formData={this.state.formData.resultLocal}
                                                    change={this.updateForm}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="select_team_layout">
                                        <div className="label_inputs">Away</div>
                                        <div className="wrapper">
                                            <div className="left">
                                                <FormFields 
                                                    id={`away`}
                                                    formData={this.state.formData.away}
                                                    change={this.updateForm}
                                                    />

                                            </div>
                                            <div>
                                                <FormFields 
                                                    id={`resultAway`}
                                                    formData={this.state.formData.resultAway}
                                                    change={this.updateForm}
                                                    />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="split_fields">
                                        <FormFields 
                                            id={`referee`}
                                            formData={this.state.formData.referee}
                                            change={this.updateForm}
                                            />

                                        <FormFields 
                                            id={`stadium`}
                                            formData={this.state.formData.stadium}
                                            change={this.updateForm}
                                            />
                                    </div>
                                    
                                    <div className="split_fields last">
                                        <FormFields 
                                            id={`Team result`}
                                            formData={this.state.formData.result}
                                            change={this.updateForm}
                                            />

                                        <FormFields 
                                            id={`final`}
                                            formData={this.state.formData.final}
                                            change={this.updateForm}
                                            />
                                    </div>

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
            </div>
        )
    }
}

export default AddEditMatch;