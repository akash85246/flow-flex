import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import closeEye from "../../assets/closeEye.svg";
import openEye from "../../assets/openEye.svg";
import wrongEye from "../../assets/wrongEye.svg";
import MyContext from "../../utils/context/MyContext";

function InputCard({
  label,
  type,
  value,
  onChange,
  className,
  regex,
  sideLabel,
  toggleSignInOption,
  confirm,
  isEmail,
  required, 
  setIsEmail,
  errorLabel,
  setValue,
  confirmPasswordRegex,
  ...rest
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showWrongEye, setShowWrongEye] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmWrongEye, setShowConfirmWrongEye] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  
  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (regex && !regex.test(inputValue)) {
      setInputError(errorLabel);
      setShowWrongEye(true);

      setValue("");
    } else {
      setInputError("");
      setShowWrongEye(false);

      setValue(inputValue);
    }

    setInputValue(inputValue);
    if (onChange) {
      onChange(inputValue);
    }
  };

  const handleConfirmChange = (event) => {
    const confirmInputValue = event.target.value;
    setConfirmValue(confirmInputValue);
  };

  useEffect(() => {
    if (type == "password") {
      if (confirmPasswordRegex && !confirmPasswordRegex.test(inputValue)) {
        setInputError("Invalid Password");
        setValue("");
      } else if (confirm) {
        setInputError("");
        if (confirmValue !== value) {
          setInputError("Passwords do not match");
          setShowConfirmWrongEye(true);
          setValue("");
        } else {
          setInputError("");
          setShowConfirmWrongEye(false);
          setValue(value);
        }
      }
    }
  }, [
    confirmValue,
    value,
    confirmPasswordRegex,
    showWrongEye,
    inputValue,
  ]);

  const handleToggleSignIn = (event) => {
    setIsEmail(!isEmail);
    handleChange(event);
    toggleSignInOption();
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between">
        <label htmlFor={rest.id} className="mb-1 text-white text-lg">
          {label}
        </label>
        {sideLabel && (
          <label>
            {" "}
            <p
              className="text-blue-300 cursor-pointer hover:text-blue-50"
              onClick={(event) => handleToggleSignIn(event)}
            >
              {isEmail ? "Use phone number" : "Use using email"}
            </p>
          </label>
        )}
      </div>
      {type !== "password" ? (
        <input
          id={rest.id}
          type={type}
          value={inputValue}
          onChange={handleChange}
          className="border-b-2 bg-transparent border-gray-300  py-2 px-3 focus:border-blue-300 outline-none  w-full text-white"
          required={required} // Corrected prop usage
          aria-label={label}
        />
      ) : (
        <div className="flex items-center relative">
          <input
            id={rest.id}
            type={showPassword ? "text" : "password"}
            value={inputValue}
            onChange={handleChange}
            className="border-b-2 bg-transparent border-gray-300  py-2 px-3 focus:border-blue-300 outline-none  w-full text-white"
            required={required} // Corrected prop usage
            aria-label={label}
          />
          <img
            src={showWrongEye ? wrongEye : showPassword ? closeEye : openEye}
            className="absolute right-0 cursor-pointer pr-2 w-8 h-8"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            onClick={() => setShowPassword(!showPassword)}
            alt="Toggle Password Visibility"
            aria-label="Toggle Password Visibility"
          />
        </div>
      )}
      {confirm && (
        <div className="flex flex-col my-5">
          <label htmlFor={rest.id} className="mb-1 text-white text-lg">
            Confirm {label}
          </label>
          <div className="flex items-center relative">
            <input
              id={`confirm-${rest.id}`}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmValue}
              onChange={handleConfirmChange}
              className="border-b-2 bg-transparent border-gray-300  py-2 px-3 focus:border-blue-300 outline-none  w-full text-white"
              required={required} // Corrected prop usage
              aria-label={`Confirm ${label}`}
            />
            <img
              src={
                showConfirmWrongEye
                  ? wrongEye
                  : showConfirmPassword
                  ? closeEye
                  : openEye
              }
              className="absolute right-0 cursor-pointer pr-2 w-8 h-8"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              alt="Toggle Password Visibility"
              aria-label="Toggle Password Visibility"
            />
          </div>
        </div>
      )}
      <div className="h-2">
        {inputValue && inputError && (
          <p className="text-red-400 text-sm">{inputError}</p>
        )}
      </div>
    </div>
  );
}

InputCard.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "tel",
    "url",
    "submit",
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  regex: PropTypes.instanceOf(RegExp),
  required: PropTypes.bool,
  sideLabel: PropTypes.bool,
  toggleSignInOption: PropTypes.func,
  confirm: PropTypes.bool,
  isEmail: PropTypes.bool,
  confirmPasswordRegex: PropTypes.instanceOf(RegExp),
};

InputCard.defaultProps = {
  type: "text",
  className: "",
  required: false,
  toggleSignInOption: () => {},
  value: "",
  confirm: false,
  isEmail: true,
};

export default InputCard;
