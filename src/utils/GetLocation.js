import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const GetLocation = () => {
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(accuracy);
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
            );
            if (response.data && response.data.results.length > 0) {
              const addressComponents =
                response.data.results[0].address_components;
              let formattedAddress = "";

              // Construct the address from specific components
              addressComponents.forEach((component) => {
                if (component.types.includes("street_number")) {
                  formattedAddress += `${component.long_name}, `;
                } else if (component.types.includes("route")) {
                  formattedAddress += `${component.short_name} `;
                } else if (component.types.includes("sublocality_level_1")) {
                  formattedAddress += `Barangay ${component.long_name} `;
                } else if (component.types.includes("locality")) {
                  formattedAddress += `${component.long_name}, `;
                } else if (
                  component.types.includes("administrative_area_level_2")
                ) {
                  formattedAddress += `${component.long_name}, `;
                } else if (
                  component.types.includes("administrative_area_level_1")
                ) {
                  formattedAddress += `${component.long_name}, `;
                } else if (component.types.includes("country")) {
                  formattedAddress += `${component.long_name}`;
                }
              });

              setAddressDetails(formattedAddress);
            } else {
              console.error("No address found for the coordinates");
            }
          } catch (error) {
            console.error("Error fetching address details:", error);
          }
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchAddressDetails();
  }, []);

  return (
    <Box>
      <div>
        <h2>Current Location:</h2>
        {addressDetails ? <p>{addressDetails}</p> : <p>Loading...</p>}
      </div>
    </Box>
  );
};

export default GetLocation;
