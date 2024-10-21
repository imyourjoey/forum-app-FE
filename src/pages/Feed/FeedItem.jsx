import { formatDistanceToNowStrict } from "date-fns";

function FeedItem({ post }) {
  return (
    <>
      <div className="card bg-base-100 hover:bg-base-200 cursor-pointer border-2">
        <div className="card-body">
          <div className="text-gray-600 flex text-sm md:text-base">
            <div>{post.user.name}</div> <div className="mx-1.5">•</div>
            <div>
              {formatDistanceToNowStrict(new Date(post.created_at))} from now
            </div>
          </div>
          <div className="text-2xl md:text-4xl font-semibold md:my-1.5">
            {post.title}
          </div>

          <div className="text-gray-600 flex text-sm md:text-base">
            <div>{post.reactions_count} Resonance</div>
            <div className="mx-1.5">•</div>
            <div>
              {post.comments_count > 0
                ? `${post.comments_count} comment${
                    post.comments_count > 1 ? "s" : ""
                  }`
                : "No comments yet"}
            </div>
          </div>
        </div>
      </div>
      <div className="divider my-1.5"></div>
    </>
  );
}

export default FeedItem;
