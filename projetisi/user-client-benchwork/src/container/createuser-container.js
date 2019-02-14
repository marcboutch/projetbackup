import React, { Component } from 'react';
import APIService from "service/api-service";
import InputComponentForm from "component/inputform-component";
import RadioFormComponent from "component/radioform-component";

class CreateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: [{ value: 0, label: "Recruteur" }, { value: 1, label: "Admin" }],
            user: [{
                username: "",
                password: "",
                passwordConfirme: "",
                isAdmin: 0
            }],
            enableValidation: true,
            enableAlert: false,
            displayErrors: false,
        }

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordConfirme = this.changePasswordConfirme.bind(this);
        this.turnOnAlert = this.turnOnAlert.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {

    }

    handleSubmit(event) {

        this.applyValueOfRadio();

        event.preventDefault();

        if (!event.target.checkValidity()) {
            this.setState({ displayErrors: true });
            return;
        }
        else if (this.state.user[0].password != this.state.user[0].passwordConfirme) {
            this.turnOnAlert();
            return;
        }
        else {
            APIService.post('createuser', {
                username: this.state.user[0].username,
                password: this.state.user[0].password,
                isadmin: this.state.user[0].isAdmin
            })
        }

    }


    getRadioValue(theRadioGroup) {
        var elements = document.getElementsByName(theRadioGroup);
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].checked) {
                return elements[i].value;
            }
        }
    }

    applyValueOfRadio() {

        let isadminValue = this.getRadioValue('isadmin');

        var statename = { ...this.state.user }


        statename[0].isAdmin = isadminValue;
        this.setState({ statename })

    }

    changeUsername(event) {
        var statename = { ...this.state.user }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].username = value;
        this.setState({ statename })
    }
    changePassword(event) {
        var statename = { ...this.state.user }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].password = value;
        this.setState({ statename })
    }
    changePasswordConfirme(event) {
        var statename = { ...this.state.user }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].passwordConfirme = value;
        this.setState({ statename })
    }

    turnOnAlert() {
        this.setState({ enableAlert: true });
    }

    returnInput(text, type, id, value, placeholder, onChange, pattern, classesdiv, classesinput, errorMessage, enableValidation, required) {
        return <InputComponentForm text={text} type={type} id={id} value={value} placeholder={placeholder} onChange={onChange} pattern={enableValidation ? pattern : ""} classesdiv={classesdiv} classesinput={classesinput} required={required != undefined ? "required" : ""} errorMessage={errorMessage} spantext={required != undefined ? "*" : ""} />
    }

    render() {

        const { displayErrors } = this.state;
        return (

            <form onSubmit={this.handleSubmit} className={displayErrors ? 'was-validated' : ''} noValidate>
                {this.state.enableAlert ? <div className="alert alert-danger" role="alert">password must match</div> : <div></div>}
                <div className="container text-center">
                    <h2>Create user</h2>

                    <div className="form-group row justify-content-center">
                        {this.returnInput("Username :", "text", "username", this.state.user[0].username, "Username", this.changeUsername, ".*", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                    </div>
                    <div className="form-group row justify-content-center">
                        {this.returnInput("Password :", "password", "", this.state.user[0].password, "", this.changePassword, ".*", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                    </div>
                    <div className="form-group row justify-content-center">
                        {this.returnInput("Confirme password :", "password", "passwordconfirme", this.state.user[0].passwordConfirme, "", this.changePasswordConfirme, ".*", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                    </div>


                    <div className="form-group row justify-content-center">
                        <RadioFormComponent legend="What kind of user?" id="isadmin" name="isadmin" options={this.state.isAdmin} checked="" />
                    </div>
                    <div className="form-group row justify-content-center">

                        <button className="btn btn-primary btn-lg" >Create</button>

                    </div>
                </div>

            </form>


        )
    }

}
export default CreateUserContainer
