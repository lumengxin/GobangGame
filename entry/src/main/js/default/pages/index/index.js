import test from "../../common/test.js"
import router from "@system.router"

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
	},
	prompt() {
		test.dialog()
	},
	gotoProduct() {
		router.push({
			uri: 'pages/product/product'
		})
	}
}
