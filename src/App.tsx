import { ReactNode } from 'react';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

const SectionTitle = ({
  children,
  icon,
}: {
  children: ReactNode;
  icon: any;
}) => (
  <Box display='flex' alignItems='center' my={1.5}>
    {icon}
    <Typography variant='h6' ml={1}>
      {children}
    </Typography>
  </Box>
);

const ContactListItem = ({
  children,
  icon,
}: {
  children: ReactNode;
  icon: any;
}) => (
  <Box mb={1}>
    <Paper variant='outlined'>
      <Box display='flex' alignItems='center' p={2} pr={1} bgcolor='#f4f4f4'>
        <AccountCircleIcon fontSize='large' />
        <Typography ml={1} flex={1}>
          {children}
        </Typography>
        <IconButton>{icon}</IconButton>
      </Box>
    </Paper>
  </Box>
);

const App = () => {
  return (
    <Container maxWidth='md'>
      <Box
        height='98vh'
        overflow='hidden'
        display='flex'
        flexDirection='column'
      >
        <Grid container>
          <Grid item xs={5}>
            <SectionTitle icon={<AccountBoxIcon />}>My Contacts</SectionTitle>
            <Divider />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <SectionTitle icon={<PersonAddIcon />}>
              Add New Contact
            </SectionTitle>
            <Divider />
          </Grid>
          <Grid item xs={5} my={1.5}>
            <TextField
              size='small'
              variant='outlined'
              placeholder='Search'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5} my={1.5}>
            <TextField
              size='small'
              variant='outlined'
              placeholder='Search'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid container flex={1} height='100%' overflow='hidden'>
          <Grid item xs={5} height='100%' overflow='scroll'>
            {Array(20)
              .fill(true)
              .map((_, i) => (
                <ContactListItem key={i} icon={<DeleteIcon color='error' />}>
                  Identity {i + 1}
                </ContactListItem>
              ))}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5} height='100%' overflow='scroll'>
            {Array(20)
              .fill(true)
              .map((_, i) => (
                <ContactListItem key={i} icon={<PersonAddIcon />}>
                  Identity {i + 1}
                </ContactListItem>
              ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
