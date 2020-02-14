import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const useStyles = () => ({
  paperMod: {
    position: 'absolute',
    width: '500px',
    backgroundColor: 'white',
    padding: '40px',
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

class ModalWindow extends React.Component {
  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.paperMod}>
          <Typography variant="h6" id="modal-title">
            Incorrect data!
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            The name must consist of latin characters and numbers
          </Typography>
        </div>
      </Modal>
    );
  }
}

ModalWindow.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  onClose: PropTypes.func,
};

ModalWindow.defaultProps = {
  classes: {},
  onClose: () => {},
  open: false,
};

export default withStyles(useStyles)(ModalWindow);
