;(function () {
    
    function validateForm (e) {
        // var inputs = e.currentTarget.querySelectorAll('input');
        isValide = true;
        e.preventDefault();
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            checkInput(input);
        }
        submitForm();
    };
    
    function checkInput (input) {
        if (!input.value.trim()) {
            input.classList.add(notValideClass);
            input.parentElement.classList.add(emptyClass);
            isValide = false;
            return false;
        }
        if ( input.type == 'email' && !input.value.match(regex) ) {
            input.classList.add(notValideClass);            
            input.parentElement.classList.add(notEmailClass);
            isValide = false;            
            return false;
        }
        userInput[input.name] = input.value;
    };

    function submitForm () {
        if (isValide) {
            console.log(userInput);
            formSent.style.display = 'block';
            formSent.addEventListener('click', hideFormSent);
        }
    };

    function clearField (e) {
        var item = e.target;
        if (item.type == "text" || item.type == "email") {
            item.classList.remove(notValideClass);
            item.parentElement.classList.remove(emptyClass);
            item.parentElement.classList.remove(notEmailClass);          
        }
    };

    function hideFormSent () {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
            inputs[i].classList.remove(notValideClass);            
            inputs[i].parentElement.classList.remove(emptyClass);
        }
        formSent.style.display = "";
    }
    
    var form = document.getElementById('form-start'),
        inputs = form.querySelectorAll('input'),
        formSent = document.querySelector('.js-form-sent'),
        isHide = 'is-hide',
        userInput = {},
        isValide,
        notValideClass = 'js-not-valide',
        notEmailClass = 'js-not-email',
        emptyClass = 'js-empty-field',
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    form.addEventListener('click', clearField)
    form.addEventListener('submit', validateForm);

})();
;(function() {

	function wavify (canvas) {
		var ctx = canvas.getContext("2d");
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		var waves = [
		  "rgba(0, 0, 50, 0.05)",
		  "rgba(0, 0, 50, 0.05)"
		];
		
		var i = 0;
		
		function draw() {
		  canvas.width = canvas.width;
		
		  for (var j = waves.length - 1; j >= 0; j--) {
			var offset = i + j * Math.PI * 12;
			ctx.fillStyle = waves[j];
			var randomLeft = (Math.sin(offset / 100) + 3) / 2 * 200;
			var randomRight = (Math.sin(offset / 100 + 10) + 2) / 2 * 200;
			var randomLeftConstraint = (Math.sin(offset / 60 + 2) + 1) / 2 * 600;
			var randomRightConstraint = (Math.sin(offset / 60 + 1) + 1) / 2 * 600;
		
			ctx.beginPath();
			ctx.moveTo(0, randomLeft + 100);
		
			ctx.bezierCurveTo(
			  canvas.width / 3,
			  randomLeftConstraint,
			  canvas.width / 3 * 2,
			  randomRightConstraint,
			  canvas.width,
			  randomRight + 100
			);
			ctx.lineTo(canvas.width, canvas.height);
			ctx.lineTo(0, canvas.height);
			ctx.lineTo(0, randomLeft + 50);
		
			ctx.closePath();
			ctx.fill();
		  }
		
		  i = i + 3;
		}
		setInterval(draw, 40);
	};

	var allCanvas = document.querySelectorAll(".canvas-wave");
	allCanvas.forEach( function(canvas) {
		wavify(canvas);	
	})

})();

(function($, window, document) {

	$(function() {
		/* SLICK Slider */
		$(document).ready(function() {
			$('.slick').slick({
				adaptiveHeight: false,
				dots: false,
				mobileFirst: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5,
							infinite: true,
							dots: true
						}
					},
					{
						breakpoint: 750,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
							dots: true					
						}
					},
					{
						breakpoint: 550,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							dots: true
						}
					},
					{
						breakpoint: 400,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		});
		
		/* Waves bottom */
		$('.feel-the-wave').each( function(index, el) {
			$(el).wavify({
				height: 50,
				bones: 5,
				amplitude: 30,
				color: 'rgba(255, 255, 255, 0.05)',
				speed: .1
			});
		});
		 
		/* Waves top */
		$('.feel-the-wave-two').each( function(index, el) {
			$(el).wavify({
				height: 40,
				bones: 4,
				amplitude: 30,
				color: 'rgba(255, 255, 255, 0.05)',
				speed: .1
			});
		});
		
		// slow scroll to Form Submit
		$('.js-button-apply').click(function (e) {
				var elementClick = $(this).attr("href");
				var destination = $(elementClick).offset().top;
				e.preventDefault ? e.preventDefault() : (e.returnValue = false);
				jQuery('html:not(:animated)').animate({
					scrollTop: destination - 50
				}, 800);
				return false;
		});
	});
	
})(window.jQuery, window, document);
