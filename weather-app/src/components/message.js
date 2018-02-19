import React from 'react';

const Message = (props) => {
    return (
        <div className="row">
            <label className="control-label col-md-2 col-md-offset-4">{props.message}</label>
        </div>
    );
}

export default Message;