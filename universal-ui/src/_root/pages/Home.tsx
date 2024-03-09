// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard} from "@/components/shared";
import { useGetRecentPosts, } from "@/lib/react-query/queries";

const Home = () => {
  // const { toast } = useToast();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();


  if (isErrorPosts ) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts && Array.isArray(posts) && posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
            {/* If there are no posts */}
            {posts && posts.length === 0 && (
              <p className="text-light-1">No posts found.</p>
            )}
          </ul>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default Home;
