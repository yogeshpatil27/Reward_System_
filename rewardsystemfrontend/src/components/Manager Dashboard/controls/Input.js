import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange,type,placeholder } = props;
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            type = {type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}
