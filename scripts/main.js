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

				let placeForDot;
				switch (_value.toString().length){
					case 7:
						placeForDot = 5;
						break;
					case 6:
						placeForDot = 4;
						break;
					case 5:
						placeForDot = 3;
						break;
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
					newValue = _value.toString();
				}else{
					newValue = [_value.toString().slice(0, placeForDot), '.', _value.toString().slice(placeForDot)].join('');
				}

				switch (newValue.length){
					case 6:
						newValue = newValue + '0';
						break;
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
						$('#spin').removeClass('disabled').addClass('active');
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
					that.startSpining(iterations);
				});
			}
		}

		function setPositions(top, left){
			this.position.top = top;
			this.position.left = left;
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
			Rows
		};
	})();

	Bet.setElement('#bet');
	Amount.setElement('#amount');

	$('#spin').click(function(e){
		
		e.preventDefault();

		Amount.changeElementValue(Bet.getBet());

		if($(this).hasClass('active')){
			
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