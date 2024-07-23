import { Box, Card, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";

export default function ServiceCard(props) {
  const { data = [], sx, selected, onSelectService, ...rest } = props;

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
            backgroundColor: selected ? "#fe9d8c" : "white",
            boxShadow: 2,
            cursor: "pointer",
            ...sx,
            transition: "0.5s",
            "&:hover": {
              boxShadow: 10,
            },
          }}
          onClick={() => onSelectService(data)}
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
                checked={selected}
                inputProps={{ "aria-labelledby": data?.name }}
                onClick={(e) => e.stopPropagation()}
              />
              <Typography variant="subtitle1">{data?.name}</Typography>
            </Stack>
            <Tooltip title={data?.description} arrow sx={{ cursor: "pointer" }}>
              <InfoIcon
                sx={{
                  color: selected ? "white" : "black",
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
    </>
  );
}

ServiceCard.propTypes = {
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
  selected: PropTypes.bool,
  onSelectService: PropTypes.func,
};
