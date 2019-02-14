import TableProgrammeContainer from "../container/table_programme-container";
import FormProgrammeContainer from "../container/form_programme-container";
import React, { Component } from "react";
import ApiService from "../service/api-service"
class GlobalProgrammeContainer extends Component {
    constructor() {
        super();

        this.state = ({
            programme: [],
            showFormIsClick: false,
            idprogramme: null

        })
        this.getAllProgramme = this.getAllProgramme.bind(this)
        this.changeisclickedit = this.changeisclickedit.bind(this)
        this.setIdProramme = this.setIdProramme.bind(this)
    }

    getAllProgramme() {
        ApiService.get("getprogram").then(response => {
            this.setState({ programme: response.data });
        })
    }

    setIdProramme(id) {
        if (id)
            this.setState({
                idprogramme: id
            })
    }
    componentDidMount() {
        this.getAllProgramme()

    }
    changeisclickedit(id) {
        if (id >= 0) {
            this.setIdProramme(id);
        }

        this.setState(function (prevState) {
            return { showFormIsClick: !prevState.showFormIsClick };
        });
    }

    render() {

        return (
            <div>

                {this.state.showFormIsClick ? <FormProgrammeContainer idprogram={this.state.idprogramme} /> : <TableProgrammeContainer changeisclickedit={this.changeisclickedit} />}
                <button onClick={this.changeisclickedit} class="btn btn-secondary">
                    {this.state.showFormIsClick ? 'show the list of programme' : 'add programme'}
                </button>
            </div>
        );
    }
}
export default GlobalProgrammeContainer


/*changeStateValue(event) {

    const stateObject = function () {
        const returnObj = {};
        returnObj[this.target.id] = this.target.value;
        return returnObj;
    }.bind(event)();

    this.setState(stateObject);
}*/