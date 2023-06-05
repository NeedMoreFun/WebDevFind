import Application from "../models/Application.js";
import Post from "../models/Post.js";

export const createApply = async (req, res) => {
    const { id } = req.params;
  
    try {
      const newApplication = new Application({
        postId: id,
        message: req.body.message,
        user: req.userId,
      })

      await newApplication.save()

      const post = await Post.findById(id)
      console.log(id, newApplication._id)
      post.applys.push(newApplication._id)
      await post.save()

      res.status(200).json(newApplication);
    } catch (error) {
      res.json({message: 'Failed!('})
    }
  }
  