import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid gray',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 5, 3),
  },
}));

export default function TransitionsModal(props) {
  const {onOpen, closeModal, value} = props;
  const classes = useStyles();
  const [text, setText] = React.useState(value[1]);

  useEffect(() => {
    setText(value[1])
  }, [value[1]])
 
  const handleChange = event => {
    setText(event.target.value);
  };

  const editItem = (event) => {
    event.preventDefault();

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: text
        })
    };
    
    fetch("http://192.168.2.36:5000/items/" + value[0] , requestOptions).then((response) => {
        return response.json();
    }).then((result) => {
      props.onRefresh();
      closeModal();
    });
  }  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={onOpen}
        onClose={() => closeModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={onOpen}>
          <div className={classes.paper}>
            <Box display="flex" flexDirection="column" p={1}>
              <Box p={1}>
                <h3 id="transition-modal-title">Edit item</h3>
              </Box>
              <Box p={1}>
                <TextField
                  placeholder="Add new item..."
                  label="Name"
                  margin="normal"
                  value={text}
                  onChange = {handleChange.bind(this)}
                />
              </Box>
              <Box p={1} display="flex" justifyContent="flex-end">
                <Box px={1}>
                  <Button
                  variant="contained"
                  disableElevation
                  onClick={()=> closeModal()}
                  >Cancel</Button>
                </Box>

                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={editItem}
                  >Potvrdi</Button>
                </Box>
              </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
