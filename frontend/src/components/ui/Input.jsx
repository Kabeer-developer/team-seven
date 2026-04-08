const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "100%",
      }}
    />
  );
};

export default Input;