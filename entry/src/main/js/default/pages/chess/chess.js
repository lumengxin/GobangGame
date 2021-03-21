export default {
	data: {
		cxt: ''
	},
	onShow() {
		this.drawChessBoard()
	},
	drawChessBoard() {
		this.cxt = this.$refs.chess.getContext('2d')
		const ROW = 15
		const WIDTH = 30

		for (let i = 0; i < ROW; i++) {
			this.cxt.moveTo(ROW, ROW + i * WIDTH)
			this.cxt.lineTo(435, ROW + i * WIDTH)
			this.cxt.stroke()

			this.cxt.moveTo(ROW + i * WIDTH, ROW)
			this.cxt.lineTo(ROW + i * WIDTH, 435)
			this.cxt.stroke()
		}
	}
}
