import { useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { account } from "../../../_mock/account";
import { usePathname, useRouter } from "../../../routes/hooks";
import { HandleCache } from "../../../utils/helpers";
import CustomAlert from "../../../components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Homepage",
    icon: "eva:home-fill",
    link: "/",
  },
  {
    label: "Dashboard",
    icon: "eva:dashboard-outline",
    link: "/dashboard",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    link: "/profile",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    link: "/settings",
  },
];

// ----------------------------------------------------------------------
export default function AccountPopover() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const userAccount = useSelector((state) => state.users.user);

  const { profilePicture, name, email } = userAccount;

  const [selectedUrl, setSelectedUrl] = useState(null);
  const [open, setOpen] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
    setOpen(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleOpenAccountMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavigate = (link) => {
    if (pathname === link) {
      handleClose();
    } else {
      router.push(link);
      setSelectedUrl(link);
    }
  };

  const handleLogout = () => {
    HandleCache({ name: "accessToken" }, "remove");
    dispatch(logoutUser())
    router.push("/login");
  };

  return (
    <>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleContinue={handleLogout}
        severity="warning"
        title="You are about to logout"
        message="Are you sure you want to continue? Please confirm if you want to proceed or cancel to stay logged in."
      />
      <IconButton
        onClick={handleOpenAccountMenu}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={profilePicture ? profilePicture : account.photoURL}
          alt={name ? name : account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {name ? name : account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {name ? name : account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email ? email : account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option, i) => (
          <MenuItem
            key={i}
            onClick={() => handleNavigate(option.link)}
            selected={option.link === selectedUrl}
            dense
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleOpenAlert}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
