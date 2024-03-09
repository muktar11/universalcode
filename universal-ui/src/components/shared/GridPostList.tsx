






const GridPostList = () => {

  return (
    <ul className="grid-container">
    
        <li  className="relative min-w-80 h-80">
         
            <img
              src={ "/assets/icons/profile-placeholder.svg"}
              alt="post"
              className="h-full w-full object-cover"
            />
          

          <div className="grid-post_user">
          
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                   
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">creator.name</p>
              </div>
            
        
          </div>
        </li>
      
    </ul>
  );
};

export default GridPostList;
