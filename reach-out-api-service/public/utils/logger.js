const tracer = require('tracer');

const logger = tracer.console({
    format: [
        '{{message}}',
        {
            info: '[I] {{message}}',
            warn: '[W] {{message}}',
            debug: '[D] {{message}}',
            error: '[E] {{message}}'
        }
    ],
    transport: (data) => {
        console.log(data.output);
    }
});

module.exports = logger;
