import Post from "../models/Post.js";


//create

export const createPost = async (req,res ) =>{
    try {
        const { userId, description, picturePath } = req.body;
        const user = await UserActivation.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [] 
        })

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);

    } catch (error) {
        req.status(409).json({message: error.message })
    }
}

//Read

export const getFeedPosts = async(req,res) => {
try {

    const post = await Post.find();

    res.status(201).json(post);
    
} catch (error) {
    req.status(409).json({message: error.message })
}

}

export const getUserPosts = async (req, res)=>{
    try {
       
        const { userId } = req.params;
        const post = await Post.find({userId});

        res.status(201).json(post);
        
    } catch (error) {
        req.status(409).json({message: error.message })
    }
}

//update

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true }
        )

        res.status(201).json();  
    } catch (error) {
        req.status(409).json({message: error.message })
    }
}
