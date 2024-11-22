// src/components/BuildingForm.tsx
import React from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import "../styles.css";

interface Building {
  name: string;
  image: string; // Path to the image inside public/images folder
}

interface BuildingFormProps {
  buildings: Building[];
}

const BuildingForm: React.FC<BuildingFormProps> = ({ buildings }) => {
  return (
    <Grid container spacing={3}>
      {buildings.map((building, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              className="cardImage"
              image={`/images/${building.image}`} // Image from public/images
              alt={building.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {building.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BuildingForm;
