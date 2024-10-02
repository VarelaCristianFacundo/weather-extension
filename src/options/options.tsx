import '@fontsource/roboto';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid2,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { LocalStorageOptions, getStoredOptions, setStoredOptions } from '../utils/storage';
import './options.css';


type FormState = 'ready' | 'saving'

// My React component
const Test = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    const [formState, setFormState] = useState<FormState>('ready')

    useEffect(() => {
        getStoredOptions().then(options => setOptions(options)).catch(error => console.error(error));
    }, [])

    const handleHomeCityChange = (homeCity: string) => {
        if (options) {
            setOptions({
                ...options,
                homeCity
            });
        }
    }

    const handleSaveButtonClick = () => {
        if (options) {
            setFormState('saving');
            setStoredOptions(options)
                .then(() => {
                    setTimeout(() => {
                        setFormState('ready');
                        // eslint-disable-next-line no-console
                        console.log('Options saved successfully');
                    }, 1000);
                })
                .catch(error => console.error(error)); // Manejo de error            
        }
    }

    if (!options) {
        return null;
    }

    const isFieldsDisabled = formState === 'saving'

    return (
        <Box mx="10%" my="2%">
            <Card>
                <CardContent>
                    <Grid2 container direction="column" spacing={4}>
                        <Grid2>
                            <Typography variant="h4">Weather Extension Options</Typography>
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">Home city name</Typography>
                            <TextField
                                fullWidth
                                placeholder='enter a home city name'
                                value={options.homeCity}
                                onChange={event => handleHomeCityChange(event.target.value)}
                                disabled={isFieldsDisabled}
                            />
                        </Grid2>
                        <Grid2>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSaveButtonClick}
                                disabled={isFieldsDisabled}
                            >
                                {formState === 'ready' ? 'Save' : 'Saving...'}
                            </Button>
                        </Grid2>
                    </Grid2>
                </CardContent>
            </Card>
        </Box>
    )
}

// A root container
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// A root and render my component
const root = createRoot(rootElement);
root.render(
    <Test />
);
