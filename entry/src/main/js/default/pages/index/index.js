import router from '@system.router';

export default {
	data: {
		title: ""
	},
	onInit() {
		this.title = this.$t('strings.world');
	},
	goChess() {
		router.push({
			uri: "pages/chess/chess"
		})
	}
}
