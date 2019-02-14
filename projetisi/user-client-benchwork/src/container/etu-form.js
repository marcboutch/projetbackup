import React, { Component } from 'react';
import APIService from "service/api-service";
import InputComponentForm from "component/inputform-component";
import SelectFormComponent from "component/selectform-component";
import RadioFormComponent from "component/radioform-component";

class EtuformContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            programs: [],
            sessions: [],
            yesno: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }],
            student: [{
                streetname: "",
                streetno: "",
                apt: "",
                postalcode: "",
                pobox: "",
                province: "",
                city: "",
                firstname: "",
                lastname: "",
                birthday: "",
                email: "",
                telephone: "",
                programid: "",
                sessionid: "",
                hasCAQorMIDI: "",
                isfeesprepaid: "",
                idnumber: 0,
                verdictid: 3,
                statutid: 4,
                isexchangestudent: "",
                isbillpaid: 0,
                isfactured: 0,
                idstudent: 0

            }],
            zero: 0,
            enableValidation: true,
            displayErrors: false,
            retourIDNumber: false

        }
        this.changeStreetNo = this.changeStreetNo.bind(this);
        this.changeStreetName = this.changeStreetName.bind(this);
        this.changeApt = this.changeApt.bind(this);
        this.changePostalCode = this.changePostalCode.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeCountry = this.changeCountry.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.changePobox = this.changePobox.bind(this);
        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.changeBirthday = this.changeBirthday.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeTelephone = this.changeTelephone.bind(this);
        this.onChangeProgram = this.onChangeProgram.bind(this);
        this.onChangeSession = this.onChangeSession.bind(this);
        this.onChangeHasCAQorMIDI = this.onChangeHasCAQorMIDI.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
        this.turnOnValidation = this.turnOnValidation.bind(this);
        this.turnOffValidation = this.turnOffValidation.bind(this);

        this.createStudent = this.createStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.generatedIdNumber = this.generatedIdNumber.bind(this);
        this.applyValueOfRadio = this.applyValueOfRadio.bind(this);
        this.testIdUniqueIdNumber = this.testIdUniqueIdNumber.bind(this);
    }
    componentDidMount() {
        APIService.get("programform").then(response => {
            this.setState({ programs: response.data });
        })

        APIService.get("getsessionforselect").then(response => {
            this.setState({ sessions: response.data });
        })
        let idstudent = this.state.student[0].idstudent;

        if (idstudent == 0) {
            this.generatedIdNumber();
        }
        APIService.get("studenttest").then(response => {
            this.setState({ student: response.data });
        })
    }

    handleSubmit(event) {
        let idstudent = this.state.student[0].idstudent;
        this.applyValueOfRadio();

        event.preventDefault();
        if (this.state.enableValidation) {
            if (!event.target.checkValidity()) {
                this.setState({ displayErrors: true });
                return;
            } else if (idstudent == 0) {
                console.log("create, verifier") //eslint-disable-line
                this.createStudent();
            } else if (idstudent != 0) {
                console.log("update, verifier") //eslint-disable-line
                this.updateStudent();
            }

        } else {
            if (idstudent == 0) {
                console.log("create, nonverifier") //eslint-disable-line
                this.createStudent();
            } else if (idstudent != 0) {
                console.log("update, nonverifier") //eslint-disable-line
                this.updateStudent();
            }
        }



    }

    createStudent() {
        APIService.post('createstudent', {
            lastname: this.state.student[0].lastname,
            firstname: this.state.student[0].firstname,
            birthday: this.state.student[0].birthday,
            idnumber: this.state.student[0].idnumber,
            hasCAQorMIDI: this.state.student[0].hasCAQorMIDI,
            programid: this.state.student[0].programid,
            sessionid: this.state.student[0].sessionid,
            verdictid: this.state.student[0].verdictid,
            statutid: this.state.student[0].statutid,
            isfeesprepaid: this.state.student[0].isfeesprepaid,
            isexchangestudent: this.state.student[0].isexchangestudent,
            streetname: this.state.student[0].streetname,
            streetno: this.state.student[0].streetno,
            apt: this.state.student[0].apt,
            city: this.state.student[0].city,
            country: this.state.student[0].country,
            province: this.state.student[0].province,
            postalcode: this.state.student[0].postalcode,
            pobox: this.state.student[0].pobox,
            isfactured: this.state.student[0].isfactured,
            isbillpaid: this.state.student[0].isbillpaid,
            email: this.state.student[0].email,
            telephone: this.state.student[0].telephone
        })
    }
    updateStudent() {
        APIService.post('updatestudent', {
            idstudent: this.state.student[0].idstudent,
            lastname: this.state.student[0].lastname,
            firstname: this.state.student[0].firstname,
            birthday: this.state.student[0].birthday,
            idnumber: this.state.student[0].idnumber,
            hasCAQorMIDI: this.state.student[0].hasCAQorMIDI,
            programid: this.state.student[0].programid,
            sessionid: this.state.student[0].sessionid,
            verdictid: this.state.student[0].verdictid,
            statutid: this.state.student[0].statutid,
            isfeesprepaid: this.state.student[0].isfeesprepaid,
            isexchangestudent: this.state.student[0].isexchangestudent,
            streetname: this.state.student[0].streetname,
            streetno: this.state.student[0].streetno,
            apt: this.state.student[0].apt,
            city: this.state.student[0].city,
            country: this.state.student[0].country,
            province: this.state.student[0].province,
            postalcode: this.state.student[0].postalcode,
            pobox: this.state.student[0].pobox,
            isfactured: this.state.student[0].isfactured,
            isbillpaid: this.state.student[0].isbillpaid,
            email: this.state.student[0].email,
            telephone: this.state.student[0].telephone
        })
    }

    generatedIdNumber() {
        console.log('generated')//eslint-disable-line
        let random = Math.floor((Math.random() * 1000000000) - 1)
        var statename = { ...this.state.student }
        statename[0].idnumber = random;
        this.setState({ statename })
    }

    testIdUniqueIdNumber(number) {

        APIService.post('getstudentbyidnumber', {
            idnumber: number
        }).then(response => {
            this.setState({ retourIDNumber: response.data });
        })
        return this.state.retourIDNumber;
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
        let hasCAQorMIDIvalue = this.getRadioValue('hasCAQorMIDI');
        if (hasCAQorMIDIvalue === undefined) {
            hasCAQorMIDIvalue = 0;
        }
        let isfeesprepaidValue = this.getRadioValue('isfeesprepaid');
        if (isfeesprepaidValue === undefined) {
            isfeesprepaidValue = 0;
        }

        let isexchangestudentValue = this.getRadioValue('isexchangestudent');
        if (isexchangestudentValue === undefined) {
            isexchangestudentValue = 0;
        }
        var statename = { ...this.state.student }

        statename[0].hasCAQorMIDI = hasCAQorMIDIvalue;
        this.setState({ statename })
        statename[0].isfeesprepaid = isfeesprepaidValue;
        this.setState({ statename })
        statename[0].isexchangestudent = isexchangestudentValue;
        this.setState({ statename })


    }


    changeStreetNo(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].streetno = value;
        this.setState({ statename })
    }
    changeStreetName(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].streetname = value;
        this.setState({ statename })
    }
    changeApt(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].apt = value;
        this.setState({ statename })
    }
    changePostalCode(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].postalcode = value;
        this.setState({ statename })
    }
    changeCity(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].city = value;
        this.setState({ statename })
    }
    changeCountry(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].country = value;
        this.setState({ statename })
    }
    changeProvince(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].province = value;
        this.setState({ statename })
    }
    changePobox(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].pobox = value;
        this.setState({ statename })
    }
    changeFirstname(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].firstname = value;
        this.setState({ statename })
    }
    changeLastname(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].lastname = value;
        this.setState({ statename })
    }
    changeBirthday(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].birthday = value;
        this.setState({ statename })
    }
    changeEmail(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].email = value;
        this.setState({ statename })
    }
    changeTelephone(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].telephone = value;
        this.setState({ statename })
    }
    onChangeProgram(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].programid = value;
        this.setState({ statename })
    }
    onChangeSession(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].sessionid = value;
        this.setState({ statename })
    }
    onChangeHasCAQorMIDI(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].hasCAQorMIDI = value;
        this.setState({ statename })
    }

    turnOnValidation() {
        this.setState({ enableValidation: true });
        var student = { ...this.state.student }
        student[0].statutid = 1;
        this.setState({ student })
    }
    turnOffValidation() {
        this.setState({ enableValidation: false });
        var student = { ...this.state.student }
        student[0].statutid = 4;
        this.setState({ student })
    }

    returnInput(text, type, id, value, placeholder, onChange, pattern, classesdiv, classesinput, errorMessage, enableValidation, required) {
        return <InputComponentForm text={text} type={type} id={id} value={value} placeholder={placeholder} onChange={onChange} pattern={enableValidation ? pattern : ""} classesdiv={classesdiv} classesinput={classesinput} required={required != undefined ? "required" : ""} errorMessage={errorMessage} spantext={required != undefined ? "*" : ""} />
    }

    render() {
        const { displayErrors } = this.state;
        console.log(this.state.student[0].idnumber) //eslint-disable-line
        return (
            <form onSubmit={this.handleSubmit} className={displayErrors ? 'was-validated' : ''} noValidate>

                <div className="container">
                    <h2>Personnal information</h2>

                    <div className="form-group row">
                        {this.returnInput("Firstname :", "text", "firstname", this.state.student[0].firstname, "First name", this.changeFirstname, "\\D+", "col-md-3", "form-control", "Can't be empty, write n/a if the student doesn't have first name", this.state.enableValidation, "required")}
                        {this.returnInput("Lastname :", "text", "lastname", this.state.student[0].lastname, "Last name", this.changeLastname, "\\D+", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                        {this.returnInput("Birthday :", "text", "birthday", this.state.student[0].birthday, "YYYY/MM/DD", this.changeBirthday, "\\d{4}\\/\\d{2}/\\d{2}", "col-md-3", "form-control", "Invalide format, YYYY/MM/DD", this.state.enableValidation, "required")}
                    </div>
                    <div className="form-group row">
                        {this.returnInput("Email:", "email", "email", this.state.student[0].email, "email", this.changeEmail, ".*", "col-md-3", "form-control", "Invalide format", this.state.enableValidation)}
                        {this.returnInput("Telephone :", "text", "telephone", this.state.student[0].telephone, "555-555-5555", this.changeTelephone, ".*", "col-md-3", "form-control", "Invalide formate 555-555-5555", this.state.enableValidation)}
                    </div>
                    <div className="form-group row">
                        {this.returnInput("No :", "text", "streetno", this.state.student[0].streetno, "No", this.changeStreetNo, "[^\\s]+", "col-md-2", "form-control", "Required, no space", this.state.enableValidation, "required")}
                        {this.returnInput("Street name :", "text", "streetname", this.state.student[0].streetname, "Street name", this.changeStreetName, ".*", "col-md-3", "form-control", "Required", this.state.enableValidation, "required")}
                        {this.returnInput("Apt :", "text", "apt", this.state.student[0].apt, "Apt", this.changeApt, ".*", "col-md-2", "form-control", "Required", this.state.enableValidation)}
                        {this.returnInput("Postal Code :", "text", "postalcode", this.state.student[0].postalcode, "Postal code", this.changePostalCode, "^(?!.*[DFIOQU])[a-zA-Z][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]$", "col-md-3", "form-control", "Invalide format, A1A 1A1", this.state.enableValidation, "required")}
                    </div>
                    <div className="form-group row">
                        {this.returnInput("City :", "text", "city", this.state.student[0].city, "city", this.changeCity, "\\D+", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                        {this.returnInput("Country :", "text", "country", this.state.student[0].country, "country", this.changeCountry, "\\D+", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                        {this.returnInput("Province :", "text", "province", this.state.student[0].province, "province", this.changeProvince, "\\D+", "col-md-2", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                        {this.returnInput("P.O box", "text", "pobox", this.state.student[0].pobox, "", this.changePobox, ".*", "col-md-1", "form-control", "", this.state.enableValidation)}


                    </div>

                    <div className="form-group row">
                        <RadioFormComponent legend="Certificat d'acceptation du Quebec (CAQ) or Ministere de l'immigration, Diversite et Inclusion (MIDI) letter :" id="hasCAQorMIDI" name="hasCAQorMIDI" options={this.state.yesno} checked={this.state.student[0].hasCAQorMIDI} />
                    </div>

                    <div className="form-group row">
                        <SelectFormComponent text="Program :" id="programid" options={this.state.programs} onChange={this.onChangeProgram} selected={this.state.student[0].programid} />
                        <SelectFormComponent text="Session :" id="sessionid" options={this.state.sessions} onChange={this.onChangeSession} selected={this.state.student[0].sessionid} />
                    </div>
                    <div className="form-group row">
                        <RadioFormComponent legend="Student is going to prepaid is fees?" id="isfeesprepaid" name="isfeesprepaid" options={this.state.yesno} checked={this.state.student[0].isfeesprepaid} />
                    </div>
                    <div className="form-group row">
                        <RadioFormComponent legend="Student is on a exchange program?" id="isexchangestudent" name="isexchangestudent" options={this.state.yesno} checked={this.state.student[0].isexchangestudent} />
                    </div>
                    <div className="form-group row">

                        <button onClick={this.turnOnValidation} className="btn btn-success" >Save And Submit</button>

                        <button onClick={this.turnOffValidation} className="btn btn-danger" >Save And without submit</button>

                    </div>
                </div>

            </form>


        )
    }

}
export default EtuformContainer
