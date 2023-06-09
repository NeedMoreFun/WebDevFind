import React, { useEffect, useState, useCallback } from "react"
import { checkIsAuth} from '../redux/features/auth/authSlice'
import { useDispatch, useSelector } from "react-redux"
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai"
import Moment from "react-moment"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { applyToJob } from "../redux/features/apply/applySlice"
import axios from "../utils/axios"
import { removePost } from "../redux/features/post/postSlice"

export const PostPage = () => {

  const isAuth = useSelector(checkIsAuth)

  const [applyAuthor, setApplyAuthor] = useState([])
  const [post, setPost] = useState(null)
  const [apply, setApply] = useState([])

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")

  const handleApply = () => {
    const id = post._id;
    dispatch(applyToJob({ id, message }))
      .then(() => {
        toast("Отклик отправлен!")
        console.log("Application submitted successfully! 1")
      })
      .catch((error) => {
        console.log("Failed to submit application:", error)
      });
  };

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast("Пост был удален")
      navigate("/posts")
    } catch (error) {
      console.log(error)
    }
  };

  const fetchApplysAuthors = useCallback(async () => {
    try {
        const { data } = await axios.get(`/posts/${params.id}/applys/authors`)
        setApplyAuthor(data)
    } catch (error) {
        console.log("failFetchAuthors")
    }
  }, [params.id])

  useEffect(() => {
    fetchApplysAuthors()
  }, [fetchApplysAuthors])

  const fetchApplys = useCallback(async () => {
    try {
        const { data } = await axios.get(`/posts/${params.id}/applys`)
        setApply(data)
    } catch (error) {
        console.log('err')  
    }
  },[params.id])

  useEffect(() => {
    fetchApplys()
  }, [fetchApplys])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }
  return (
    <div className="m-10">
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Назад
        </Link>
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <div className="text-white opacity-70 text-lg">{post.salary}₽</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.applys?.length || 0} </span>
              </button>
            </div>

            {(user?._id === post.author || user?.isAdmin) && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2  text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {isAuth && (
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <textarea className="p-1"
            placeholder="Сообщение"
            value={message}
            onChange={handleMessageChange}
          />
          <button onClick={handleApply} className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">Отправить отклик</button>
        </div>
        )}

    </div>
    {(user?._id === post.author || user?.isAdmin) && 
    (apply?.map((apply, idx) => (    
        <div className='m-2 bg-gray-600 p-2'>
            <Link to={`/profile/${applyAuthor[idx]?._id}`}>
                <p className="text-white text-l opacity-80">{applyAuthor[idx]?.fio}</p>
            </Link>
            <p className="text-white text-xs">{apply?.message}</p>
        </div>)))}
</div>)}
