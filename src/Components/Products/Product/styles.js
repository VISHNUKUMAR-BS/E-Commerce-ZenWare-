import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 300,  
        width: '100%',  
        objectFit: 'cover', 
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
