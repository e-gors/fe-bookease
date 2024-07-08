import { Helmet } from "react-helmet-async";
import AppointmentView from "../modules/Private/sections/appointment/view/AppointmentView";

export default function Appointments(){
    return(
        <>
      <Helmet>
        <title> Appointments | BookEase </title>
      </Helmet>

      <AppointmentView />
    </>
    )
}