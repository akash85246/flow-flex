import React from "react";
import { Vortex } from "react-loader-spinner";

const Button = (props) => {
  const buttonStyle = {
    backgroundColor: props.loading ? "#ccc" : "",
    cursor: props.loading ? "not-allowed" : "pointer",
  };

  return (
    <div className="button-container">
      <button
        className={`${props.class} flex justify-between items-center `}
        type={props.type}
        style={buttonStyle}
        disabled={props.disabled || props.loading} // Disable the button when loading
        onClick={props.onClick}
      >
        {props.loading ? (
          <Vortex
            visible={true}
            height="20"
            // width="80"
            ariaLabel="vortex-loading"
            style={{
              // display: "inline-block",
              // margint: "auto",
              // verticalAlign: "middle",
            }}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        ) : (
          <div className="flex justify-center items-center gap-2 w-full">
            {props.image && (
              <img src={props.image} className="w-5 h-5" alt="Button Icon" />
            )}
            <span>{props.label}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Button;
