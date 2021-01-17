import React, { Component } from 'react';

class PartnerRow extends Component {

	render() {
		return (
            <div className='item'>
                <i className='large middle aligned'></i>
                <div className='content'>
                <p className='header'>{this.props.name}</p>
                <div className='description'>{this.props.distance.toFixed(4)} Km away</div>
                </div>
            </div>
		);
	}
}

export default PartnerRow;
