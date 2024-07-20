import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SelectDropdown from "../../../../../components/SelectDropdown";
import { ContainedButton } from "../../../../../components/CustomButtons";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory } from "../../../../../redux/actions/categoryActions";
import { useRouter } from "../../../../../routes/hooks";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  minWidth: 340,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 2,
  p: 3,
};

function MoreDataModal(props) {
  const {
    data = {},
    selectedService,
    onSelectedService,
    open,
    onClose,
    ...rest
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const selected = useSelector((state) => state.selectedSub);
  const user = useSelector((state) => state.user);

  const [selectedSub, setSelectSub] = React.useState(
    selected ? selected : null
  );
  const [error, setError] = React.useState(null);

  React.useEffect(() => {}, []);

  const handleSelectSub = (e) => {
    const { value } = e.target;
    const selectedSub = selectedService?.children?.find(
      (child) => child.name === value
    );
    setError(null);
    setSelectSub(selectedSub);
  };

  const handleBookNow = () => {
    if (selectedSub) {
      dispatch(setSubCategory(selectedSub));
      if (user) router.push("/book-now");
      else router.push("/register");
    } else setError("Please select sub category!");
  };

  const options = selectedService?.children?.map((child) => child.name);

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
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {data && (
          <Box sx={style}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <IconButton
                sx={{ position: "absolute", right: -20, top: -20 }}
                onClick={onClose}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              {data?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description}
            </Typography>
            <Box sx={{ my: 2 }}>
              <SelectDropdown
                name="category"
                label="Sub Category"
                value={selectedSub?.name}
                options={options}
                onChange={handleSelectSub}
                size="small"
                customError={error}
              />
              <ContainedButton
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleBookNow}
              >
                Book Now!
              </ContainedButton>
            </Box>
          </Box>
        )}
      </Fade>
    </Modal>
  );
}

MoreDataModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MoreDataModal;
