import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Application from '../models/Application.js'

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, salary, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                salary,
                text,
                imgUrl: fileName,
                applys: [],
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            salary,
            text,
            imgUrl: '',
            applys:[],
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get All Posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if (!posts) {
            return res.json({ message: 'Постов нет' })
        }

        res.json({ posts, popularPosts })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Маршрут для получения массива объектов по массиву ObjectId
    export const getApplysArray = async (req, res) => {
    try {
        const post  = await Post.findById(req.params.id)
        const list = await Promise.all(post.applys?.map((apply) => {
            return Application.findById(apply)
        }))
      res.json(list);
    } catch (error) {
      console.error('Error fetching objects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Маршрут для получения массива объектов по массиву ObjectId
  export const getApplysAuthors = async (req, res) => {
    try {
        const post  = await Post.findById(req.params.id)
        const applylist = await Promise.all(post.applys?.map((apply) => {
            return Application.findById(apply)
        }))
        const applyAuthorsList = await Promise.all(applylist.map((apply) => {
            return User.findById(apply.user)
        }))
      res.json(applyAuthorsList);
    } catch (error) {
      console.error('Error fetching objects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Get Post By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        res.json(post)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get All Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'Такого поста не существует' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        })

        res.json({ message: 'Пост был удален.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, salary, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text
        post.salary = salary

        await post.save()

        res.json(post)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}
