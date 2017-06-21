#!/usr/bin/env node
"use strict";

const osmosis = require('osmosis'),
      dateFormat = require('dateformat'),
      scrape_url = 'www.wetter.de';

var locations = process.argv.slice(2);

if (!locations.length) {
    console.log('usage: npm start <location...>');
    return;
}

locations.forEach(function(location) {
    osmosis
       .get(scrape_url)
       .submit('form.wt-form', {'search': location})
       .set({
           temperature_max: 'span.wt-color-temperature-max',
           temperature_min: 'span.wt-color-temperature-min'
       })
       .data(function(result) {
           result.location = location;
           var now = dateFormat(new Date(), 'dd.mm.yyyy');
           console.log('%s - %s - min %s / max %s', now, result.location, result.temperature_min, result.temperature_max);
       });
});
