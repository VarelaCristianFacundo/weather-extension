import { setStoredCities, setStoredOptions } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  void setStoredCities([]);
  void setStoredOptions({
    homeCity: 'Toronto',
    tempScale: 'metric',
  });
});
