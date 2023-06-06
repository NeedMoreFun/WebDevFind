import React, { useCallback, useState, useEffect } from 'react'
import axios from '../utils/axios'
import {
    AiTwotoneEdit,
  } from "react-icons/ai";

import { Link } from 'react-router-dom';

export const ProfileItem = ({userId}) => {

    const [user, setUser] = useState(null);
    
    const fetchUser = useCallback(async () => {
        const {data} = await axios.get(`/auth/me/${userId}`)
        setUser(data)
    }, [userId])

      useEffect(() => {
        fetchUser();
      }, [fetchUser]);

  return (
    <div className='m-5'>
    <div className='text-xl text-gray-400 '>
      Профиль пользователя: <span className='text-gray-300 font-bold text-lg'>{user?.username}</span>
    </div>
    <div className='text-gray-400 text-lg'>ФИО: </div>
    <div className='text-white text-xl'>{user?.fio}</div>

    <div className='text-gray-400 text-lg'>Телефон: </div>
    <div className='text-white text-xl'>{user?.phoneNumber}</div>
    
    <div className='text-gray-400 text-lg'>E-mail: </div>
    <div className='text-white text-xl'>{user?.email}</div>

    <div className='text-gray-400 text-lg'>Дата Рождения: </div>
    <div className='text-white text-xl'>{user?.birthDate.toString().slice(0,10)}</div>

    <div className='text-gray-400 text-lg'>Обо мне: </div>
    <div className='text-white text-xl'>{user?.aboutMe}</div>

    <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center gap-2 text-white opacity-50">
            <Link to={`/profile/${user?._id}/edit`}>
                <AiTwotoneEdit />
            </Link>
        </button>
    </div>
  </div>
  )
}
