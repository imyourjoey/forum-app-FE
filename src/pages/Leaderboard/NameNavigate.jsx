import { useNavigate } from "react-router-dom";

function NameNavigate({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="hover:underline hover:cursor-pointer"
        onClick={() => navigate(`/user-posts/${user.id}`)}
      >
        {user.name}
      </div>
    </>
  );
}

export default NameNavigate;
