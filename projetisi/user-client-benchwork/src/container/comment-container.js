import React, { Component } from 'react';
import APIService from "service/api-service";
import CommentComponent from "component/comment-component"


class CommentContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
        }


        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        APIService.post('getcommentbyidstudent', {
            idstudent: 7
        }).then(response => {
            this.setState({ comment: response.data });
        })

    }
    handleSubmit(event) {

    }


    render() {
        return (

            <form>
                <CommentComponent
                    comments={this.state.comments}
                />


            </form>


        )
    }

}
export default CommentContainer
