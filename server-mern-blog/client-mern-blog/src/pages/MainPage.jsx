import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
    const dispatch = useDispatch()

    const { posts, popularPosts } = useSelector((state) => state.post)
    
    const [ popularChecked, setPopularChecked ] = useState(false)
    const [ dateChecked, setDateChecked ] = useState(true)
    const [ salaryChecked, setSalaryChecked ] = useState(false)
    
    const sortPosts = [...posts] 

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Вакансий нет.
            </div>
        )
    }

    function popularHandler() {
        setDateChecked(false)
        setSalaryChecked(false)
        setPopularChecked(true)
    }
    
    function salaryHandler() {
        setDateChecked(false)
        setSalaryChecked(true)
        setPopularChecked(false)
    }

    function dateHandler() {
        setDateChecked(true)
        setSalaryChecked(false)
        setPopularChecked(false)
    }

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='basis-1/3'>
                    <div className='text-lg uppercase text-white'>
                        Сортировка по
                    </div>
                    <ul className='ml-2'>
                        <li className='hover:bg-gray-500 p-1 rounded' onClick={popularHandler}>
                            <input type="checkbox" checked={popularChecked}/>
                            <label className='ml-2 text-white'>Популярности</label>
                        </li>
                        <li className='hover:bg-gray-500 p-1 rounded'  onClick={salaryHandler}>
                            <input type="checkbox" checked={salaryChecked}/>
                            <label className='ml-2 text-white'>Зарплате</label>
                        </li>
                        <li className='hover:bg-gray-500 p-1 rounded'  onClick={dateHandler}>
                            <input type="checkbox" checked={dateChecked}/>
                            <label className='ml-2 text-white'>Дате публикации</label>
                        </li>
                    </ul>
                    <div className='text-lg uppercase text-white'>
                        Должность
                    </div>
                    <ul className='ml-2'>
                        <li className='hover:bg-gray-500 p-1 rounded'>
                            <input type="checkbox"/>
                            <label className='ml-2 text-white'>Frontend</label>
                        </li>
                        <li className='hover:bg-gray-500 p-1 rounded'>
                            <input type="checkbox"/>
                            <label className='ml-2 text-white'>Backend</label>
                        </li>
                        <li className='hover:bg-gray-500 p-1 rounded'>
                            <input type="checkbox"/>
                            <label className='ml-2 text-white'>FullStack</label>
                        </li>
                        <li className='hover:bg-gray-500 p-1 rounded'>
                            <input type="checkbox"/>
                            <label className='ml-2 text-white'>TeamLead</label>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col gap-10 basis-4/5' id='postArray'>
                   {(popularChecked && (
                        sortPosts?.sort((a, b) => b.views - a.views).map((post, idx) => (
                            <PostItem key={idx} post={post} />
                        ))
                    ))}
                    {(dateChecked && (
                        sortPosts?.map((post, idx) => (
                            <PostItem key={idx} post={post} />
                        ))
                    ))}
                    {(salaryChecked && (
                        sortPosts?.sort((a, b) => b.salary - a.salary).map((post, idx) => (
                            <PostItem key={idx} post={post} />
                        ))
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>

                    {popularPosts?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
