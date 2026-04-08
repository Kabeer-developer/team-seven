const MemberCard = ({ member }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{member.name}</h3>
      <p>{member.roleInClub}</p>
      <p>{member.domain}</p>
    </div>
  );
};

export default MemberCard;