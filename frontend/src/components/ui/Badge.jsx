const Badge = ({ text, color = "gray" }) => {
  const colors = {
    green: "#28a745",
    red: "#dc3545",
    blue: "#007bff",
    gray: "#6c757d",
  };

  return (
    <span
      style={{
        background: colors[color],
        color: "#fff",
        padding: "3px 8px",
        borderRadius: "5px",
        fontSize: "12px",
      }}
    >
      {text}
    </span>
  );
};

export default Badge;