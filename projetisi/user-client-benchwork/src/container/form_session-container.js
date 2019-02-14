import React, { Component } from "react";
import InputComponentForm from "component/inputform-component";
import RadioFormComponent from "component/radioform-component";
import ApiService from "../service/api-service"
class FormSessionContainer extends Component {
    constructor() {
        super();

        this.state = ({
            session: [{
                idsession: 0,
                namesession: '',
                yearsession: '',
                datestartsession: '',
                dateendsession: '',
                isactive: 1
            }],
            ispdate: false,
            yesno: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }],
            enableValidation: true,
            displayErrors: false,

        })

        this.addSession = this.addSession.bind(this)
        this.onChangenamesession = this.onChangenamesession.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeDateEnd = this.onChangeDateEnd.bind(this)
        this.onChangeDateStart = this.onChangeDateStart.bind(this)

        this.getSessionByid = this.getSessionByid.bind(this)
        this.updateSession = this.updateSession.bind(this)
        this.applyValueOfRadio = this.applyValueOfRadio.bind(this);
        this.checkedSubmitOrUpdate = this.checkedSubmitOrUpdate.bind(this)


    }

    updateSession() {
        ApiService.post('updatesession', {
            idsession: this.props.idsession,
            namesession: this.state.namesession,
            datestartsession: this.state.datestartsession,
            dateendsession: this.state.dateendsession,
            isactive: this.state.isactive,
            yearsession: this.state.yearsession,

        })
    }


    addSession() {
        ApiService.post('addsession', {
            namesession: this.state.namesession,
            datestartsession: this.state.datestartsession,
            dateendsession: this.state.dateendsession,
            isactive: this.state.isactive,
            yearsession: this.state.yearsession,

        })

    }
    checkedSubmitOrUpdate() {
        this.applyValueOfRadio();
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ displayErrors: true });
            return;
        } else {
            if (this.session.idsession != 0) {
                this.updateSession()
                this.setState({
                    ispdate: true
                })
            }
            else {
                this.addSession()
            }
        }

    }
    onChangenamesession(event) {
        var statename = { ...this.state.session }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].namesession = value;
        this.setState({ statename })

    }
    onChangeYear(event) {
        var statename = { ...this.state.session }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].yearsession = value;
        this.setState({ statename })

    }
    onChangeDateStart(event) {
        var statename = { ...this.state.session }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].datestartsession = value;
        this.setState({ statename })

    }
    onChangeDateEnd(event) {
        var statename = { ...this.state.session }
        const value = function () {
            return this.target.value;
        }.bind(event)();
        statename[0].dateendsession = value;
        this.setState({ statename })

    }

    getSessionByid() {
        ApiService.post('getsessionbyid', {
            idsession: this.props.idsession
        }).then(response => {
            this.setState({
                session: response.data
            })
        })

    }
    componentDidMount() {
        if (this.props.idsession != undefined) {
            this.getSessionByid()
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

        let isadminValue = this.getRadioValue('isactive');

        var statename = { ...this.state.session }

        statename[0].isactive = isadminValue;
        this.setState({ statename })

    }

    returnInput(text, type, id, value, placeholder, onChange, pattern, classesdiv, classesinput, errorMessage, enableValidation, required) {
        return <InputComponentForm text={text} type={type} id={id} value={value} placeholder={placeholder} onChange={onChange} pattern={enableValidation ? pattern : ""} classesdiv={classesdiv} classesinput={classesinput} required={required != undefined ? "required" : ""} errorMessage={errorMessage} spantext={required != undefined ? "*" : ""} />
    }
    render() {
        const { displayErrors } = this.state;
        return (

            <form onSubmit={this.checkedSubmitOrUpdate} className={displayErrors ? 'was-validated' : ''} noValidate>
                <div className="form-group row justify-content-center">
                    {this.returnInput("Name :", "text", "namession", this.state.session[0].namesession, "", this.onChangenamesession, ".*", "col-md-3", "form-control", "Can't be empty", this.state.enableValidation, "required")}
                </div>
                <div className="form-group row justify-content-center">
                    {this.returnInput("Year :", "text", "year", this.state.session[0].yearsession, "", this.onChangeYear, "^[0-9]{4}$", "col-md-3", "form-control", "Can't be empty, number 4 only", this.state.enableValidation, "required")}
                </div>
                <div className="form-group row justify-content-center">
                    {this.returnInput("Date start :", "text", "datestart", this.state.session[0].datestartsession, "YYYY/MM/DD", this.onChangeDateStart, "\\d{4}\\/\\d{2}/\\d{2}", "col-md-3", "form-control", "Invalide format, YYYY/MM/DD", this.state.enableValidation, "required")}
                </div>
                <div className="form-group row justify-content-center">
                    {this.returnInput("Date End :", "text", "dateend", this.state.session[0].dateendsession, "YYYY/MM/DD", this.onChangeDateEnd, "\\d{4}\\/\\d{2}/\\d{2}", "col-md-3", "form-control", "Invalide format, YYYY/MM/DD", this.state.enableValidation, "required")}
                </div>

                <div className="form-group row justify-content-center">
                    <RadioFormComponent legend="is the session active?" id="isactive" name="isactive" options={this.state.yesno} checked={this.state.session[0].isactive} />
                </div>
                <div className="form-group row justify-content-center">
                    <button className="btn btn-success">{this.props.idsession != null ? 'update' : 'submit'}</button>
                </div>
            </form>

        );
    }
}
export default FormSessionContainer
