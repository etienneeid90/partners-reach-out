import React, { Component } from 'react';

class InputsPreview extends Component {
    constructor() {
		super();

		this.state = {
            range: null,
            latitude: null,
            longitude: null
		};
	}

	render() {
		return (
            <React.Fragment>
                <h3 className='ui block header'>
                        Inputs Preview (The API params)
                    </h3>
                <pre>
                    <code>{this.props.jsonParams}</code>
                </pre>
            </React.Fragment>
		);
	}
}

export default InputsPreview;
