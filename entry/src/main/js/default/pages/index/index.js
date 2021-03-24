import prompt from '@system.prompt';

export default {
	data: {
		cxt: '',
	// 保存赢法的三维数组
		wins: [],
		count: 0,
	// 落子位置记录(0: 未落； 1: 以落)
		chessboard: [],
	// 角色
		me: true,
	// 是否结束
		over: false,
	// 统计赢的组
		myWin: [],
		computerWin: []
	},
	onInit() {
		this.initChessBoard()
		this.initArr()
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
	},
	initChessBoard() {
		for (let i = 0; i < 15; i++) {
			this.chessboard[i] = []
			for (let j = 0; j < 15; j++) {
				this.chessboard[i][j] = 0
			}
		}
		console.info("this.chessboard: " + this.chessboard)

		for (let i = 0; i < this.count; i++) {
			this.myWin[i] = 0
			this.computerWin[i] = 0
		}
	},
	initArr() {
		// 初始化赢法数组 [x, y, groupid]
		for (let i = 0; i < 15; i++) {
			this.wins[i] = []
			for (let j = 0; j < 15; j++) {
				this.wins[i][j] = []
			}
		}

		// 记录x轴 赢法数据。15行，11列，5个子连着
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[j + k][i][this.count] = true
				}
				this.count++
			}
		}
		// 记录y轴 赢法数据
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[i][j + k][this.count] = true
				}
				this.count++
			}
		}
		// 记录正斜线 赢法数据
		for (let i = 0; i < 11; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 5; k++) {
					this.wins[i + k][j + k][this.count] = true
				}
				this.count++
			}
		}
		// 记录反斜线 赢法数据
		for (let i = 0; i < 11; i++) {
			for (let j = 14; j < 3; j--) {
				for (let k = 0; k < 5; k++) {
					this.wins[i + k][j - k][this.count] = true
				}
				this.count++
			}
		}

		console.info("this.wins: " + this.wins)
	},
	onPressChess(e) {
		if (this.over) {
			return
		}
		if (!this.me) {
			return
		}

		let x = Math.floor(e.touches[0].localX / 30)
		let y = Math.floor(e.touches[0].localY / 30)

		// 判断是否可以落子
		if (this.chessboard[x][y] === 0) {
			this.chessboard[x][y] = 1
			console.info("this.xy: " + this.x + ", " + this.y)
			this.drawChess(x, y)
			// 判断是否赢了
			this.checkWin(x, y)
			// 计算机下棋子
			this.computerWin()
			if (!this.over) {
				this.me = !this.me
				//				this.computerAI(this.me)
			}
		}
	},
	computerAI(me) {
		// 记录空白位置赢的权重
		let myScore = []
		let computerScore = []
		// 初始化二维数组
		for (let i = 0; i < 15; i++) {
			myScore[i] = []
			computerScore[i] = []
			for (let j = 0; j < 15; j++) {
				myScore[i][j] = 0
				computerScore[i][j] = 0
			}
		}
		// 统计权重
		let maxScore = 0 // 最高权重
		let maxX = 0 // 最高权重x轴坐标
		let maxY = 0 // 最高权重y轴坐标
		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < 15; j++) {
				// 统计电脑最优下子位置
				if (this.chessboard[i][j] === 0) {
					for (let k = 0; k < this.count; k++) {
						if (this.wins[i][j][k]) {
							// 自己权重
							if (this.myWin[k] === 1) {
								myScore[i][j] += 200
							} else if (this.wins[k] === 2) {
								myScore[i][j] += 400
							} else if (this.wins[k] === 3) {
								myScore[i][j] += 1000
							} else if (this.wins[k] === 4) {
								myScore[i][j] += 10000
							}
							// 电脑权重（更高)
							if (this.computerWin[k] === 1) {
								computerScore[i][j] += 220
							} else if (this.computerWin[k] === 2) {
								computerScore[i][j] += 440
							} else if (this.computerWin[k] === 3) {
								computerScore[i][j] += 1600
							} else if (this.computerWin[k] === 4) {
								computerScore[i][j] += 100000
							}
						}
					}
				}

				// 拦截
				if (myScore[i][j] > maxScore) {
					maxScore = myScore[i][j]
					maxX = i
					maxY = j
				} else if (myScore[i][j] === maxScore) {
					if (computerScore[i][j] > maxScore) {
						maxX = i
						maxY = j
					}
				}

				// 下子
				if (computerScore[i][j] > maxScore) {
					maxScore = computerScore[i][j]
					maxX = i
					maxY = j
				} else if (computerScore[i][j] === maxScore) {
					if (myScore[i][j] > maxScore) {
						maxX = i
						maxY = j
					}
				}
			}
		}

		//		this.drawChess(0, 0)
		this.draw(maxX, maxY)
		this.checkWin(maxX, maxY)

		if (!this.over) {
			this.me = !this.me
		}
	},
	drawChess(x, y) {
		this.cxt.beginPath()
		this.cxt.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI)
		this.cxt.closePath()
		if (!this.me) {
			this.cxt.fillSytle("red")
		}
		this.cxt.fill()
	},
	checkWin(x, y) {
		for (let i = 0; i < this.count; i++) {
			if (this.wins[x][y][i]) {
				// 如果是自己，在自己的统计中添加次数
				if (this.me) {
					this.myWin[i]++
					if (this.myWin[i] === 5) {
						this.over = true
						prompt.showToast({
							message: "恭喜，您赢了",
							duration: 3000
						})
					}
				} else {
					this.computerWin[i]++
					if (this.computerWin[i] === 5) {
						this.over = true
						prompt.showToast({
							message: "ooss，您输了",
							duration: 3000
						})
					}
				}
			}
		}
	}
}
