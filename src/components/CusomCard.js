import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { ContainedButton } from "./CustomButtons";

export default function CustomCard(props) {
  return (
    <Card
      sx={{
        maxHeight: 350,
        backgroundColor: '#f1e8efff',
        boxShadow: 2
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3,
              maxHeight: "4.5em",
            }}
          >
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ContainedButton variant="contained">Book Now</ContainedButton>
      </CardActions>
    </Card>
  );
}
