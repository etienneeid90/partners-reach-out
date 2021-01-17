import React, { Component } from 'react';

class ReachOutForm extends Component {
    constructor(props) {
		super(props);

		this.state = {
            range: undefined,
            latitude: undefined,
			longitude: undefined,
			partners: undefined
		};
	}

	render() {
		return (
			<div className='ui container'>
                
                <h3 className='ui block header'>
                    Inputs
                </h3>
                
				<form className='ui form'>
					<div className='required field'>
						<label>Range In Km</label>
						<input
							type='number'
							min='0'
							name='Range'
							placeholder='Range In Km'
							value={this.state.range}
							onChange={(e) => {
								this.setState({range: e.target.value});
								this.props.onRangeChange(e.target.value);
							}}
							required
						/>
					</div>
					<div className='ui message'>
						<div className='header'>
							Latitude and Longitude
						</div>
						<p>Must be filled together to form an array of coordinates</p>
					</div>
					<div className='field'>
						<label>Latitude In Degrees</label>
						<input
							type='number'
							name='Latitude'
							placeholder='Latitude In Degrees'
							value={this.state.latitude}
							onChange={e=>{
								this.setState({latitude: e.target.value});
								this.props.onLatitudeChange(e.target.value);
							}}
							required
						/>
					</div>
					<div className='field'>
						<label>Longitude In Degrees</label>
						<input
							type='number'
							name='Longitude'
							placeholder='Longitude In Degrees'
							value={this.state.longitude}
							onChange={e=>{
								this.setState({longitude: e.target.value});
								this.props.onLongitudeChange(e.target.value);
							}}
							required
						/>
					</div>
					<div className='field'>
						<label>Partners</label>
						<div className='ui message'>
							<div className='header'>
								Partners Format
							</div>
							<p>Partners must start with '[' and end with ']' to be accepted as an array</p>
							<p>A partner must have at least the following attributes</p>
							<div className='ui bulleted list'>
								<div className='item'>organization</div>
								<div className='item'>offices</div>
							</div>
							<p>Offices is also an array of 1 item at least, and each item must have the following attributes</p>
							<div className='ui bulleted list'>
								<div className='item'>location</div>
								<div className='item'>coordinates</div>
							</div>
						</div>
						<textarea 
							spellCheck='false' 
							placeholder='An array of partners'
							value={this.state.partners}
							onChange={e =>{
								this.setState({partners: e.target.value});
								this.props.onPartnersChange(e.target.value);
							}}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default ReachOutForm;
