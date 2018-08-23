import colors from 'colors';

let ts;

let logger = {
	timespan: () => {
		let time = new Date();
		return ts = `${ time.getDate() }-${ time.getMonth() }-${ time.getFullYear() }T${ time.getHours() }:${ time.getMinutes() }:${ time.getSeconds() }`;
	},
	error: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.error('[',logger.timespan().grey,']');
		console.error(` ERROR `.bgRed, iconfig.title.magenta);
		console.error(`${ data }`);
	},
	warn: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.warn('[',logger.timespan().grey,']');
		console.warn(` WARN `.bgYellow, iconfig.title.magenta);
		console.warn(`${ data }`);
	},
	info: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.info('[',logger.timespan().grey,']');
		console.info(` INFO `.bgCyan, iconfig.title.magenta);
		console.info(`${ data }`);
	},
	verbose: 	( data ) => {
		console.log('[',logger.timespan().grey,']');
		console.log(`${ data }`);
	},
	debug: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.log('[',logger.timespan().grey,']');
		console.log(` DEBUG `.gray.bgGreen, iconfig.title.magenta);
		console.log(`${ data }`);
	},
	silly: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.log('[',logger.timespan().grey,']');
		console.log(` SILLY `.bgMagenta, iconfig.title.magenta);
		console.log(`${ data }`);
	}
}

export default logger;