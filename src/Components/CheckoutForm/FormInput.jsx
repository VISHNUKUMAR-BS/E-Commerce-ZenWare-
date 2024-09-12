import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: required }}  
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            required={required}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
