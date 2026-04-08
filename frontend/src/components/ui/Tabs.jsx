import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab headers */}
      <div style={{ display: "flex", gap: "10px" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            style={{
              padding: "8px",
              background: active === index ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ marginTop: "15px" }}>
        {tabs[active].content}
      </div>
    </div>
  );
};

export default Tabs;