import React from "react";

function buildOption(option, index) {
    return (
        <div>
            {option.nameuser}
        </div>
    )
}
const CommentComponent = ({ comments }) => (

    <div>
        {comments.map((option, index) => buildOption(option, index))}
    </div>

);

export default CommentComponent;
