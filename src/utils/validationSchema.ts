import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  contact: Yup.string()
    .trim()
    .test("", function (value) {
      if (!value) {
        return this.createError({ message: "Email or mobile is required" });
      }

      const isMobile = /^[\d\s]+$/.test(value);

      if (isMobile) {
        if (/\s/.test(value)) {
          return this.createError({ message: "Mobile can't contain spaces" });
        }

        return value.length === 10
          ? true
          : this.createError({ message: "Invalid mobile" });
      } else {
        if (/\s/.test(value)) {
          return this.createError({ message: "Email can't contain spaces" });
        }

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
          ? true
          : this.createError({ message: "Invalid email" });
      }
    }),

  password: Yup.string()
    .trim()
    .test("", function (value) {
      if (!value) {
        return this.createError({ message: "Password is required" });
      } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        return this.createError({ message: "Password must be case-sensitive" });
      } else if (!/[^\w\s]/.test(value)) {
        return this.createError({
          message: "Password must contain a special character",
        });
      } else if (!/\d/.test(value)) {
        return this.createError({ message: "Password must contain a number" });
      } else if (/\s/.test(value)) {
        return this.createError({ message: "Password can't contain spaces" });
      } else if (value.length < 8) {
        return this.createError({ message: "Password minimum length is 8" });
      } else if (value.length > 30) {
        return this.createError({ message: "Password maximum length is 30" });
      } else {
        return true;
      }
    }),
});
