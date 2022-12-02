import React, { ChangeEvent, useState } from "react";
import { Box, Button, Slide, TextField, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  hidden: boolean;
  addUser: (userData: UserData) => void;
  hide: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f6f6f6",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const AddUserForm: React.FC<Props> = ({ hidden, hide, addUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
  });

  const submitHandler = () => {
    let hasErrors = false;
    const validPhone = /^(?:[0-9] ?){6,14}[0-9]$/;
    const onlyLetters = /^[a-zA-Z]+$/;
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (userData.name.length < 3 || userData.name.length > 30) {
      setErrors((prev) => ({
        ...prev,
        name: "Put more than 3 and less than 30 characters",
      }));
      hasErrors = true;
    } else if (!userData.name.match(onlyLetters)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should consist of only letters, no spacing",
      }));
      hasErrors = true;
    }

    if (!userData.email.match(validEmail)) {
      setErrors((prev) => ({ ...prev, email: "Invalid e-mail" }));
      hasErrors = true;
    }

    if (!userData.phone.match(validPhone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter valid phone",
      }));
      hasErrors = true;
    }

    if (userData.country.length < 1 || userData.country.length > 30) {
      setErrors((prev) => ({ ...prev, city: "Invalid length" }));
      hasErrors = true;
    } else if (userData.country.includes("2")) {
      setErrors((prev) => ({
        ...prev,
        city: "Country should consist only of letters",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }
    addUser(userData);
    setUserData({
      name: "",
      phone: "",
      email: "",
      address: "",
      country: "",
    });
    closeFormHandler();
  };

  const closeFormHandler = () => {
    hide();
    setUserData({
      name: "",
      phone: "",
      email: "",
      address: "",
      country: "",
    });
  };

  const changeHandler =
    (key: keyof UserData) =>
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newErrors = { ...errors };
      newErrors[key] = "";
      setErrors(newErrors);

      const newUserData = { ...userData };
      newUserData[key] = e.target.value;
      setUserData(newUserData);
    };

  return (
    <div>
      <Slide direction="left" in={!hidden} mountOnEnter unmountOnExit>
        <div>
          <Box component="form" sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Add new user</Typography>
              <Button onClick={closeFormHandler}>
                <AiOutlineClose />
              </Button>
            </Box>
            <TextField
              required
              label="Name"
              value={userData.name}
              onChange={changeHandler("name")}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              required
              label="phone"
              value={userData.phone}
              onChange={changeHandler("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              required
              label="Email"
              value={userData.email}
              onChange={changeHandler("email")}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              required
              label="address"
              value={userData.address}
              onChange={changeHandler("address")}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              required
              label="Country"
              value={userData.country}
              onChange={changeHandler("country")}
              error={!!errors.country}
              helperText={errors.country}
            />
            <Button
              variant="contained"
              onClick={submitHandler}
              disabled={
                !userData.name ||
                !userData.phone ||
                !userData.email ||
                !userData.address ||
                !userData.country
              }
            >
              Submit
            </Button>
          </Box>
        </div>
      </Slide>
    </div>
  );
};

export default AddUserForm;
