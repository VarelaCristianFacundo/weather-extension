import { Box, Button, Card, CardActions, CardContent, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { OpenWeatherData, OpenWeatherTempScale, fetchOpenWeatherData, getWeatherIconSrc } from '../../utils/api';

import './WeatherCard.css';

const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    onDelete?: () => void
}> = ({ children, onDelete }) => {
    return (
        <Box mx={'4px'} my={'16px'}>
            <Card>
                <CardContent>{children}</CardContent>
                <CardActions>
                    {
                        onDelete && (
                            <Button color='secondary' onClick={onDelete}>
                                <Typography className='weatherCard-body'>Delete</Typography>
                            </Button>
                        )
                    }
                </CardActions>
            </Card>
        </Box>
    );
};

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
    city: string
    tempScale: OpenWeatherTempScale
    onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
    const [cardState, setCardState] = useState<WeatherCardState>('loading');

    useEffect(() => {
        fetchOpenWeatherData(city, tempScale)
            .then(data => {
                setWeatherData(data);
                setCardState('ready');
            })
            .catch(_error => setCardState('error'));
    }, [city, tempScale]);

    if (cardState === 'loading' || cardState === 'error') {
        return <WeatherCardContainer onDelete={onDelete}>
            <Typography className='weatherCard-title'>{city}</Typography>
            <Typography className='weatherCard-body'>
                {
                    cardState === 'loading' ? 'Loading weather data...' :
                        'Error fetching weather data.'
                }
            </Typography>
        </WeatherCardContainer>;
    }

    return (
        <WeatherCardContainer onDelete={onDelete}>
            <Grid2 container justifyContent="space-around">
                <Grid2>
                    {weatherData ? (
                        <>
                            <Typography className='weatherCard-title'>{weatherData.name}</Typography>
                            <Typography className='weatherCard-temp'>{Math.round(weatherData.main.temp)}°C</Typography>
                            <Typography className='weatherCard-body'>Feels like: {Math.round(weatherData.main.feels_like)}°C</Typography>

                        </>
                    ) : (
                        <Typography className='weatherCard-body'>No weather data available</Typography>
                    )}
                </Grid2>
                <Grid2>
                    {
                        weatherData && weatherData.weather.length > 0 && <>
                            <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
                            <Typography className='weatherCard-body'>{weatherData.weather[0].main}</Typography>
                        </>
                    }
                </Grid2>
            </Grid2>
        </WeatherCardContainer>
    );
};

export default WeatherCard;
