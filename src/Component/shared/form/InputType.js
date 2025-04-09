// import React from "react";

// const InputType = ({
//   labelText,
//   labelFor,
//   inputType = "text",
//   value,
//   onChange,
//   name,
//   placeholder = "",
// }) => {
//   return (
//     <div className="mb-1">
//       <label htmlFor={labelFor} className="form-label">
//         {labelText}
//       </label>
//       <input
//         type={inputType}
//         className="form-control"
//         name={name}
//         required
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// export default InputType;


import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";


const InputType = ({
  labelText,
  labelFor,
  inputType = "text",
  value,
  onChange,
  name,
  placeholder = "",
}) => {
  return (
    <FormControl isRequired>

      
      <FormLabel  fontWeight="500" color="gray.700">{labelText}</FormLabel>
      <Input
        type={inputType}
        className="form-control"
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
     </FormControl>
  );
};

export default InputType;
