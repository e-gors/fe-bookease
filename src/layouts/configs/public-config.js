import SvgColor from "../../components/svg-color";
import { HandleCache } from "../../utils/helpers";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
const user = HandleCache({ name: "user" }, "get");

const publicConfig = [
  {
    title: "Home",
    path: "#home",
    icon: icon("ic_dashboard"),
  },
  {
    title: "Services",
    path: "#services",
    icon: icon("ic_services"),
  },
  {
    title: "About",
    path: "#about",
    icon: icon("ic_services"),
  },
  {
    title: "Blog",
    path: "#blog",
    icon: icon("ic_blog"),
  },
  {
    title: "Contact",
    path: "#contact",
    icon: icon("ic_blog"),
  },
];

export default publicConfig;
