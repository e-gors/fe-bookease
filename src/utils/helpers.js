import ReeValidate from "ree-validate-18";

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
    // replace underscores with spaces and capitalize the first letter
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
        min: (field) => `${formatFieldName(field)} must be at least 6 chars length!`,
        max: (field) => `${formatFieldName(field)} must only be 20 chars length!`,
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
