(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: '#app',
		data: {
			list: [
				{ id: 1, hobby: '吃饭', status: false },
				{ id: 2, hobby: '睡觉', status: false },
				{ id: 3, hobby: '打死各位', status: true },
				{ id: 4, hobby: '或者被各位打死', status: false }
			],
			newHobby: '',
			editList: '',
			listStatus:'all' ,
		},
		methods: {
			// 添加
			addData() {
				if (this.newHobby.trim()=='') { 
					console.log('不能为空');
					this.newHobby = ''
					return
				}
				this.list.push({
					hobby: this.newHobby,
					status:false 
				})
				//添加完成清空input框
				this.newHobby = ''
			},

			isShow(valueStatus) { 
				switch (this.listStatus) { 
					case 'all':
						return true
						break;
					case 'active':
						return !valueStatus
						break;
					case 'completed':
						return valueStatus
					default:
						return true
						break;
				}
				return
			},
			//删除
			deleteData(id) {
				this.list.forEach((v, i) => {
					if (id == v.id) {
						this.list.splice(i, 1)
					}
				})
			},
		},
		// 全选反选 
		computed: {
			// checkAll() { 
			// 	var temList = this.list.filter(value => { 
			// 		// return value.status == false 
			// 		return !value.status
			// 	})
			// 	console.log(temList.length)
			// 	// return temList.length==0?true : false
			// 	return !temList.length
			// }
			checkAll: {
				set(newValue) { 
					this.list.forEach(v => {
						v.status = newValue
					})
				},
				get() { 		
						var temList = this.list.filter(value => { 
							// return value.status == false 
							return !value.status
						})
						console.log(temList.length)
						// return temList.length==0?true : false
						return !temList.length
				}
			}
		},
		// 存储
		updated () {
			localStorage.setItem('todoList',JSON.stringify(this.list))
		},
		// 读取
		mounted() {
			if (!localStorage.getItem('todoList')) { 
				return 
			}
			this.list = JSON.parse(localStorage.getItem('todoList'))
		}
	})



})(window);

