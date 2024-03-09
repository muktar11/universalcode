import { Models } from "appwrite";
import { multiFormatDateString } from "@/lib/utils";


type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
 
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
         
            <img
              src={
                
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
         
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              caption
            </p>
            <div className="flex-center gap-2 text-light-3">
            
            
            </div>
          </div>
        </div>

    
    
      </div>

    
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
         
        </div>
    
        <img
          src={post.image || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />

<div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$created_at)}
              </p>
            </div>


      
    </div>
  );
};

export default PostCard;
