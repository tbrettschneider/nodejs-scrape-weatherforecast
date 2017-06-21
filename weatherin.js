#!/usr/bin/env node
"use strict";

const osmosis = require('osmosis'),
      dateFormat = require('dateformat'),
      scrape_url = 'www.wetter.de';

var locations = process.argv.slice(2);

if (!locations.length) {
    console.log('usage: ./weatherin.js <location...>');
    return;
}

locations.forEach(function(location) {
    osmosis
       .get(scrape_url)
       .submit('form.wt-form', {'search': location})
       .set({
           forecasts: [
               osmosis
                   .find('div.forecast-item-day')
                   .set({
                       day: 'div.text-day',
                       date: 'div.text-date',
                       temperature_max: 'span.wt-color-temperature-max',
                       temperature_min: 'span.wt-color-temperature-min'
                   })
           ]
       })
       .data(function(result) {
           result.location = location;
           console.log('\nWeather in %s:\n', result.location);
           result.forecasts.forEach(function(forecast_item) {
               console.log('\t%s, %s - min %s / max %s', forecast_item.day, forecast_item.date, forecast_item.temperature_min, forecast_item.temperature_max);
           });
       });
});
