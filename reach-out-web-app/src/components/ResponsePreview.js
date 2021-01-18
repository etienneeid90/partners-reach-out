import React, { Component } from 'react';
import ErrorResponse from './ErrorResponse';
import PartnerRow from './PartnerRow';

class ResponsePreview extends Component {

	render() {
		return (
            <React.Fragment>
                <h3 className='ui block header'>
                        API Response
                </h3>
                {this.props.apiResponse.status === 'success'&& this.props.apiResponse.data.partnersToInvite.length > 0 &&
                    <div className='ui relaxed divided list'>
                    {
                        this.props.apiResponse.data.partnersToInvite.map((partner, i) => {
                            return <PartnerRow 
                                key={i}
                                name={partner} 
                                distance={this.props.apiResponse.data.partnersWithDistances[partner]}
                            />
                        })
                    }
                    </div>
                }
                {this.props.apiResponse.status === 'success'&& this.props.apiResponse.data.partnersToInvite.length < 1 &&
                    <div className='ui negative message'>
                        <div className='header'>
                            No partners withing this range
                        </div>
                    </div>
                }
                {this.props.apiResponse.status === 'error'&&
                    <ErrorResponse
                        errorType={this.props.apiResponse.data.errorType}
                        errorMessage={this.props.apiResponse.data.error}
                    />
                }
                <button 
                        className='ui teal button'
                        onClick={ () => {
                            this.props.hideResponse();
                        }}
                    >
                        Back
                </button>
            </React.Fragment>
		);
	}
}

export default ResponsePreview;
