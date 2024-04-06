// import { useToast } from "@/components/ui/use-toast";
import { Loader, BookCard } from "@/components/shared";
import { useGetRecentBooks, } from "@/lib/react-query/queries";

const Books = () => {
  // const { toast } = useToast();
  const {
    data: books,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentBooks();


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
          <h2 className="h3-bold md:h2-bold text-left w-full">Books and Resources</h2>
          {isPostLoading && !books ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
            {books && Array.isArray(books) && books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
            {/* If there are no posts */}
            {books && books.length === 0 && (
              <p className="text-light-1">No books found.</p>
            )}
          </ul>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default Books;
