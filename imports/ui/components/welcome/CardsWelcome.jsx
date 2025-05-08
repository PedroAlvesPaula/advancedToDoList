import React from 'react';

import { Grid, Card, CardContent, Typography } from "@mui/material";

export const CardsWelcome = ({ data }) => {
  return (
    <>
        <Grid 
            container 
            spacing={2} 
            wrap='wrap'
            columnSpacing={{xs: 2, md: 2}}
            rowSpacing={{xs: 4, md: 6}}
            sx={{
                margin: '32px'
            }}
        >
            {data.map((item, index) => (
            <Grid 
                size={{xs:12, md: 6}} 
                key={index}
            >
                <Card sx={{ 
                        width: '100%',
                        minHeight: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: '#8c77fe',
                    }}>
                    <CardContent sx={{ 
                                        textAlign: 'center', 
                                        width: '100%',
                                    }}>
                        <Typography variant="h6" gutterBottom sx={{color: '#E0E2E6', letterSpacing: '2px'}}>
                        {item.title}
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom sx={{color: '#120045'}}>
                        {item.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: '#E0E2E6', letterSpacing: '2px'}}>
                        {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    </>
  )
}
