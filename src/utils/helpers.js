import ReeValidate from "ree-validate-18";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

export const handleErrorResponse = (err) => {
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data &&
    err.response.data.errors
  ) {
    const message = [];
    for (const key in err.response.data.errors) {
      message.push(err.response.data.errors[key][0]);
    }

    return message.join(" ");
  }

  return (
    (err && err.response && err.response.data && err.response.data.message) ||
    err.message
  );
};

export const Validator = (fields) => {
  const validator = new ReeValidate.Validator(fields);

  const formatFieldName = (field) => {
    // Replace camelCase with spaces
    field = field.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Replace underscores with spaces and capitalize the first letter
    return field
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const dictionary = {
    en: {
      messages: {
        required: (field) => `${formatFieldName(field)} is required!`,
        email: (field) =>
          `${formatFieldName(field)} must be a valid email address!`,
        number: (field) => `${formatFieldName(field)} must be a number!`,
        regex: (field) => `${formatFieldName(field)} format is invalid!`,
        min: (field) =>
          `${formatFieldName(field)} must be at least 6 chars length!`,
        max: (field) =>
          `${formatFieldName(field)} must only be 20 chars length!`,
        // is: (field, [confirmedField]) =>
        //   `${formatFieldName(field)} must match ${formatFieldName(
        //     confirmedField
        //   )}!`,
      },
    },
  };

  validator.localize(dictionary);

  return validator;
};

export const isAuth = () => {
  return !!localStorage.getItem("accessToken");
};

export const isEmpty = (value) => {
  if (typeof value === "string") {
    return !value.trim();
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value && typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return !value;
};

export const isMatchPassword = (password, re_password) => {
  return password === re_password;
};

// Local Storage handling
export const HandleCache = (data, method) => {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.method === "set") {
        localStorage.setItem(item.name, JSON.stringify(item.data));
      } else if (item.method === "get") {
        return JSON.parse(localStorage.getItem(item.name));
      } else if (item.method === "remove") {
        localStorage.removeItem(item.name);
      }
    });
  } else {
    if (method === "set") {
      localStorage.setItem(data.name, JSON.stringify(data.data));
    } else if (method === "get") {
      return JSON.parse(localStorage.getItem(data.name));
    } else if (method === "remove") {
      localStorage.removeItem(data.name);
    }
  }
};

//Local Storage handling Props
HandleCache.propTypes = {
  data: PropTypes.object.isRequired,
  method: PropTypes.string.isRequired,
};

//get profile of the user to be display in the table
export const getProfile = (imageUrl, gender, index) => {
  let url;

  if (imageUrl) {
    url = imageUrl;
  } else {
    // Determine the maximum index based on gender
    const maxIndex = gender === "male" ? 7 : 8;

    // Calculate the actual index using modulus to loop within 0-8 range
    const avatarIndex = index % maxIndex;

    // Construct the URL based on gender and avatar index
    if (gender === "male") {
      url = `/assets/images/avatars/m_avatar_${avatarIndex}.jpg`;
    } else {
      url = `/assets/images/avatars/f_avatar_${avatarIndex}.jpg`;
    }
  }

  return url;
};

//convert value to money format
export const toMoneyFormat = (value, precision = 2) => {
  return parseFloat(value)
    .toFixed(precision)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

//optimizing fetch

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

// Compare two arrays
export const compareArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!isEqual(arr1[i], arr2[i])) return false; // Use lodash's isEqual for deep comparison
  }
  return true;
};
