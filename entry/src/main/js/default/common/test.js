// 引入系统模块 @system
import prompt from '@system.prompt';

export default {
	dialog() {
		prompt.showDialog({
			title: "消息弹框"
		})
	}
}