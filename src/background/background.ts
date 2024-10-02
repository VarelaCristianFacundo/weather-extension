import { setStoredCities, setStoredOptions } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  void setStoredCities([]);
  void setStoredOptions({
    hasAutoOverlay: false,
    homeCity: 'Toronto',
    tempScale: 'metric',
  });
});
