import prompt from '@system.prompt';

export default {
	props: ['title'],
	data: {
		content: ''
	},
	getContent(e) {
		this.content = e.value
	},
	submit() {
//		prompt.showToast({
//			message: this.content
//		})
			this.$emit('sendMsg', { text: this.content })
	}
}