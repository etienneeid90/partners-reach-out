import React, { Component } from 'react';

class InputsPreview extends Component {

	render() {
		return (
            <React.Fragment>
                <h3 className='ui block header'>
                        Inputs Preview (The API params)
                    </h3>
                    <button 
                        className='positive ui button'
                        onClick={ () => {
                            this.props.onReachOut();
                        }}
                    >
                        Reach Out
                    </button>
                <pre>
                    <code>{this.props.jsonParams}</code>
                </pre>
            </React.Fragment>
		);
	}
}

export default InputsPreview;
