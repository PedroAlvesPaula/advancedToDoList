import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Box, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export const UserInformations = () => {
    const user = useTracker(() => Meteor.user());

    return (
        <Paper elevation={4} sx={{ maxWidth: 500, margin: 'auto', mt: 4, p: 3, backgroundColor: '#7e74f1', color: '#fff', borderRadius: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                    src={user.profile.profileImage}
                    alt="Foto de perfil"
                    sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h5" fontWeight="bold">
                    {user.username}
                </Typography>
                <Typography variant="body1">📧 {user.emails[0].address}</Typography>
                <Typography variant="body1">🎂 {user.profile.dateOfBirth}</Typography>
                <Typography variant="body1">👤 {user.profile.gender}</Typography>
                <Typography variant="body1">🏢 {user.profile.companyWorks}</Typography>
            </Box>
        </Paper>
    )
}
