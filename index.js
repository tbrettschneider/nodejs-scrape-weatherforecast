const osmosis = require('osmosis');
if (location=process.argv[2]) {
    data = osmosis.get('www.wetter.de')
       .submit('form.wt-form', {'search': location})
       .set({
           temperature_max: 'span.wt-color-temperature-max',
	   temperature_min: 'span.wt-color-temperature-min'
       })
       .data(function(result) {
	   result.location = location;	
       	   console.log(result);
       });	
} else {
    console.log('Usage: npm start <location>');
}
