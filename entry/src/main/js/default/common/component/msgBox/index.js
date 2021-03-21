import prompt from '@system.prompt';
import fetch from '@system.fetch';

export default {
	props: ['title'],
	data: {
		content: '',
		url: 'https://www.harmonyos.com/assets/config/trustDomain.json'
	},
	getContent(e) {
//		this.content = e.value
	},
	getData() {
		let that = this
		fetch.fetch({
			url: that.url,
			success: function(response) {
				console.error("fetch code: " + response.code)
				console.error("fetch data: " + response.data)
				that.content = JSON.stringify(response.data)
			},
			fail: function() {
				console.info("fetch fail");
			}
		})
	},
	submit() {
//		prompt.showToast({
//			message: this.content
//		})
		this.getData()
		this.$emit('sendMsg', { text: this.content })
	}
}