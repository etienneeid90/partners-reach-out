import React, { Component } from 'react';

class ErrorResponse extends Component {

	render() {
		return (
            <div className='ui negative message'>
                <div className='header'>
                    {this.props.errorType}
                </div>
                <p>{this.props.errorMessage}</p>
            </div>
		);
	}
}

export default ErrorResponse;
