export default {
	data: {
		cxt: '',
	  // 保存赢法的三维数组
		wins: [],
		count: 0
	},

	onShow() {
		this.drawChessBoard()
		this.initArr()
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
	},
	initArr() {
		// 初始化赢法数组 [x, y, groupid]
		for (let i = 0; i < 15; i++) {
			this.wins[i] = []
			for (let j = 0; j < 15; j++) {
				this.wins[i][j]= []
			}
		}
		
		// 记录x轴 赢法数据。15行，11列，5个子连着
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[j+k][i][this.count] = true
				}
				this.count++
			}
		}
		// 记录y轴 赢法数据
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[i][j+k][this.count] = true
				}
				this.count++
			}
		}
		// 记录正斜线 赢法数据
		for (let i = 0; i < 11; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[i+k][j+k][this.count] = true
				}
				this.count++
			}
		}
		// 记录反斜线 赢法数据
		for (let i = 0; i < 11; i++) {
			for (let j = 14; j < 3; j--) {
				for (let k = 0; k < 5; k++) {
					this.wins[i+k][j-k][this.count] = true
				}
				this.count++
			}
		}

		console.info("this.wins: "+this.wins)
	}
}
