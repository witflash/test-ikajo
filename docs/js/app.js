;(function () {
    
    function validateForm (e) {
        var inputs = e.currentTarget.querySelectorAll('input');
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
        console.log('isValide: ', isValide);
        if (isValide) {
            console.log(userInput);
            alert('Thank you!');
        }
    };

    function clearField (e) {
        var item = e.target;
        if (item.type == "text" || item.type == "email") {
            item.classList.remove(notValideClass);
            item.parentElement.classList.remove(emptyClass);
            item.parentElement.classList.remove(notEmailClass);          
        }
    }
    
    var form = document.getElementById('form-start'),
        userInput = {},
        isValide,
        notValideClass = 'js-not-valide',
        notEmailClass = 'js-not-email',
        emptyClass = 'js-empty-field',
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    form.addEventListener('click', clearField)
    form.addEventListener('submit', validateForm);

}());
jQuery.fn.wavify = function( options ) {

    //  Options
    //
    //
    var settings = $.extend({
        container: options.container ? options.container : 'body',
        // Height of wave
        height: 200,
        // Amplitude of wave
        amplitude: 100,
        // Animation speed
        speed: .15,
        // Total number of articulation in wave
        bones: 3,
        // Color
        color: 'rgba(255,255,255, 0.20)'
    }, options );

    var wave = this,
        width = $(settings.container).width(),
        height = $(settings.container).height(),
        points = [],
        lastUpdate,
        totalTime = 0;

    //  Set color
    //
    TweenLite.set(wave, {attr:{fill: settings.color}});


    function drawPoints(factor) {
        var points = [];

        for (var i = 0; i <= settings.bones; i++) {
            var x = i/settings.bones * width;
            var sinSeed = (factor + (i + i % settings.bones)) * settings.speed * 100;
            var sinHeight = Math.sin(sinSeed / 100) * settings.amplitude;
            var yPos = Math.sin(sinSeed / 100) * sinHeight  + settings.height;
            points.push({x: x, y: yPos});
        }

        return points;
    }

    function drawPath(points) {
        var SVGString = 'M ' + points[0].x + ' ' + points[0].y;

        var cp0 = {
            x: (points[1].x - points[0].x) / 2,
            y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
        };

        SVGString += ' C ' + cp0.x + ' ' + cp0.y + ' ' + cp0.x + ' ' + cp0.y + ' ' + points[1].x + ' ' + points[1].y;

        var prevCp = cp0;
        var inverted = -1;

        for (var i = 1; i < points.length-1; i++) {
            var cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
            var cp1 = {
                x: (points[i].x - prevCp.x) + points[i].x,
                y: (points[i].y - prevCp.y) + points[i].y
            };

            SVGString += ' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i+1].x + ' ' + points[i+1].y;
            prevCp = cp1;
            inverted = -inverted;
        }

        SVGString += ' L ' + width + ' ' + height;
        SVGString += ' L 0 ' + height + ' Z';
        return SVGString;
    }

    //  Draw function
    //
    //
    function draw() {
        var now = window.Date.now();

        if (lastUpdate) {
            var elapsed = (now-lastUpdate) / 1000;
            lastUpdate = now;

            totalTime += elapsed;

            var factor = totalTime*Math.PI;
            TweenMax.to(wave, settings.speed, {
                attr:{
                    d: drawPath(drawPoints(factor))
                },
                ease: Power1.easeInOut
            });

        } else {
            lastUpdate = now;
        }

        requestAnimationFrame(draw);
    }

    //  Pure js debounce function to optimize resize method
    //
    //
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    //  Redraw for resize with debounce
    //
    var redraw = debounce(function() {
        wave.attr('d', '');
        points = [];
        totalTime = 0;
        width = $(settings.container).width();
        height = $(settings.container).height();
        lastUpdate = false;
        setTimeout(function(){
            draw();
        }, 50);
    }, 250);
    $(window).on('resize', redraw);


    //  Execute
    //
    return draw();

};
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
		$('.js-button-apply').click(function () {
				var elementClick = $(this).attr("href");
				var destination = $(elementClick).offset().top;
				jQuery('html:not(:animated)').animate({
					scrollTop: destination - 50
				}, 800);
				return false;
		});
	});
	
})(window.jQuery, window, document);
