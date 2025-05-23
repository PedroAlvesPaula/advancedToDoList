import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { Box, CircularProgress, Paper, Table, TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessIcon from '@mui/icons-material/Business';
import Man4Icon from '@mui/icons-material/Man4';

export const UserInformations = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Meteor.call('users.getUserInformations', (error, result) => {
            if(error) {
                console.error('Erro ao buscar as informações do usuário', error);
            } else {
                setUser(result);
            }
        });
    }, []);

    return (
        <>
            { user ? 
                (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Paper elevation={4} sx={{ 
                                                    maxWidth: 500, 
                                                    minWidth: 320, 
                                                    margin: 'auto', 
                                                    m: 4, 
                                                    p: 3, 
                                                    backgroundColor: '#693efe', 
                                                    color: '#fff', 
                                                    borderRadius: 3, 
                                                }}>
                            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                <Avatar
                                    src={user.profileImage}
                                    alt="Foto de perfil"
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Typography variant="h5" fontWeight="bold" color='#d9d4ff'>
                                    {user.username}
                                </Typography>
                                
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center' width={'100%'}>
                                                <EmailIcon sx={{ color: '#d9d4ff' }}/>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Typography variant="body1" color='#d9d4ff'>
                                                    {user.email}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow width={'100%'}>
                                            <TableCell align='center' >
                                                <CakeIcon sx={{ color: '#d9d4ff' }}/>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Typography variant="body1" color='#d9d4ff'>
                                                    {user.dateOfBirth}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow width={'100%'}>
                                            <TableCell align='center' >
                                                <Man4Icon sx={{ color: '#d9d4ff' }}/>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Typography variant="body1" color='#d9d4ff'>
                                                    {user.gender}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow width={'100%'}>
                                            <TableCell align='center' >
                                                <BusinessIcon sx={{ color: '#d9d4ff' }} />
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Typography variant="body1" color='#d9d4ff'>
                                                    {user.companyWorks}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Paper>
                    </Box>
                ) : (
                    <>
                        <div style={{height: '100vh', width: '100vw'}}>
                            <div style={{
                                            width: '100%', 
                                            height: '100%', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center'
                                        }}
                            >
                                <CircularProgress color="secondary" />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}
