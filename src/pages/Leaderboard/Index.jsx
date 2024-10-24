import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getTopUsers } from "../../api/mutations";
import LeaderboardItem1 from "./LeaderboardItem1"; // Adjust the path as necessary
import LeaderboardItem2 from "./LeaderboardItem2"; // Adjust the path as necessary
import LeaderboardItem3 from "./LeaderboardItem3"; // Adjust the path as necessary
import LeaderboardItem from "./LeaderboardItem";
import Loading from "../Loading/Index";
import { format } from "date-fns";
import BackButton from "../../components/BackToHotPostsButton";

function Leaderboard() {
  const {
    data: topUsers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topUsers"],
    queryFn: getTopUsers,
    keepPreviousData: true,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <NavBar />
        <Loading />
      </>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <>
        <NavBar />
        <div className="center-container">Error loading leaderboard.</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="center-container">
        <div className="my-6">
          <BackButton />
          <h1 className="text-4xl font-bold">
            Top Users in {format(new Date(), "MMMM")}
          </h1>
        </div>

        <ul>
          {topUsers.map((user, index) => {
            if (index === 0) {
              return <LeaderboardItem1 key={user.id} user={user} />;
            } else if (index === 1) {
              return <LeaderboardItem2 key={user.id} user={user} />;
            } else if (index === 2) {
              return <LeaderboardItem3 key={user.id} user={user} />;
            } else {
              return <LeaderboardItem key={user.id} user={user} />;
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default Leaderboard;
