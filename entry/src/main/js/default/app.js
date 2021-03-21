import tool from './common/tool.js'

export default {
	onCreate() {
		let days = tool.getDayInfo()
		console.info(days)
		console.info('AceApplication onCreate');
	},
	onDestroy() {
		console.info('AceApplication onDestroy');
	}
};
