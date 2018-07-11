(function($){

	const Amount = (function(){

		let _element = null;

		let _value = 2000;

		function getAmount(){
			
			return _value;
		}

		function setAmount(amount){
			
			_value = amount;
		}

		function setElement (element){
			
			_element = element;

			return this;
		}

		function substract(value){
			_value -= value;

			if(_value < Bet.getBet()){
				Bet.setBet(5);
				$('#bet').text('00.05');
				$('#bet-down').removeClass('active').addClass('disabled');

				if(_value <= Bet.getBet()){
					$('#bet-up').removeClass('active').addClass('disabled');
				}else{
					$('#bet-up').removeClass('disabled').addClass('active');
				}

				if(_value < 5){
					$('#spin').removeClass('active').addClass('disabled');
				}
			}

			if(_value === Bet.getBet()){
				$('#bet-up').removeClass('active').addClass('disabled');
			}
		}

		function changeElementValue(value, add = false){

			if(add === false){
				substract(value);
			}

			let newValue = (_value / 100).toFixed(2).toString();

			if(newValue.substr(1, 1) == '.'){
				newValue = '0' + newValue;
			}

			$(_element).text(newValue);

			return this;
		}

		return {
			getAmount,
			setAmount,
			setElement,
			changeElementValue
		}

	})();

	const Bet = (function(){

		let _element = null,
		 _values = {
			'all':[
				5, 10, 20, 40, 80, 160, 200, 400, 800, 1600, 2000
			],
			'current_value': 5
		};

		function getBet(){
			return _values.current_value;
		}

		function setBet(bet){
			_values.current_value = bet;
		}

		function betDown(){

			for(let i = 0; i <= 10; i++){

				if($('#bet-down').hasClass('active') && _values.all[i] === _values.current_value){
					
					if(_values.current_value === 10){
						$('#bet-down').removeClass('active').addClass('disabled');
					}

					if(_values.current_value === 2000){
						$('#bet-up').removeClass('disabled').addClass('active');
					}

					_values.current_value = _values.all[i-1];
					
					if($('#spin').hasClass('active')){
						this.changeElementValue();
					}

					if(_values.all[i] <= Amount.getAmount()){
						$('#bet-up').removeClass('disabled').addClass('active');
					}

					return this;
				}

			}
		}

		function betUp(){

			for(let i = 0; i <= 10; i++){

				if($('#bet-up').hasClass('active') && _values.all[i] === _values.current_value){

					if(_values.current_value === 1600){
						$('#bet-up').removeClass('active').addClass('disabled');
					}

					if(_values.current_value === 5){
						$('#bet-down').removeClass('disabled').addClass('active');
					}

					_values.current_value = _values.all[i+1];

					if(_values.all[i+2] > Amount.getAmount()){
						$('#bet-up').removeClass('active').addClass('disabled');
					}

					if($('#spin').hasClass('active')){
						this.changeElementValue();
					}
					
					return this;
				}

			}
		}

		function setElement (element){
			
			_element = element;

			return this;
		}

		function changeElementValue(){

			let placeForDot;
			switch (_values.current_value.toString().length){
				case 4:
					placeForDot = 2;
					break;
				case 3:
					placeForDot = 1;
					break;
				case 2:
					placeForDot = 0;
					break;
				case 1:
					placeForDot = null;
					break;
			}

			let newValue;
			if(placeForDot === null){
				newValue = _values.current_value.toString();
			}else{
				newValue = [_values.current_value.toString().slice(0, placeForDot), '.', _values.current_value.toString().slice(placeForDot)].join('');
			}

			switch (newValue.length){
				case 4:
					newValue = '0' + newValue;
					break;
				case 3:
					newValue = '00' + newValue;
					break;
				case 1:
					newValue = '00.0' + newValue;
					break;
			}

			$(_element).text(newValue);

			return this;
		}

		return {
			getBet,
			setBet,
			betUp,
			betDown,
			setElement,
			changeElementValue
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
				}else{
					setTimeout(function(){
						if(Amount.getAmount() < 5){
							$('#spin').removeClass('active').addClass('disabled');
						}else{
							$('#spin').removeClass('disabled').addClass('active');
						}

					}, 3500);
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

							const incoming_cash = (Animator.anyWining(grid)) * Bet.getBet();

							Amount.setAmount(Amount.getAmount() + incoming_cash);
							Amount.changeElementValue(Amount.getAmount(), true);
							Animator.linghtWiningImages(grid.wining_ids);
							if(incoming_cash !== 0){
								Animator.displayFreshCash(incoming_cash);
							}

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
		}

		function linghtWiningImages(ids){

			for(let id of ids){
				let target = $('#' + id).children().first();
				target.addClass('wining');
				setTimeout(function(){
					target.removeClass('wining');
				}, 1800);
			}
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
		}

		function anyWining(arg){

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

			function isMatches(points = null, row = null, key = null, first_col_cache){

				if(points === null){
					
					let first = Math.ceil(isMatches(0, CaschePositions._1_1, '_1_1') * koeficent.current);
					koeficent.current = 0;
					let second = Math.ceil(isMatches(0, CaschePositions._2_1, '_2_1') * koeficent.current);
					koeficent.current = 0;
					let third = Math.ceil(isMatches(0, CaschePositions._3_1, '_3_1') * koeficent.current);
					koeficent.current = 0;
					return first + second + third;
				}

			//check first vs second cols
				// Row #1, Col #1 === Row #1, Col #2
				if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._1_2){
					points =  isMatches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[0]]);
				}
				// Row #1, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._2_2){
					points =  isMatches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[0]]);
				}

				// Row #2, Col #1 === Row #1, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._1_2){
					points =  isMatches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}
				// Row #2, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._2_2){
					points =  isMatches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}
				// Row #2, Col #1 === Row #3, Col #2
				if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._3_2){
					points =  isMatches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[5]]);
				}

				// Row #3, Col #1 === Row #2, Col #2
				if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._2_2){
					points =  isMatches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[10]]);
				}
				// Row #3, Col #1 === Row #3, Col #2
				if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._3_2){
					points =  isMatches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[10]]);
				}

			//check second vs third cols
				// Row #1, Col #2 === Row #1, Col #3
				if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._1_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._1_3, '_1_3') + 1;
				}
				// Row #1, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._2_3, '_2_3') + 1;
				}

				// Row #2, Col #2 === Row #1, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._1_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._1_3, '_1_3') + 1;
				}
				// Row #2, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._2_3, '_2_3') + 1;
				}
				// Row #2, Col #2 === Row #3, Col #3
				if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._3_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._3_3, '_3_3') + 1;
				}

				// Row #3, Col #2 === Row #2, Col #3
				if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._2_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._2_3, '_2_3') + 1;
				}
				// Row #3, Col #2 === Row #3, Col #3
				if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._3_3){
					grid.wining_ids.push(first_col_cache);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
					koeficent.current = koeficent.avalible[row];
					points =  isMatches(points, CaschePositions._3_3, '_3_3') + 1;
				}

			//check third vs fourth cols
				// Row #1, Col #3 === Row #1, Col #4
				if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._1_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
					points =  isMatches(points, CaschePositions._1_4, '_1_4') + 2;
				}
				// Row #1, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  isMatches(points, CaschePositions._2_4, '_2_4') + 2;
				}

				// Row #2, Col #3 === Row #1, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._1_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
					points =  isMatches(points, CaschePositions._1_4, '_1_4') + 2;
				}
				// Row #2, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  isMatches(points, CaschePositions._2_4, '_2_4') + 2;
				}
				// Row #2, Col #3 === Row #3, Col #4
				if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._3_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
					points =  isMatches(points, CaschePositions._3_4, '_3_4') + 2;
				}

				// Row #3, Col #3 === Row #2, Col #4
				if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._2_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
					points =  isMatches(points, CaschePositions._2_4, '_2_4') + 2;
				}
				// Row #3, Col #3 === Row #3, Col #4
				if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._3_4){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
					points =  isMatches(points, CaschePositions._3_4, '_3_4') + 2;
				}

			//check fourth vs fiveth cols
				// Row #1, Col #4 === Row #1, Col #5
				if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._1_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
					points =  isMatches(points, CaschePositions._1_5, '_1_5') + 3;
				}
				// Row #1, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  isMatches(points, CaschePositions._2_5, '_2_5') + 3;
				}

				// Row #2, Col #4 === Row #1, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._1_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
					points =  isMatches(points, CaschePositions._1_5, '_1_5') + 3;
				}
				// Row #2, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  isMatches(points, CaschePositions._2_5, '_2_5') + 3;
				}
				// Row #2, Col #4 === Row #3, Col #5
				if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._3_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
					points =  isMatches(points, CaschePositions._3_5, '_3_5') + 3;
				}

				// Row #3, Col #4 === Row #2, Col #5
				if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._2_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
					points =  isMatches(points, CaschePositions._2_5, '_2_5') + 3;
				}
				// Row #3, Col #4 === Row #3, Col #5
				if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._3_5){
					grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
					points =  isMatches(points, CaschePositions._3_5, '_3_5') + 3;
				}

				return points;
			}

			return isMatches();
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
			anyWining,
			linghtWiningImages,
			displayFreshCash
		};
	})();

	Bet.setElement('#bet');
	Amount.setElement('#amount');

	$('#spin').click(function(e){
		
		e.preventDefault();

		if(Amount.getAmount() >= 5){
			
			Amount.changeElementValue(Bet.getBet());

			$(this).removeClass('active').addClass('disabled');

			Animator.spin();

		}

	});

	$('#bet-up').click(function(e){
		
		e.preventDefault();

		Bet.betUp();

	});

	$('#bet-down').click(function(e){
		
		e.preventDefault();

		Bet.betDown();

	});

})(jQuery);