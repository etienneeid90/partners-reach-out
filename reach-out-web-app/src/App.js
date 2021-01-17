import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/* Components */
import InputsPreview from './components/InputsPreview';
import ResponsePreview from './components/ResponsePreview';
import ReachOutForm from './components/ReachOutForm';
/* Services */
import PartnersServices from './services/PartnersService';
/* Utils */
import {validate} from './utils/ValidateApiParams';

class App extends Component {
	constructor() {
		super();

		// local state
		this.state = {
            jsonParams: '',
            showResponse: false,
            apiResponse: {}
		};

		// class attributes
		this.partners = [];
		this.range = null;
		this.latitude = null;
		this.longitude = null;
		this.allParams = {};

		// binding functions
		this.editRange = this.editRange.bind(this);
		this.editLatitude = this.editLatitude.bind(this);
		this.editLongitude = this.editLongitude.bind(this);
		this.editPartners = this.editPartners.bind(this);
		this.parsePartners = this.parsePartners.bind(this);
        this.onReachOut = this.onReachOut.bind(this);
        this.hideResponse = this.hideResponse.bind(this);
	}

	/**
	 * called on range edit
	 * updates the range value in this component and calls editJsonParams
	 * @param {string} r the new range value
	 */
	editRange(r) {
		this.range = r || null;
		this.editJsonParams();
	}

	/**
	 * called on latitude edit
	 * updates the latitude value in this component and calls editJsonParams
	 * @param {string} l the new latitude value
	 */
	editLatitude(l) {
		this.latitude = l || null;
		this.editJsonParams();
	}

	/**
	 * called on longitude edit
	 * updates the longitude value in this component and calls editJsonParams
	 * @param {string} l the new longitude value
	 */
	editLongitude(l) {
		this.longitude = l || null;
		this.editJsonParams();
	}

	/**
	 * called on partners edit
	 * updates the partners value in this component and calls editJsonParams.
	 * @param {string} p the new partners value
	 */
	editPartners(p) {
		this.partners = p || [];
		this.editJsonParams();
	}

	/**
	 * Prepares the parameters to send to the api
	 */
	editJsonParams() {
		// if range has been provided then fill it in 'allParams' else remove it from this last
		if (this.range) {
			this.allParams.range = Number(this.range);
		} else {
			delete this.allParams.range;
		}

		const rendezvousCoordinates = [];
		// fill the latitude if it has been provided
		if (this.latitude && this.latitude != null) {
			rendezvousCoordinates.push(Number(this.latitude));
		}

		// fill the longitude if it has been provided
		if (this.longitude && this.longitude != null) {
			rendezvousCoordinates.push(Number(this.longitude));
		}

		// if rendezvousCoordinates is an array of 2 elements then fill it in 'allParams' else remove it from this last
		if (rendezvousCoordinates.length === 2) {
			this.allParams.rendezvousCoordinates = rendezvousCoordinates;
		} else {
			delete this.allParams.rendezvousCoordinates;
		}

		// if partners is an array of 2 elements then fill it in 'allParams' else remove it from this last
		this.partners = String(this.partners);
		if (
			this.partners &&
			this.partners.startsWith('[') &&
			this.partners.endsWith(']')
		) {
			this.allParams.partners = this.parsePartners(this.partners);
		} else {
			delete this.allParams.partners;
		}

		this.setState({ jsonParams: JSON.stringify(this.allParams, null, 4) });
	}

	/**
	 * Parses the partners list filled by the client if parse-able if not it returns an empty array
	 * @param {string} partners the client's list of partners
	 */
	parsePartners(partners) {
        try {
			return JSON.parse(partners);
		} catch (error) {
			return [];
		}
	}

    /**
	 * Hides the api response to re-show the inputs preview
	 */
	hideResponse() {
		this.setState({showResponse: false, apiResponse: {}});
	}

    /**
	 * Calls the backend to return the list of partners within the given range
	 * @param {number} range [Required] the given range
	 * @param {array} rendezvousCoordinates [Optional] the coordinate of the location to meet
	 * @param {array} partners [Optional] list of partners
     * @returns {json}
	 */
	onReachOut() {

        // Add the validation here
        const validationResult = validate(this.allParams);
        if(validationResult.status === 'error'){
            this.setState({showResponse: true, apiResponse: validationResult});
            return;
        }

		new PartnersServices().reachOutToPartnersInRange(
			this.allParams,
			(response) => {
                this.setState({showResponse: true, apiResponse: response.data});
			},
			(error) => {
                this.setState({showResponse: true, apiResponse: error.response.data});
                
			}
		);
	}

	render() {
		return (
			<div className='ui'>
				<h1 className='ui center aligned icon header'>
					<i className='circular users icon'></i>
					Reach Out To Partners
				</h1>
				<div className='ui container two column divided grid'>
					<div className='ui container column'>
						<ReachOutForm
							onRangeChange={this.editRange}
							onLatitudeChange={this.editLatitude}
							onLongitudeChange={this.editLongitude}
							onPartnersChange={this.editPartners}
						/>
					</div>
					<div className='ui container column'>
                        {this.state.showResponse && (
							<ResponsePreview
								apiResponse={this.state.apiResponse}
								hideResponse={this.hideResponse}
							/>
						)}
						{!this.state.showResponse && (
							<InputsPreview
								jsonParams={this.state.jsonParams}
								onReachOut={this.onReachOut}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
