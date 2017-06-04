const osmosis = require('osmosis');
location = process.argv[2];
if (location) {
    osmosis.get('www.wetter.de')
       .submit('form.wt-form', {'search': location})
       .set({
	     'max-temperature': 'span.wt-color-temperature-max',
	     'min-temperature': 'span.wt-color-temperature-min'
       })
       .data(console.log)
       .log(console.log)
       .error(console.log)
       .debug(console.log);
} else {
    console.log('Please pass the location as cmdline param...');
}
