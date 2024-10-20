import NavBar from "../../components/Navbar";
import IllusNotFound from "../../assets/Illustrations/IllusNotFound";

function NotFound() {
  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Navbar at the top */}
        <NavBar />

        {/* Center the IllusNotFound */}
        <div className="flex-grow flex flex-col  items-center justify-center">
          <IllusNotFound width="50%" height="50%" />
          <div className="text-4xl font-bold ogg">Nothing here...</div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
