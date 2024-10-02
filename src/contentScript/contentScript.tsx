import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import WeatherCard from '../components/WeatherCard';
import { LocalStorageOptions, getStoredOptions } from '../utils/storage';
import './contentScript.css';

// My React component
const Content = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions()
      .then((options) => {
        setOptions(options);
        setIsActive(options.hasAutoOverlay);
      })
      .catch((err) => { console.error(err); });
  }, [])

  if (!options) {
    return null;
  }

  return (
    <>
      {
        isActive &&
        <Card className="overlayCard" >
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={() => setIsActive(false)} />
        </Card >
      }
    </>
  )
};

// A root container
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// A root and render my component
const root = createRoot(rootElement);
root.render(<Content />);
