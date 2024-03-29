import React, { Component } from 'react'

import AdminLayout from '../../Hoc/AdminLayout';

import FormFields from '../../UI/formFields';
import {validate} from '../../UI/misc';
import {firebasePlayers, firebase, firebaseDB} from '../../../firebase'; 
import FileUploader from '../../UI/fileUploader';

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
                    label: 'Player Position',
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
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormData = {...this.state.formData};

        for (let key in newFormData){
            newFormData[key].value = player[key];
            newFormData[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formData: newFormData
        })

    }

    componentDidMount(){
        const playerId = this.props.match.params.id;
        
        if (!playerId){
            this.setState({
                formType: 'Add player'
            })
        }else{
            //edit player
            firebaseDB.ref(`players/${playerId}`).once('value')
                .then(snapshot => {
                    const playerData = snapshot.val();
                    
                    firebase.storage().ref('players')
                    .child(playerData.image).getDownloadURL()
                    .then( url => {
                        this.updateFields(playerData, playerId, 'Edit player', url)
                    })
                    .catch( e => {
                        this.updateFields({
                            ...playerData,
                            image: ''
                        }, playerId, 'Edit player', '');
                    })
                })
        }
    }

    updateForm = (element, content = '') => {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};

        if (content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }

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

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000);

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
            // console.log('submitted');
            if (this.state.formType === 'Edit player'){
                // edit form
                firebaseDB.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Update Correctly');
                    })
                    .catch(e => {
                        this.setState({formError: true});
                    })
            }else{
                firebasePlayers.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_players')
                    })
                    .catch(e => {
                        this.setState({
                            formError: true
                        })
                    })
            }
        }else{
            this.setState({formError: true})
        }
    }

    resetImage = () => {
        const newFormData = {...this.state.formData};
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        })
    }

    storeFilename = (fileName) => {
        this.updateForm({id: 'image'}, fileName);
    }


    render() {
        // console.log(this.state.formData);
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={this.submitForm}>

                            <FileUploader 
                                dir="players"
                                tag={"Player Image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />
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
