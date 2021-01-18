export function validate (params) {

	const res = {
		status: 'error',
		data: {
			errorType: 'Validation Error',
			error: ''
		}
	};

    // validate that a range has been provided
	if(!params.hasOwnProperty('range')){
		res.data.error = 'range is required';
		return res;
	}
    
    // validate that the provided range is a positive number
	if(typeof params.range != 'number' || params.range < 0){
		res.data.error = 'range must be a positive number';
		return res;
	}

    // validate that the provided rendezvousCoordinates is an array of 2 elements
	if(params.hasOwnProperty('rendezvousCoordinates') && (!Array.isArray(params.rendezvousCoordinates) || params.rendezvousCoordinates.length != 2)){
		res.data.error = 'rendezvousCoordinates must be an array of a latitude and a longitude';
		return res;
	}

    // validate that the provided latitude and longitude are numbers
    if(params.hasOwnProperty('rendezvousCoordinates')){
        for (const l of params.rendezvousCoordinates){
            if(isNaN(l)){
                res.data.error = 'latitude and longitude must be numbers';
                return res;
            }
        };
    }

    // validate the provided partners
	if(params.hasOwnProperty('partners')){
		// check if the provided partners is of type array
		if(!Array.isArray(params.partners)){
			res.data.error = 'partners must be an array';
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
			"organization",
			"offices"
			]
		};
        
        for (const p of params.partners){
			// making the coordinates as an array
			if(p.hasOwnProperty('offices') && p.offices.length){
				for(const o of p.offices){
					if(o.hasOwnProperty('coordinates') && typeof o.coordinates == 'string'){
						o.coordinates = (o.coordinates.split(',')).map((c) => Number(c));
					}
				}
			}
            if(!jsonValidator.validate(p, jsonSchema).valid){
				res.data.error = 'invalid partner format';
				return res;
			}
        };
	}

	// if all is valid
	res.status = 'success';
	res.data = {};
	return res;
}
