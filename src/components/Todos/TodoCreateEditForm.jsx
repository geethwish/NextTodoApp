import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const TaskCreateEditForm = ({ open, handleFormClose, mode }) => {

    const submitNew = mode === 'new' ? true : false;

    const handleClose = () => {
        handleFormClose(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >

                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {submitNew ? 'Add Todo' : `Update Todo 1`}
                </BootstrapDialogTitle>

                <DialogContent dividers>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>

                            <FormControl fullWidth>

                                <FormLabel id="todoStatus">Todo Status</FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="todoStatus"
                                    name="todoStatus"
                                >

                                    <FormControlLabel value="todo" control={<Radio />} label="Todo" />

                                    <FormControlLabel value="inprogress" control={<Radio />} label="Inprogress" />

                                    <FormControlLabel value="done" control={<Radio />} label="Done" />

                                </RadioGroup>

                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                id="title"
                                label="Todo Title"
                                variant="filled"
                                fullWidth
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button autoFocus onClick={handleClose}>
                        Save
                    </Button>

                </DialogActions>

            </BootstrapDialog>

        </div>
    );
}

export default TaskCreateEditForm