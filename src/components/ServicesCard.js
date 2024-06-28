import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Modal,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { ContainedButton, TextButton } from "./CustomButtons";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ServicesCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          maxHeight: 350,
          backgroundColor: "#f1e8efff",
          boxShadow: 2,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.url}
            alt={props.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 1,
                maxHeight: "2em",
              }}
            >
              {props.title}
            </Typography>
            <Box
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {props.description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ContainedButton variant="contained">Book Now</ContainedButton>
          <TextButton variant="text" size="small" onClick={handleOpen}>
            Show More
          </TextButton>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Card
            sx={{
              backgroundColor: "#f1e8efff",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={props.url}
                alt={props.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {props.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {props.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Stack
                direction="row"
                spacing={2}
              >
                <ContainedButton variant="contained">
                  Book Now
                </ContainedButton>
                <TextButton
                  variant="text"
                  size="small"
                  onClick={handleClose}
                >
                  Show Less
                </TextButton>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
