import colors from 'colors';
import clansi from 'ansi-256-colors';

let ts;

let logger = {
	timespan: () => {
		let time = new Date();
		return ts = `${ time.getDate() }-${ time.getMonth() }-${ time.getFullYear() }T${ time.getHours() }:${ time.getMinutes() }:${ time.getSeconds() }`;
	},
	error: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.error('[',logger.timespan().grey,']');
		console.error(clansi.bg.getRgb(5,0,0) + ` ERROR ` + clansi.reset, clansi.fg.getRgb(2,1,5) + iconfig.title + clansi.reset);
		console.error(`${ JSON.stringify(data, undefined, 2) }`);
	},
	warn: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.warn('[',logger.timespan().grey,']');
		console.warn(clansi.bg.getRgb(5,1,0) + ` WARN ` + clansi.reset, clansi.fg.getRgb(2,1,5) + iconfig.title + clansi.reset);
		console.warn(`${ JSON.stringify(data, undefined, 2) }`);
	},
	info: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.info('[',logger.timespan().grey,']');
		console.info(clansi.bg.getRgb(0,3,5) + ` INFO ` + clansi.reset, clansi.fg.getRgb(2,1,5) + iconfig.title + clansi.reset);
		console.info(`${ JSON.stringify(data, undefined, 2) }`);
	},
	verbose: 	( data ) => {
		console.log('[',logger.timespan().grey,']');
		console.log(`${ JSON.stringify(data, undefined, 2) }`);
	},
	debug: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.log('[',logger.timespan().grey,']');
		console.log(clansi.bg.getRgb(0,2,2) + ` DEBUG ` + clansi.reset, clansi.fg.getRgb(2,1,5) + iconfig.title + clansi.reset);
		console.log(`${ JSON.stringify(data, undefined, 2) }`);
	},
	silly: 		( data, config ) => {
		let iconfig = config || {title: ''};
		console.log('[',logger.timespan().grey,']');
		console.log(clansi.bg.getRgb(5,5,5) + ` SILLY ` + clansi.reset, clansi.fg.getRgb(2,1,5) + iconfig.title + clansi.reset);
		console.log(`${ JSON.stringify(data, undefined, 2) }`);
	}
}

export default logger;