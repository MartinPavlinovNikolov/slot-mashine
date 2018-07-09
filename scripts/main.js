(function($){

	const Amount = (function(){

		let _element = null;

		let _value = 2000;

		function getAmount(){
			
			return _value;
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

		function changeElementValue(value){

			if($('#spin').hasClass('active')){

				substract(value);

				let newValue = (_value / 100).toFixed(2).toString();

				if(newValue.substr(1, 1) == '.'){
					newValue = '0' + newValue;
				}

				$(_element).text(newValue);

				return this;
			}
		}

		return {
			getAmount,
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
					this.changeElementValue();
					
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

					this.changeElementValue();
					
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
			}
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
						if(that.position.top > 266 && that.position.top < 400){
							grid.rows.third.push(img_number);
						}else if(that.position.top > 133 && that.position.top < 200){
							grid.rows.second.push(img_number);
						}else if(that.position.top > -1 && that.position.top < 120){
							grid.rows.first.push(img_number);
						}

						if(that.element.prop('id') === 'row-1-col-5'){

							Animator.anyWining(grid);

							grid.rows.first = [];
							grid.rows.second = [];
							grid.rows.third = [];
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

		function anyWining(arg){
			const _1_1 = arg.rows.first[0];
			const _1_2 = arg.rows.first[1];
			const _1_3 = arg.rows.first[2];
			const _1_4 = arg.rows.first[3];
			const _1_5 = arg.rows.first[4];
			const _2_1 = arg.rows.second[0];
			const _2_2 = arg.rows.second[1];
			const _2_3 = arg.rows.second[2];
			const _2_4 = arg.rows.second[3];
			const _2_5 = arg.rows.second[4];
			const _3_1 = arg.rows.third[0];
			const _3_2 = arg.rows.third[1];
			const _3_3 = arg.rows.third[2];
			const _3_4 = arg.rows.third[3];
			const _3_5 = arg.rows.third[4];

			let points = 0;

			// xx---
			// -----
			// -----
			if(_1_1 === _1_2){

				// xxx--
				// -----
				// -----
				if(_1_1 === _1_3){

					// xxxx-
					// -----
					// -----
					if(_1_1 === _1_4){
						points += 2;
					}

					// xxx--
					// ---x-
					// -----
					if(_1_1 === _2_4){
						points += 2;
					}

					points++;
				}

				// xx---
				// --x--
				// -----
				if(_1_1 === _2_3){
					
					// xx-x-
					// --x--
					// -----
					if(_1_1 === _1_4){
						points += 2;
					}

					// xx---
					// --xx-
					// -----
					if(_1_1 === _2_4){
						points += 2;
					}

					// xx---
					// --x--
					// ---x-
					if(_1_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}

			// x----
			// -x---
			// -----
			if(_1_1 === _2_2){

				// x-x--
				// -x---
				// -----
				if(_1_1 === _1_3){
					
					// x-xx-
					// -x---
					// -----
					if(_1_1 === _1_4){
						points += 2;
					}

					// x-x--
					// -x-x-
					// -----
					if(_1_1 === _2_4){
						points += 2;
					}

					points++;
				}

				// x----
				// -xx--
				// -----
				if(_1_1 === _2_3){

					// x--x-
					// -xx--
					// -----
					if(_1_1 === _1_4){
						points += 2;
					}

					// x----
					// -xxx-
					// -----
					if(_1_1 === _2_4){
						points += 2;
					}

					// x----
					// -xx--
					// ---x-
					if(_1_1 === _3_4){
						points += 2;
					}

					points++;
				}

				// x----
				// -x---
				// --x--
				if(_1_1 === _3_3){
					
					// x----
					// -x-x-
					// --x--
					if(_1_1 === _2_4){
						points += 2;
					}

					// x----
					// -x---
					// --xx-
					if(_1_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}
			
			// -x---
			// x----
			// -----
			if(_2_1 === _1_2){

				// -xx--
				// x----
				// -----
				if(_2_1 === _1_3){

					// -xxx-
					// x----
					// -----
					if(_2_1 === _1_4){
						points += 2;
					}

					// -xx--
					// x--x-
					// -----
					if(_2_1 === _2_4){
						points += 2;
					}

					points++;
				}

				// -x---
				// x-x--
				// -----
				if(_2_1 === _2_3){

					// -x-x-
					// x-x--
					// -----
					if(_2_1 === _1_4){
						points += 2;
					}

					// -x---
					// x-xx-
					// -----
					if(_2_1 === _2_4){
						points += 2;
					}

					// -x---
					// x-x--
					// ---x-
					if(_2_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}
			
			// -----
			// xx---
			// -----
			if(_2_1 === _2_2){

				// --x--
				// xx---
				// -----
				if(_2_1 === _1_3){

					// --xx-
					// xx---
					// -----
					if(_2_1 === _1_4){
						points += 2;
					}

					// --x--
					// xx-x-
					// -----
					if(_2_1 === _2_4){
						points += 2;
					}

					points++;
				}

				// -----
				// xxx--
				// -----
				if(_2_1 === _2_3){

					// ---x-
					// xxx--
					// -----
					if(_2_1 === _1_4){
						points += 2;
					}

					// -----
					// xxxx-
					// -----
					if(_2_1 === _2_4){
						points += 2;
					}

					// -----
					// xxx--
					// ---x-
					if(_2_1 === _3_4){
						points += 2;
					}

					points++;
				}

				// -----
				// xx---
				// --x--
				if(_2_1 === _3_3){

					// -----
					// xx-x-
					// --x--
					if(_2_1 === _2_4){
						points += 2;
					}

					// -----
					// xx---
					// --xx-
					if(_2_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}
			
			// -----
			// x----
			// -x---
			if(_2_1 === _3_2){

				// -----
				// x-x--
				// -x---
				if(_2_1 === _2_3){

					// ---x-
					// x-x--
					// -x---
					if(_2_1 === _1_4){
						points += 2;
					}

					// -----
					// x-xx-
					// -x---
					if(_2_1 === _2_4){
						points += 2;
					}

					// -----
					// x-x--
					// -x-x-
					if(_2_1 === _3_4){
						points += 2;
					}

					points++;
				}

				// -----
				// x----
				// -xx--
				if(_2_1 === _3_3){

					// -----
					// x--x-
					// -xx--
					if(_2_1 === _2_4){
						points += 2;
					}

					// -----
					// x----
					// -xxx-
					if(_2_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}
			
			// -----
			// -x---
			// x----
			if(_3_1 === _2_2){

				// --x--
				// -x---
				// x----
				if(_3_1 === _1_3){

					// --xx-
					// -x---
					// x----
					if(_3_1 === _1_4){
						points += 2;
					}

					// --x--
					// -x-x-
					// x----
					if(_3_1 === _2_4){
						points += 2;
					}

					points++;
				}

				// -----
				// -xx--
				// x----
				if(_3_1 === _2_3){

					// ---x-
					// -xx--
					// x----
					if(_3_1 === _1_4){
						points += 2;
					}

					// -----
					// -xxx-
					// x----
					if(_3_1 === _2_4){
						points += 2;
					}

					// -----
					// -xx--
					// x--x-
					if(_3_1 === _3_4){
						points += 2;
					}

					points++;
				}

				// -----
				// -x---
				// x-x--
				if(_3_1 === _3_3){

					// -----
					// -x-x-
					// x-x--
					if(_3_1 === _2_4){
						points += 2;
					}

					// -----
					// -x---
					// x-xx-
					if(_3_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}
			
			// -----
			// -----
			// xx---
			if(_3_1 === _3_2){

				// -----
				// --x--
				// xx---
				if(_3_1 === _2_3){

					// ---x-
					// --x--
					// xx---
					if(_3_1 === _1_4){
						points += 2;
					}

					// -----
					// --xx-
					// xx---
					if(_3_1 === _2_4){
						points += 2;
					}

					// -----
					// --x--
					// xx-x-
					if(_3_1 === _3_4){
						points += 2;
					}

					points++;
				}

				// -----
				// -----
				// xxx--
				if(_3_1 === _3_3){

					// -----
					// ---x-
					// xxx--
					if(_3_1 === _2_4){
						points += 2;
					}

					// -----
					// -----
					// xxxx-
					if(_3_1 === _3_4){
						points += 2;
					}

					points++;
				}

			}

			console.log(points * Bet.getBet());

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
			anyWining
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