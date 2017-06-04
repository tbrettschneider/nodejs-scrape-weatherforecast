const osmosis = require('osmosis'),
      dateFormat = require('dateformat');

if (location=process.argv[2]) {
    osmosis.get('www.wetter.de')
       .submit('form.wt-form', {'search': location})
       .set({
           temperature_max: 'span.wt-color-temperature-max',
	   temperature_min: 'span.wt-color-temperature-min'
       })
       .data(function(result) {
	   result.location = location;	
       	   now = dateFormat(new Date(), 'dddd, mmmm dS, yyyy');
	   console.log('%s - %s - Min %s / Max %s', now, result.location, result.temperature_min, result.temperature_max);
       });	
} else {
    console.log('Usage: npm start <location>');
}
