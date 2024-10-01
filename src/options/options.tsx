import '@fontsource/roboto';
import {
    Box,
    Card,
    CardContent,
    Grid2,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

// My React component
const Test = () => {
    return (
        <Box mx="10%" my="2%">
            <Card>
                <CardContent>
                    <Grid2 container direction="column">
                        <Grid2>
                            <Typography variant="h4">Weather Extension Options</Typography>
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1">Home city name</Typography>
                            <TextField fullWidth placeholder='enter a home city name' />
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
