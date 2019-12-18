import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '80%'
    }
}));

export default function ControlledOpenSelect() {
    const classes = useStyles();
    const [home, setHome] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setHome(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-placeholder-label-label">
                    What type of home do you live in?
                </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={home}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em> None </em>
                    </MenuItem>
                    <MenuItem value={'1 Bedrooms'}> 1 Bedrooms </MenuItem>
                    <MenuItem value={'2 Bedrooms'}> 2 Bedrooms </MenuItem>
                    <MenuItem value={'3 Bedrooms'}> 3 Bedrooms </MenuItem>
                    <MenuItem value={'4 Bedrooms'}> 4 Bedrooms </MenuItem>
                    <MenuItem value={'5 Bedrooms'}> 5 Bedrooms </MenuItem>
                    <MenuItem value={'6 Bedrooms'}> 6 Bedrooms </MenuItem>
                    <MenuItem value={'6+ Bedrooms'}> 6+ Bedrooms </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
