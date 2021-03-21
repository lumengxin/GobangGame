export default {
	data: {
		title: "",
		products: [
			"huiwei",
			"harmonyos"
		],
		isDisplay: true
	},
	onInit() {
		this.title = this.$t('strings.world');
	},
	show() {
		this.isDisplay = !this.isDisplay
	}
}
