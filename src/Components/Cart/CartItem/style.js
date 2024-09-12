import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  media: {
    height: 350,  
    width: '100%',  
    objectFit: 'cover', 
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
