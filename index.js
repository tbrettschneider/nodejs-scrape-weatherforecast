const osmosis = require('osmosis');
if (location=process.argv[2]) {
    osmosis.get('www.wetter.de')
       .submit('form.wt-form', {'search': location})
       .set({
	     'max-temperature': 'span.wt-color-temperature-max',
	     'min-temperature': 'span.wt-color-temperature-min'
       })
       .data(console.log);
} else {
    console.log('Usage: npm start <location>');
}
