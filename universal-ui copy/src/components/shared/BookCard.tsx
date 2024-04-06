import { Models } from "appwrite";
import { multiFormatDateString } from "@/lib/utils";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

type BookCardProps = {
  book: Models.Document;
};

const BookCard = ({ book }: BookCardProps) => {
 
  return (
    <div className="post-card">
      <div className="flex-between">
    
    
      </div>

    
        <div className="small-medium lg:base-medium py-5">
          <p>{book.caption}</p>
         
        </div>
    

        <div className="small-medium lg:base-medium py-5">
        <DocViewer
  documents={[{ uri: book.Book_imageUrl }]}
  initialActiveDocument={{ uri: book.Book_imageUrl }} // Set the first document as the initial active document
  pluginRenderers={DocViewerRenderers}
  style={{ height: 500, width: 800 }}
  
/>


         
        </div>
        

<div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(book.$created_at)}
              </p>
            </div>


      
    </div>
  );
};

export default BookCard;
