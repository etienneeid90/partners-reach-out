import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/* Components */
import InputsPreview from './components/InputsPreview';
import ReachOutForm from './components/ReachOutForm';

class App extends Component {
	constructor() {
		super();

		this.state = {
			jsonParams: '',
        };
        
        this.partners = [];
		this.range = null;
		this.latitude = null;
        this.longitude = null;

        this.allParams = {};
        
        this.editRange = this.editRange.bind(this);
        this.editLatitude = this.editLatitude.bind(this);
        this.editLongitude = this.editLongitude.bind(this);
        this.editPartners = this.editPartners.bind(this);

        this.parsePartners = this.parsePartners.bind(this);
	}

    /**
     * called on range edit
     * updates the range value in this component and calls editJsonParams
     * @param {string} r the new range value
    */ 
	editRange(r) {
        this.range= r || null;
        this.editJsonParams();
    }

    /**
     * called on latitude edit
     * updates the latitude value in this component and calls editJsonParams
     * @param {string} l the new latitude value
    */ 
    editLatitude(l) {
        this.latitude= l || null;
        this.editJsonParams();
    }

    /**
     * called on longitude edit
     * updates the longitude value in this component and calls editJsonParams
     * @param {string} l the new longitude value
    */ 
    editLongitude(l) {
        this.longitude= l || null;
        this.editJsonParams();
    }

    /**
     * called on partners edit
     * updates the partners value in this component and calls editJsonParams.
     * @param {string} p the new partners value
    */ 
    editPartners(p) {
        this.partners= p || [];
        this.editJsonParams();
    }
    
    /**
     * Prepares the parameters to send to the api
    */ 
	editJsonParams() {

        // if range has been provided then fill it in 'allParams' else remove it from this last
        if(this.range){
            this.allParams.range = this.range;
        } else {
            delete this.allParams.range;
        }

        const rendezvousCoordinates = [];
        // fill the latitude if it has been provided
        if(this.latitude && this.latitude != null){
            rendezvousCoordinates.push(Number(this.latitude));
        }

        // fill the longitude if it has been provided
        if(this.longitude && this.longitude != null){
            rendezvousCoordinates.push(Number(this.longitude));
        }

        // if rendezvousCoordinates is an array of 2 elements then fill it in 'allParams' else remove it from this last
        if(rendezvousCoordinates.length === 2) {
            this.allParams.rendezvousCoordinates = rendezvousCoordinates;
        } else {
            delete this.allParams.rendezvousCoordinates;
        }

        // if partners is an array of 2 elements then fill it in 'allParams' else remove it from this last
        this.partners = String(this.partners);
        if(this.partners && this.partners.startsWith('[') && this.partners.endsWith(']')){
            this.allParams.partners = this.parsePartners(this.partners);
        } else {
            delete this.allParams.partners
        }

		this.setState({ jsonParams: JSON.stringify(this.allParams, null, 4) });
    }
    

    /**
     * Parses the partners list filled by the client if parse-able if not it returns an empty array
     * @param {string} partners the client's list of partners
     */
    parsePartners(partners){
        try {
            return JSON.parse(partners);
        } catch (error) {
            return [];
        }
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
                            onRangeChange = {this.editRange}
                            onLatitudeChange = {this.editLatitude}
                            onLongitudeChange = {this.editLongitude}
                            onPartnersChange = {this.editPartners}
                        />
					</div>
					<div className='ui container column'>
						<InputsPreview jsonParams={this.state.jsonParams}/>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
