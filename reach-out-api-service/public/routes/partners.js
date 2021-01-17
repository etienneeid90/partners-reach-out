const logger = require('../utils/logger');
const express = require('express');

// New Express Router
const partnersRouter = express.Router();

/**
 * Returns a list partners withing a given range, sorted by partner name
 * @param {array} partners list of partners
 * @param {number} range the given range
 * @param {array} rendezvousCoordinates the coordinate of the location to meet
 * @returns {json}
*/
partnersRouter.post('/in-range', (req, res) => {
    // the string which every log will start with
    const logPrefix = `${__filename.split(/(\\|\/)/g).pop()}, ${req.headers.requestId}`;
    try {
		// the great circle distance calculator
		const gcdCalculator =  require('../utils/gcdCalculator');

		logger.info(`${logPrefix} - ${req.body.hasOwnProperty('partners') ? 'A list of partners has been provided' : 'No list of partners has been provided'}`);
		// The Client's list of partners
		const partners = req.body.partners || require('../constants/partners.json');

		logger.info(`${logPrefix} - Converting the offices coordinates to arrays`);
		for(p of partners){
			if(p.hasOwnProperty('offices') && p.offices.length){
				for(o of p.offices){
					if(o.hasOwnProperty('coordinates') && typeof o.coordinates == 'string'){
						o.coordinates = (o.coordinates.split(',')).map((c) => Number(c));
					}
				}
			}
		}

		logger.info(`${logPrefix} - The provided range is: ${req.body.range} Km`);
		// the given range in kilometers
		const range = req.body.range;

		logger.info(`${logPrefix} - ${req.body.hasOwnProperty('rendezvousCoordinates') ? 'RendezVous coordinates have been provided' : 'No rendezvous coordinates have been provided'}`);
		// the rendezvous coordinates by default Starbucks Cafe Central London 
		const rendezvousCoordinates = req.body.rendezvousCoordinates || [51.5144636,-0.142571];

		logger.info(`${logPrefix} - Validating the provided inputs`);
		const validationRes = validateInputs(logPrefix, req.body);
		if(validationRes.status != 'success'){
			logger.error(`${logPrefix} - Returning Validation Error "${validationRes.data.message}"`);

			// returning the result to the client
			return res.status(400).send({
				status: 'error',
				data:{
					errorType: 'Validation Error',
					error: validationRes.data.message
				}
			});
		}

		logger.info(`${logPrefix} - The rendezvous coordinates are: ${rendezvousCoordinates}`);
		logger.info(`${logPrefix} - - - - - - - - - - - - - - - - - - - - -`);

		const partnersWithDistances = {};
		// loop over the partners
		for(partner of partners){
			logger.info(`${logPrefix} - Checking for partner: ${partner.organization}`);
			// loop over the partner's offices calculate the distance from their location to starbucks london
			for(office of partner.offices){
				logger.info(`${logPrefix} - Calculating distance to: ${office.location}`);
				const distance = gcdCalculator.distance(rendezvousCoordinates, office.coordinates);
				logger.info(`${logPrefix} - The calculated distance is: ${distance} Km`);
				logger.info(`${logPrefix} - - - - - - - - - - - - - - - - - - - - -`);
				if(distance <= range){
					partnersWithDistances[`${partner.organization} - ${office.location} Office`] = distance;
				}
			}
		}

		logger.info(`${logPrefix} - Sorting the resulting list`);
		// sort the result by company name in ascending order
		const partnersToInvite = Object.keys(partnersWithDistances).sort();
		logger.info(`${logPrefix} - Returning ${partnersToInvite.length} office locations`);

		// returning the result to the client
		return res.status(200).send({
			status: 'success',
			data:{
				partnersToInvite,
				partnersWithDistances
			}
		});
    } catch(error){
		logger.error(`${logPrefix} - Returning Unhandled Error ${error.message}`);
		
		// returning an error to the client
		return res.status(500).send({
			status: 'error',
			data: {
				errorType: 'Unhandled Error',
				error: error.message
			}
		});
    }
    
});

function validateInputs (logPrefix, inputs) {
	const res = {
		status: 'error',
		data: {
			errorType: 'Validation Error',
			message: ''
		}
	};

	logger.info(`${logPrefix} - check if a range has been provided`);
	if(!inputs.hasOwnProperty('range')){
		res.data.message = 'range is required';
		return res;
	}
	
	logger.info(`${logPrefix} - check if the provided range is a positive number`);
	if(typeof inputs.range != 'number' || inputs.range < 0){
		res.data.message = 'range must be a positive number';
		return res;
	}

	logger.info(`${logPrefix} - check if the provided rendezvousCoordinates is an array of 2 elements`);
	if((inputs.hasOwnProperty('rendezvousCoordinates') && !Array.isArray(inputs.rendezvousCoordinates)) || inputs.rendezvousCoordinates.length != 2){
		res.data.message = 'rendezvousCoordinates must be an array of a latitude and a longitude';
		return res;
	}

	logger.info(`${logPrefix} - check if the provided latitude and longitude are numbers`);
	for(l of inputs.rendezvousCoordinates){
		if(isNaN(l)){
			res.data.message = 'latitude and longitude must be numbers';
			return res;
		}
	}

	if(inputs.hasOwnProperty('partners')){
		// check if the provided partners is of type array
		if(!Array.isArray(inputs.partners)){
			res.data.message = 'partners must be an array';
			return res;
		}

		const Validator = require('jsonschema').Validator;
		const jsonValidator = new Validator();
		const jsonSchema = {
			"type": "object",
			"properties": {
			"id": {
				"type": "integer"
			},
			"urlName": {
				"type": "string"
			},
			"organization": {
				"type": "string"
			},
			"customerLocations": {
				"type": "string"
			},
			"willWorkRemotely": {
				"type": "boolean"
			},
			"website": {
				"type": "string"
			},
			"services": {
				"type": "string"
			},
			"offices": {
				"type": "array",
				"minItems": 1,
				"items": [
				{
					"type": "object",
					"properties": {
					"location": {
						"type": "string"
					},
					"address": {
						"type": "string"
					},
					"coordinates": {
						"type": "array",
						"minItems": 2,
						"maxItems": 2,
						"items": [
						{
							"type": "number"
						},
						{
							"type": "number"
						}
						]
					}
					},
					"required": [
					"location",
					"coordinates"
					]
				}
				]
			}
			},
			"required": [
			"urlName",
			"organization",
			"offices"
			]
		};
		for(p of inputs.partners){
			if(!jsonValidator.validate(p, jsonSchema).valid){
				res.data.message = 'invalid partner format';
				return res;
			}
		}
	}

	// if all is valid
	res.status = 'success';
	res.data = {};
	return res;

}

module.exports = partnersRouter;