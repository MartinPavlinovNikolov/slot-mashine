const SlotMashine = (function($){

	const ButtonsManager = (function(){

		setElement('bet', 'bet');
		setElement('betUp', 'bet-up');
		setElement('betDown', 'bet-down');
		setElement('spin', 'spin');
		setElement('amount', 'amount');
		setElement('maxBet', 'max-bet');
		setElement('minBet', 'min-bet');

		function wasCliked(element_id){
			
			let element = $('#'+element_id);
			
			if(element.hasClass('active')){
				element.removeClass('active').addClass('click');
				setTimeout(() => {element.removeClass('click').addClass('active')}, 200);
			}


			return this;
		}

		function disable(element_id){
			$('#'+element_id).removeClass('active').addClass('disabled');

			return this;
		}

		function activate(element_id){
			$('#'+element_id).removeClass('disabled').addClass('active');

			return this;
		}

		function isActive(element_id){
			return $('#'+element_id).hasClass('active');
		}

		function isDisabled(element_id){
			return $('#'+element_id).hasClass('disabled');
		}

		function setElement(property, element_id){
			this[property] = $('#'+element_id);

			return this;
		}

		function getElement(element){
			return this[element];
		}

		function afterBetUp(){
			
			if(Amount.getAmount() < (Bet.takeAllBets()[Bet.getBetIndex()+1]) || Bet.getBet() === 2000){
				this.disable('bet-up');
			}

			if(Bet.getBet() === 10 || Amount.getAmount() >= (Bet.takeAllBets()[Bet.getBetIndex()+1])){
				this.activate('bet-down');
			}

			return this;
		}

		function afterBetDown (){
			
			if(Bet.getBet() === 5){
				this.disable('bet-down');
			}

			if(Bet.getBet() === 1600){
				this.activate('bet-up');
			}

			if(Bet.getBet() <= Amount.getAmount()){
				this.activate('bet-up');
			}

			return this;
		}

		function afterSpin(){

			let incoming_cash = Bet.getCacheIncomingCash();

			Amount.add(incoming_cash);

			this.changeElementValue('amount', Amount.getAmount());

			if(incoming_cash !== 0){
				Animator.displayFreshCash(incoming_cash);
			}

			if(Amount.getAmount() >= 10){
				this.activate('bet-up');
				this.activate('bet-down');
				this.activate('min-bet');
			}

			if(Amount.getAmount() >= 10 && Amount.getAmount() >= Bet.takeAllBets()[Bet.getBetIndex()+1]){
				this.activate('max-bet');
			}

			if(Amount.getAmount() < 5){
				this.disable('spin');
			}else{
				this.activate('spin');
			}

			if(Amount.getAmount() < Bet.getBet()){
				Bet.setBet(5).setBetIndex(0);
				this.changeElementValue('bet', 5);

				if(Amount.getAmount() > Bet.getBet()){
					this.activate('bet-up');
					this.activate('max-bet');
				}
			}

			if(Bet.getBet() === 2000){
				this.disable('bet-up');
				this.disable('max-bet');
			}

			return this;
		}

		function changeElementValue(target, monney){

			monney = (monney / 100).toFixed(2).toString();

			if(monney.substr(1, 1) == '.'){
				monney = '0' + monney;
			}

			ButtonsManager[target].text(monney);

			return this;
		}

		return {
			amount,
			bet,
			betUp,
			betDown,
			spin,
			minBet,
			maxBet,
			wasCliked,
			disable,
			activate,
			isActive,
			isDisabled,
			setElement,
			getElement,
			afterBetUp,
			afterBetDown,
			afterSpin,
			changeElementValue
		};
	})();

	const Amount = (function(ButtonsManager){

		let _value = Number(ButtonsManager.amount.text()) * 100;

		function getAmount(){
			
			return _value;
		}

		function setAmount(amount){
			
			_value = amount;
		}

		function substract(value){
			_value -= value;

			return this;
		}

		function add(value){
			_value += value;
		}

		return {
			substract,
			add,
			getAmount,
			setAmount
		}

	})(ButtonsManager);

	const Bet = (function(){

		const _bets = {
			'all':[
				5, 10, 20, 40, 80, 160, 200, 400, 800, 1600, 2000
			],
			'current_bet_index': 0,
			'getBetIndex': () => (_bets.current_bet_index),
			'setBetIndex': (i) => (_bets.current_bet_index = i)
		};

		let incoming_cash = 0;

		function getBet(){
			return _bets.all[_bets.current_bet_index];
		}

		function setBet(bet){

			_bets.setBetIndex(this.takeAllBets().findIndex(_bet => {
				return _bet === bet;
			}));

			return this;
		}

		function betDown(){

			if(ButtonsManager.isActive('bet-down')){

				this.setBetIndex(this.getBetIndex()-1);

				return this;
			}
		}

		function betUp(){

			if(ButtonsManager.isActive('bet-up')){

				this.setBetIndex(this.getBetIndex()+1);

			}

			return this;
		}

		function setBetIndex(i){
			_bets.setBetIndex(i);
		}

		function getBetIndex(){
			return _bets.getBetIndex();
		}

		function takeAllBets(){
			return _bets.all;
		}

		function setCacheIncomingCash(cash){

			this.incoming_cash = cash;

			return this;
		}

		function getCacheIncomingCash(){

			return this.incoming_cash;
		}

		return {
			takeAllBets,
			getBet,
			setBet,
			setBetIndex,
			getBetIndex,
			betUp,
			betDown,
			setCacheIncomingCash,
			getCacheIncomingCash
		};
	}());

	const Animator = (function(){
		
		const config = {
			'image_starting_point': '-33%',
			'image_moving_point': '400'
		};

		const grid = {
			'rows': {
				'first': [],
				'second': [],
				'third': []
			},
			'ids': {
				'first': [],
				'second': [],
				'third': []
			},
			'wining_ids': []
		};

		const koeficent = {
			'avalible': {
				'1': 0.4,
				'2': 0.6,
				'3': 0.8,
				'4': 1,
				'5': 1.2,
				'6': 1.4
			},
			'current': 0
		};

		function spin(col = 1){

			setTimeout(function(){

				if(col <= 5){

					let row = 4;
					while(row >= 0){

						Animator.Rows[`row${row}col${col}`].startSpining();						
						row--;
					}
					col++;
					Animator.spin(col);
				}
			}, 200);
		}

		function startSpining(iterations = 20){
			
			let that = this,
			movementDown = Number(that.element.css('top').replace('px', ''))+Number(that.element.css('height').replace('px', ''));

			if(iterations !== 0){

				that.element.animate({
					top: movementDown,
				}, 130, function(){
					that.setPositions($('#' + that.element.prop('id')).position().top, $('#' + that.element.prop('id')).position().left);
					if(that.position.top > config.image_moving_point){
						
						that.element.css({top: config.image_starting_point});
						that.element.children().remove();
						that.element.append("<img src='images/" + Math.ceil(Math.random()*Math.ceil(6)) + ".png'></img>");
					}
					iterations--;

					if(iterations === 0){

						let img_number = that.element.children().first().prop('src').substr(-5, 1);
						let id = that.element.prop('id');

						if(that.position.top > 266 && that.position.top < 400){
							grid.rows.third.push(img_number);
							grid.ids.third.push(id);
						}else if(that.position.top > 133 && that.position.top < 200){
							grid.rows.second.push(img_number);
							grid.ids.second.push(id);
						}else if(that.position.top > -1 && that.position.top < 120){
							grid.rows.first.push(img_number);
							grid.ids.first.push(id);
						}

						if(that.element.prop('id') === 'row-1-col-5'){

							Bet.setCacheIncomingCash((Animator.colectLines(grid)) * Bet.getBet());
							Animator.linghtWiningImages(grid.wining_ids);

							grid.rows.first = [];
							grid.rows.second = [];
							grid.rows.third = [];
							grid.ids.first = [];
							grid.ids.second = [];
							grid.ids.third = [];
							grid.wining_ids = [];
						}
					}

					that.startSpining(iterations);
				});
			}
		}

		function setPositions(top, left){
			this.position.top = top;
			this.position.left = left;

			return this;
		}

		function linghtWiningImages(ids){

			for(let id of ids){
				let target = $('#' + id).children().first();
				target.addClass('wining');
				setTimeout(function(){
					target.removeClass('wining');
				}, 1800);
			}

			return this;
		}

		function displayFreshCash(monney){
			monney = (monney / 100).toFixed(2).toString();

			if(monney.substr(1, 1) == '.'){
				monney = '0' + monney;
			}

			$('body').append('<h2 id="remove-me" class="displayWiningCash">+ ' + monney + '!</h2>');
			setTimeout(function(){
				$('#remove-me').remove();
			}, 2000);

			return this;
		}

		function colectLines(arg){

			const CaschePositions = {
				'_1_1': arg.rows.first[0],
				'_1_2': arg.rows.first[1],
				'_1_3': arg.rows.first[2],
				'_1_4': arg.rows.first[3],
				'_1_5': arg.rows.first[4],
				'_2_1': arg.rows.second[0],
				'_2_2': arg.rows.second[1],
				'_2_3': arg.rows.second[2],
				'_2_4': arg.rows.second[3],
				'_2_5': arg.rows.second[4],
				'_3_1': arg.rows.third[0],
				'_3_2': arg.rows.third[1],
				'_3_3': arg.rows.third[2],
				'_3_4': arg.rows.third[3],
				'_3_5': arg.rows.third[4]
			};
			const CascheIds = {
				'_1_1': arg.ids.first[0],
				'_1_2': arg.ids.first[1],
				'_1_3': arg.ids.first[2],
				'_1_4': arg.ids.first[3],
				'_1_5': arg.ids.first[4],
				'_2_1': arg.ids.second[0],
				'_2_2': arg.ids.second[1],
				'_2_3': arg.ids.second[2],
				'_2_4': arg.ids.second[3],
				'_2_5': arg.ids.second[4],
				'_3_1': arg.ids.third[0],
				'_3_2': arg.ids.third[1],
				'_3_3': arg.ids.third[2],
				'_3_4': arg.ids.third[3],
				'_3_5': arg.ids.third[4]	
			};

			function hasMaches(points = null, row = null, key = null, first_col_cache){

				if(points === null){
					
					let first = Math.ceil(hasMaches(0, CaschePositions._1_1, '_1_1') * koeficent.current);
					koeficent.current = 0;
					let second = Math.ceil(hasMaches(0, CaschePositions._2_1, '_2_1') * koeficent.current);
					koeficent.current = 0;
					let third = Math.ceil(hasMaches(0, CaschePositions._3_1, '_3_1') * koeficent.current);
					koeficent.current = 0;
					return first + second + third;
				}

			//check first vs second cols
				// Row #1, Col #1 === Row #1, Col #2
				if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._1_2){
					points =  hasMaches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[0]]);
				}
				// Row #1, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._2_2){
					points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[0]]);
				}

				// Row #2, Col #1 === Row #1, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._1_2){
					points =  hasMaches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}
				// Row #2, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._2_2){
					points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}
				// Row #2, Col #1 === Row #3, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._3_2){
					points =  hasMaches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}

				// Row #3, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._2_2){
					points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[10]]);
				}
				// Row #3, Col #1 === Row #3, Col #2
				if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._3_2){
					points =  hasMaches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[10]]);
				}

			//check second vs third cols
				// Row #1, Col #2 === Row #1, Col #3
				if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._1_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
				}
				// Row #1, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
				}

				// Row #2, Col #2 === Row #1, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._1_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
				}
				// Row #2, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
				}
				// Row #2, Col #2 === Row #3, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._3_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
				}

				// Row #3, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
				}
				// Row #3, Col #2 === Row #3, Col #3
				if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._3_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
					koeficent.current = koeficent.avalible[row];
					points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
				}

			//check third vs fourth cols
				// Row #1, Col #3 === Row #1, Col #4
				if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._1_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
					points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
				}
				// Row #1, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
				}

				// Row #2, Col #3 === Row #1, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._1_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
					points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
				}
				// Row #2, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
				}
				// Row #2, Col #3 === Row #3, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._3_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
					points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
				}

				// Row #3, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
				}
				// Row #3, Col #3 === Row #3, Col #4
				if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._3_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
					points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
				}

			//check fourth vs fiveth cols
				// Row #1, Col #4 === Row #1, Col #5
				if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._1_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
					points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
				}
				// Row #1, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
				}

				// Row #2, Col #4 === Row #1, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._1_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
					points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
				}
				// Row #2, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
				}
				// Row #2, Col #4 === Row #3, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._3_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
					points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
				}

				// Row #3, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
				}
				// Row #3, Col #4 === Row #3, Col #5
				if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._3_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
					points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
				}

				return points;
			}

			return hasMaches();
		}


		const Rows = (function(){
			
			const Rows = {};

			for(let i = 1; i <=5; i++){
				for(let j = 0; j <= 4; j++){
					let element = $("#row-"+`${j}`+"-col-"+`${i}`);

					Object.defineProperty(Rows, `row${j}col${i}`, {
						'value': {
							'element': element,
							'position': {
								'top': element.position().top,
								'left': element.position().left
							},
							'startSpining': startSpining,
							'setPositions': setPositions
						}
					});
				}
			}

			return Rows;
		})();

		return {
			config,
			spin,
			Rows,
			colectLines,
			linghtWiningImages,
			displayFreshCash
		};
	})();

	function setGame(){

		ButtonsManager.spin.click(function(e){
			
			e.preventDefault();

			if(ButtonsManager.isActive('spin') && Amount.getAmount() >= 5){

				ButtonsManager.wasCliked('spin');
				
				let animate_spining = () => {
					return new Promise((resolve, reject) => {

						ButtonsManager.disable('spin');
						ButtonsManager.disable('bet-up');
						ButtonsManager.disable('bet-down');
						ButtonsManager.disable('min-bet');
						ButtonsManager.disable('max-bet');

						Amount.substract(Bet.getBet());
						ButtonsManager.changeElementValue('amount', Amount.getAmount());

						Animator.spin();
						
						setTimeout(() => {
							resolve();
						}, 4450);
					});
				};
				
				animate_spining().then(() => {
					ButtonsManager.afterSpin();
				});

			}

		});

		return this;
	}

	function setBetUp(){
		
		ButtonsManager.betUp.click(function(e){

			e.preventDefault();

			Bet.betUp();
			ButtonsManager.afterBetUp().changeElementValue('bet', Bet.getBet());
			ButtonsManager.wasCliked('bet-up');

		});

		return this;
	}

	function setBetDown(){

		ButtonsManager.betDown.click(function(e){
			
			e.preventDefault();

			Bet.betDown();
			ButtonsManager.afterBetDown().changeElementValue('bet', Bet.getBet());
			ButtonsManager.wasCliked('bet-down');

		});

		return this;
	}

	function setMaxBet(){

		ButtonsManager.maxBet.click(function(e){

			e.preventDefault();

			if(ButtonsManager.isActive('max-bet')){
				
				let maxPosibleBet = Bet.takeAllBets().reverse().find((b) => {
					return b <= Amount.getAmount();
				});
				let indexOfMaxPosibleBet = Bet.takeAllBets().reverse().findIndex((b) => {
					return b === maxPosibleBet;
				});

				Bet.setBet(maxPosibleBet).setBetIndex(indexOfMaxPosibleBet);
				ButtonsManager.changeElementValue('bet', maxPosibleBet)
					.disable('bet-up')
					.activate('bet-down')
					.disable('max-bet')
					.activate('min-bet')
					.wasCliked('max-bet');
			}
		});

		return this;
	}

	function setMinBet(){

		ButtonsManager.minBet.click(function(e){

			e.preventDefault();

			Bet.setBet(5).setBetIndex(0);
			ButtonsManager.changeElementValue('bet', 5)
				.activate('bet-up')
				.disable('bet-down')
				.disable('min-bet')
				.activate('max-bet')
				.wasCliked('min-bet');
		});

		return this;
	}

	return {
		setGame,
		setBetUp,
		setBetDown,
		setMaxBet,
		setMinBet
	};

})(jQuery);

SlotMashine.setGame().setBetUp().setBetDown().setMinBet().setMaxBet();