import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { validationSchema } from "../utils/validationSchema";
import { CircleX, EyeIcon, EyeOff, LoaderCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const AuthForm = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [key, setKey] = useState(0);
  const {
    signin,
    signup,
    contactMessage,
    passwordMessage,
    user,
    setContactMessage,
    setPasswordMessage,
    isSigning,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    setKey((prev) => prev + 1);
    setShowPassword(false);
    setContactMessage("");
    setPasswordMessage("");
  }, [location.pathname, setContactMessage, setPasswordMessage]);

  const currentForm = location.pathname.includes("signup")
    ? "Sign Up"
    : "Sign In";

  return (
    <div className="bg-black/75 p-16 pt-13 rounded-sm w-full max-w-md mx-4 mb-21.5">
      <h1 className="text-white text-[32px] font-bold mb-8">{currentForm}</h1>

      <Formik
        key={key}
        initialValues={{ contact: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (currentForm === "Sign Up") {
            signup(values.contact, values.password);
          } else {
            signin(values.contact, values.password);
          }
        }}
      >
        {({ isSubmitting, resetForm, handleChange }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="contact"
                placeholder="Email or mobile number"
                autoComplete="off"
                className="w-full p-[15px] rounded bg-zinc-800/30 text-white placeholder-zinc-300 border border-zinc-600 focus:border-white focus:outline-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setContactMessage("");
                }}
              />
              <ErrorMessage name="contact" className="text-red-500">
                {(msg) => (
                  <>
                    <CircleX className=" text-red-500 w-4 inline mr-1" />
                    <small className="text-red-500">{msg}</small>
                  </>
                )}
              </ErrorMessage>
              <div
                className={`text-red-500 ${
                  contactMessage ? "block" : "hidden"
                }`}
              >
                <CircleX className="w-4 inline mr-1" />
                <small>{contactMessage}</small>
              </div>
            </div>

            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="off"
                className="w-full p-[15px] rounded bg-zinc-800/30 text-white placeholder-zinc-300 border border-zinc-600 focus:border-white focus:outline-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setPasswordMessage("");
                }}
              />
              <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-white/20 flex justify-center items-center transition duration-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <EyeOff className=" text-white w-4 h-4" />
                ) : (
                  <EyeIcon className=" text-white w-4 h-4" />
                )}
              </div>
              <ErrorMessage name="password" className="text-red-500">
                {(msg) => (
                  <>
                    <CircleX className=" text-red-500 w-4 inline mr-1" />
                    <small className="text-red-500">{msg}</small>
                  </>
                )}
              </ErrorMessage>
              <div
                className={`text-red-500 ${
                  passwordMessage ? "block" : "hidden"
                }`}
              >
                <CircleX className="w-4 inline mr-1" />
                <small>{passwordMessage}</small>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSigning}
              className={`w-full text-white py-2 rounded font-medium transition duration-300 ${
                isSigning
                  ? "cursor-not-allowed bg-red-900"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              {!isSigning && currentForm}
              {isSigning && <LoaderCircle className="animate-spin mx-auto" />}
            </button>

            <div className="mt-6 text-zinc-400 space-y-4.5">
              <p>
                {currentForm === "Sign Up"
                  ? "Already have an account"
                  : "New to Netflix"}
                ?{" "}
                <Link
                  to={`/${currentForm === "Sign Up" ? "signin" : "signup"}`}
                  className="text-white hover:!underline"
                  onClick={() => {
                    resetForm();
                    setShowPassword(false);
                    setContactMessage("");
                    setPasswordMessage("");
                  }}
                >
                  Sign now.
                </Link>
              </p>

              <p className="leading-4.5 text-xs mb-0.5">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </p>

              <small className="text-blue-400 !underline text-xs">
                Learn more.
              </small>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
