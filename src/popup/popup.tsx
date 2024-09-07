import { Add as AddIcon } from '@mui/icons-material';
import { Box, Grid2, IconButton, InputBase, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';


import '@fontsource/roboto';
import { LocalStorageOptions, getStoredCities, getStoredOptions, setStoredCities, setStoredOptions } from '../utils/storage';
import WeatherCard from './WeatherCard/WeatherCard';
import './popup.css';

// My React component
const App = () => {
    const [cities, setCities] = useState<string[]>([
        'Toronto',
        'New York',
        'Error',
        'London',
    ])
    const [cityInput, setCityInput] = useState<string>('')
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)

    useEffect(() => {
        getStoredCities().then(cities => setCities(cities))
        getStoredOptions().then(options => setOptions(options))
    }, [])

    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return
        }
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities)
            .then(() => {
                setCities(updatedCities)
                setCityInput('')
            })
    }

    const handleCityDeleteButton = (index: number) => {
        cities.splice(index, 1)
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities)
            .then(() => {
                setCities(updatedCities)

            })
    }

    const HandleTempScaleButton = () => {

        if (!options) {
            return null
        }

        const updateOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
        }
        setStoredOptions(updateOptions).then(() => {
            setOptions(updateOptions)
        })
    }

    if (!options) {
        return null
    }


    return (
        <Box mx="8px" my="16px">
            <Grid2 container justifyContent="space-evenly">
                <Grid2>
                    <Paper>
                        <Box px="15px" py="5px">
                            <InputBase
                                placeholder="Add a city"
                                inputProps={{
                                    'aria-label': 'add a city',
                                }}
                                value={cityInput}
                                onChange={(e) => setCityInput(e.target.value)}
                            />
                            <IconButton onClick={handleCityButtonClick}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2>
                    <Paper>
                        <Box py="4px">
                            <IconButton onClick={HandleTempScaleButton}>
                                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>

            {
                cities.map((city, index) => (
                    <WeatherCard
                        key={index}
                        city={city}
                        tempScale={options.tempScale}
                        onDelete={() => handleCityDeleteButton(index)} />
                ))
            }
            <Box height="16px" />
        </Box >
    );
}

// A root container
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// Create a root and render the App component
const root = createRoot(rootElement);
root.render(<App />);
