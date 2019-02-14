import React, { Component } from 'react';
import APIService from "service/api-service";
import InputComponentForm from "component/inputform-component";
import SelectFormComponent from "component/selectform-component";
import RadioFormComponent from "component/radioform-component";
import ButtonSubmitComponent from "component/button-submit-component";


const PERSONAL = 'personal';
const ADMINISTRATION = 'Administration';

class EtuformIsiContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            programs: [],
            sessions: [],
            verdict: [],
            statut: [],
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
                verdictid: 1,
                statutid: 4,
                isexchangestudent: "",
                isbillpaid: 0,
                isfactured: 0,
                idstudent: 0

            }],
            zero: 0,
            enableValidation: true,
            displayErrors: false,
            retourIDNumber: false,
            updateInfoFor: ''

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
        this.onChangeVerdict = this.onChangeVerdict.bind(this);
        this.onChangeStatut = this.onChangeStatut.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);



        this.updateStudentPersonnal = this.updateStudentPersonnal.bind(this);
        this.updateStudentAdministrative = this.updateStudentAdministrative.bind(this);
        this.generatedIdNumber = this.generatedIdNumber.bind(this);
        this.applyValueOfRadio = this.applyValueOfRadio.bind(this);
        this.testIdUniqueIdNumber = this.testIdUniqueIdNumber.bind(this);

        this.setUpdateForPersonal = this.setUpdateForPersonal.bind(this);
        this.setUpdateForAdministation = this.setUpdateForAdministation.bind(this);



    }
    componentDidMount() {
        APIService.get("programform").then(response => {
            this.setState({ programs: response.data });
        })

        APIService.get("getsessionforselect").then(response => {
            this.setState({ sessions: response.data });
        })
        APIService.get("getallstatut").then(response => {
            this.setState({ statut: response.data });
        })
        APIService.get("getallverdict").then(response => {
            this.setState({ verdict: response.data });
        })
        let idstudent = this.state.student[0].idstudent;

        if (idstudent == 0) {
            this.generatedIdNumber();
        }
        APIService.get("studenttest").then(response => {
            this.setState({ student: response.data });
        })

        if (this.state.student[0].verdictid === 1) {
            this.setState({ idVerdictAccpted: true })
        }
    }

    handleSubmit(event) {
        let idstudent = this.state.student[0].idstudent;
        this.applyValueOfRadio();


        event.preventDefault();
        console.log('Dans en handlesubmit') //eslint-disable-line
        if (this.state.updateInfoFor === PERSONAL) {
            console.log(PERSONAL) //eslint-disable-line
            this.updateStudentPersonnal();
        } else if (this.state.updateInfoFor === ADMINISTRATION) {
            console.log(ADMINISTRATION) //eslint-disable-line
            this.updateStudentAdministrative();
        }

    }

    updateStudentPersonnal() {
        APIService.post('updatestudentpersonnal', {
            idstudent: this.state.student[0].idstudent,
            lastname: this.state.student[0].lastname,
            firstname: this.state.student[0].firstname,
            birthday: this.state.student[0].birthday,
            idnumber: this.state.student[0].idnumber,
            hasCAQorMIDI: this.state.student[0].hasCAQorMIDI,
            programid: this.state.student[0].programid,
            sessionid: this.state.student[0].sessionid,
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
            email: this.state.student[0].email,
            telephone: this.state.student[0].telephone
        })
    }

    updateStudentAdministrative() {
        APIService.post('updatestudentadmin', {
            idstudent: this.state.student[0].idstudent,
            verdictid: this.state.student[0].verdictid,
            statutid: this.state.student[0].statutid,
            isfactured: this.state.student[0].isfactured,
            isbillpaid: this.state.student[0].isbillpaid,
        })
    }

    generatedIdNumber() {
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

        let isbillpaidValue = this.getRadioValue('isbillpaid');
        let isfacturedValue = this.getRadioValue('isfactured');

        var statename = { ...this.state.student }

        statename[0].hasCAQorMIDI = hasCAQorMIDIvalue;
        this.setState({ statename })
        statename[0].isfeesprepaid = isfeesprepaidValue;
        this.setState({ statename })
        statename[0].isbillpaid = isbillpaidValue;
        this.setState({ statename })
        statename[0].isfactured = isfacturedValue;
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
    onChangeVerdict(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].verdictid = value;
        this.setState({ statename })
    }
    onChangeStatut(event) {
        var statename = { ...this.state.student }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].statutid = value;
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

    setUpdateForPersonal() {
        this.setState({ updateInfoFor: PERSONAL })
    }
    setUpdateForAdministation() {
        this.setState({ updateInfoFor: ADMINISTRATION })
    }



    returnInput(text, type, id, value, placeholder, onChange, pattern, classesdiv, classesinput, errorMessage, enableValidation, required) {
        return <InputComponentForm text={text} type={type} id={id} value={value} placeholder={placeholder} onChange={onChange} pattern={enableValidation ? pattern : ""} classesdiv={classesdiv} classesinput={classesinput} required={required != undefined ? "required" : ""} errorMessage={errorMessage} spantext={required != undefined ? "*" : ""} />
    }

    render() {
        const { displayErrors } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={displayErrors ? 'was-validated' : ''} noValidate>

                <div className="container">
                    <h3>Administration information</h3>
                    <div className="form-group row">
                        <SelectFormComponent text="Status :" id="statusid" options={this.state.statut} onChange={this.onChangeStatut} selected={this.state.student[0].statutid} />
                        <SelectFormComponent text="Verdict :" id="statusid" options={this.state.verdict} onChange={this.onChangeVerdict} selected={this.state.student[0].verdictid} />
                    </div>
                    <div className="form-group row">
                        <RadioFormComponent legend="Student has been factured? :" id="isfactured" name="isfactured" options={this.state.yesno} checked={this.state.student[0].isfactured} />
                        <RadioFormComponent legend="Student has paid the bill? :" id="isbillpaid" name="isbillpaid" options={this.state.yesno} checked={this.state.student[0].isbillpaid} />
                    </div>
                    <div className="form-group row">
                        <ButtonSubmitComponent text='Save administration info' className="btn btn-success" onClick={(e) => { if (window.confirm('Are you sure you want to edit this student?')) this.setUpdateForAdministation(e) }} />
                    </div>

                    <hr className="danger" />
                    <h3>Personnal information</h3>

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
                        <ButtonSubmitComponent text='Save administration info' className="btn btn-success" onClick={(e) => { if (window.confirm('Are you sure you want to edit this student?')) this.setUpdateForPersonal(e) }} />
                    </div>
                </div>

            </form>


        )
    }

}
export default EtuformIsiContainer
