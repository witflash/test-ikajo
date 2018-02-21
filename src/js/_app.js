$('.feel-the-wave').each( function(index, el) {
	console.log(index, el);
	$(el).wavify({
	  height: 50,
	  bones: 5,
	  amplitude: 30,
		color: 'rgba(255, 255, 255, 0.05)',
	  speed: .1
	});
  });
  
  $('.feel-the-wave-two').each( function(index, el) {
	console.log(index, el);
	$(el).wavify({
	  height: 40,
	  bones: 4,
	  amplitude: 30,
		color: 'rgba(255, 255, 255, 0.05)',
	  speed: .1
	});
  });