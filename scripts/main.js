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

	Bet.setElement('#bet');
	Amount.setElement('#amount');

	$('#spin').click(function(e){
		
		e.preventDefault();

		//todo: spin the images
		Amount.changeElementValue(Bet.getBet());

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