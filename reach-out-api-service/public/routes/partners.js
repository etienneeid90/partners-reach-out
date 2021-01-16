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

		logger.info(`${logPrefix} - The provided range is: ${req.body.range} Km`);
		// the given range in kilometers
		const range = req.body.range;

		logger.info(`${logPrefix} - ${req.body.hasOwnProperty('rendezvousCoordinates') ? 'RendezVous coordinates have been provided' : 'No rendezvous coordinates have been provided'}`);
		// the rendezvous coordinates by default Starbucks Cafe Central London 
		const rendezvousCoordinates = req.body.rendezvousCoordinates || [51.5144636,-0.142571];

		logger.info(`${logPrefix} - The rendezvous coordinates are: ${rendezvousCoordinates}`);
		logger.info(`${logPrefix} - - - - - - - - - - - - - - - - - - - - -`);

		const partnersWithDistances = {};
		// loop over the partners
		for(partner of partners){
			logger.info(`${logPrefix} - Checking for partner: ${partner.organization}`);
			// loop over the partner's offices calculate the distance from their location to starbucks london
			for(office of partner.offices){
				logger.info(`${logPrefix} - Calculating distance to: ${office.location}`);
				const distance = gcdCalculator.distance(rendezvousCoordinates, office.coordinates.split(','));
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
		res.status(200).send({
			status: 'success',
			data:{
				partnersToInvite,
				partnersWithDistances
			}
		});
    } catch(error){
		logger.error(`${logPrefix} - Returning Unhandled Error ${JSON.stringify(error)}`);
		
		// returning an error to the client
		res.status(500).send({
			status: 'error',
			data: {
				errorType: 'Unhandled Error',
				error
			}
		});
    }
    
});

module.exports = partnersRouter;