import IconGold from "../../icons/IconGold";

// LeaderboardItem3.js
const LeaderboardItem3 = ({ user }) => {
  const totalPosts = parseInt(user.total_posts, 10) || 0;
  const totalCommentsReceived = parseInt(user.total_comments_received, 10) || 0;
  const totalCommentsPosted = parseInt(user.total_comments_posted, 10) || 0;

  const totalActivityScore =
    totalPosts + totalCommentsReceived + totalCommentsPosted;

  // Helper function to handle "no" formatting
  const formatCount = (count, singular, plural) =>
    count === 0
      ? `no ${plural}`
      : `${count} ${count === 1 ? singular : plural}`;

  return (
    <li className="card border bg-[#fef6c2] mb-2 ">
      <div className="card-body p-4 md:p-6">
        <div className="flex gap-x-4 md:gap-x-0">
          <div className="w-8/12 md:w-10/12">
            <div className="flex items-center ">
              <IconGold />
              <div className="ms-3 text-xl md:text-3xl font-semibold">
                {user.name}
              </div>
            </div>
            <div className="mt-2 text-xs md:text-base">
              {formatCount(totalPosts, "post", "posts")},{" "}
              {formatCount(totalCommentsReceived, "comment", "comments")}{" "}
              received,{" "}
              {formatCount(totalCommentsPosted, "comment", "comments")} posted
            </div>
          </div>
          <div className="w-4/12 md:w-2/12 text-center mt-1 ">
            <div className="text-4xl md:text-5xl font-semibold tracking-tighter">
              {totalActivityScore}
            </div>
            <div className="text-xs md:mt-1 mt-3">Activity Score</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LeaderboardItem3;
