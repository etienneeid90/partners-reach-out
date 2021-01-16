const gcdCalculator = {
	// earthRadius in kilometers
	earthRadius: 6371,
	
	/**
	 * Converts degrees to radians
	 * @param {number} deg an angle in degrees
	 * @returns {number} an angle in radians
	 */
	degToRad: (deg) => {
		return deg * (Math.PI / 180);
	},

	/**
	 * Calculates the distance between two locations using the haversine formula
	 * @param {array} coords1 latitude and longitude in degrees
	 * @param {array} coords2 latitude and longitude in degrees
	 * @returns {number} a distance in kilometers
	 */
	distance: (coords1, coords2) => {
		const lat1 = coords1[0];
		const lon1 = coords1[1];
		const lat2 = coords2[0];
		const lon2 = coords2[1];

		const latitudeDifference = gcdCalculator.degToRad(lat2 - lat1);
		const longitudeDifference = gcdCalculator.degToRad(lon2 - lon1);

		const n =
			Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
			Math.cos(gcdCalculator.degToRad(lat1)) *
			Math.cos(gcdCalculator.degToRad(lat2)) *
			Math.sin(longitudeDifference / 2) *
			Math.sin(longitudeDifference / 2);
		
		const distance = 2 * Math.atan2(Math.sqrt(n), Math.sqrt(1 - n));

		return gcdCalculator.earthRadius * distance;
	}

};

module.exports = gcdCalculator;
