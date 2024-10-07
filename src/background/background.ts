import { fetchOpenWeatherData } from '../utils/api';
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  void setStoredCities([]); // Uso de 'void' para ignorar la promesa conscientemente
  void setStoredOptions({
    hasAutoOverlay: false,
    homeCity: '',
    tempScale: 'metric',
  });

  chrome.contextMenus.create({
    id: 'weatherExtension',
    title: 'Add city to Weather extension',
    contexts: ['selection'],
  });

  chrome.alarms
    .create({
      periodInMinutes: 1 / 6,
    })
    .catch(console.error); // Manejo de error en la promesa
});

chrome.contextMenus.onClicked.addListener(event => {
  getStoredCities()
    .then(cities => {
      const selectionText = event.selectionText ?? '';
      if (selectionText === '') {
        return;
      }
      setStoredCities([...cities, selectionText]).catch(console.error);
    })
    .catch(console.error);
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions()
    .then(options => {
      if (!options.homeCity) {
        // Verificación explícita de que no sea undefined o cadena vacía
        return;
      }

      fetchOpenWeatherData(options.homeCity, options.tempScale)
        .then(data => {
          const temp = Math.round(data.main.temp);
          const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';

          chrome.action
            .setBadgeText({
              text: `${temp}${symbol}`, // Uso correcto de template strings para evitar error
            })
            .catch(console.error); // Manejo de error en la promesa
        })
        .catch(console.error); // Manejo de error con .catch
    })
    .catch(console.error); // Manejo de error con .catch
});
