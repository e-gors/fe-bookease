import { Box, Card, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import React, { useState } from "react";
import MoreDataModal from "./MoreDataModal";

export default function ServiceCard(props) {
  const { data, sx, ...rest } = props;
  const [selectedService, setSelectedService] = useState({});
  const [openMore, setOpenMore] = useState(false);

  const handleSelect = (service) => {
    if (service.id === selectedService.id) {
      setSelectedService({});
      setOpenMore(false);
    } else {
      setSelectedService(service);
      setOpenMore(true);
    }
  };

  return (
    <>
      <Stack spacing={2} {...rest}>
        <Card
          component={Stack}
          spacing={2}
          direction="column"
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor:
              selectedService.id === data.id ? "#fe9d8c" : "white",
            boxShadow: 2,
            cursor: "pointer",
            ...sx,
            transition: "0.5s",
            "&:hover": {
              boxShadow: 10,
            },
          }}
          onClick={() => handleSelect(data)}
        >
          <Box
            component={Stack}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                edge="start"
                disableRipple
                tabIndex={-1}
                checked={selectedService?.id === data.id}
                inputProps={{ "aria-labelledby": data?.name }}
                onClick={(e) => e.stopPropagation()}
              />
              <Typography variant="subtitle1">{data?.name}</Typography>
            </Stack>
            <Tooltip title={data?.description} arrow sx={{ cursor: "pointer" }}>
              <InfoIcon
                sx={{
                  color: selectedService?.id === data.id ? "white" : "black",
                }}
              />
            </Tooltip>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
          >
            {data?.description}
          </Typography>
        </Card>
      </Stack>

      <MoreDataModal
        data={selectedService}
        open={openMore}
        onClose={() => setOpenMore(false)}
      />
    </>
  );
}

ServiceCard.propTypes = {
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
};
