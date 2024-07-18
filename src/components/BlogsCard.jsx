import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

export default function BlogsCard(props) {
  return (
    <>
      <Card
        sx={{
          maxHeight: 380,
          backgroundColor: "white",
          borderRadius: 3,
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
            <Typography variant="subtitle1" sx={{ color: "#5ABED5" }}>
              Service 1
            </Typography>
            <Typography gutterBottom variant="h6">
              {props.title}
            </Typography>
            <Box
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 4,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {props.description}
              </Typography>
            </Box>
            <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
              <Avatar alt="Efren Goron" sx={{ width: 40, height: 40 }} />
              <Stack ml={2}>
                <Typography variant="subtitle2">
                  Efren Goron
                </Typography>
                <Typography variant="caption" color="text.secondary">March 18, 2024</Typography>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
