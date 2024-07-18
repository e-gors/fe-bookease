import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function MoreDataModal(props) {
  const { data = {}, open, onClose, ...rest } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {data && (
          <Box sx={style}>
            <Typography variant="subtitle1">{data?.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {data?.description}
            </Typography>
            {data?.children?.map((child, i) => (
              <Box key={i}>
                <Typography variant="subtitle2">{child.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {child.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Fade>
    </Modal>
  );
}

MoreDataModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MoreDataModal;
