import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/features/auth/authSlice'
import axios from '../utils/axios'
import { useParams } from 'react-router-dom'

export const EditProfilePage = () => {
    const [username, setUsername] = useState('')
    const [fio, setFio] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const params = useParams()

    const fetchUser = useCallback(async () => {
        const { data } = await axios.get(`/auth/me/${params.id}`)
        console.log(data)
        setUsername(data.username)
        setFio(data.fio)
        setBirthDate(data.birthDate)
        setAboutMe(data.aboutMe)
        setPhoneNumber(data.phoneNumber)
        setEmail(data.email)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedUser = new FormData()
            updatedUser.append('username', username)
            updatedUser.append('fio', fio)
            updatedUser.append('birthDate', birthDate)
            updatedUser.append('aboutMe', aboutMe)
            updatedUser.append('phoneNumber', phoneNumber)
            updatedUser.append('email', email)
            updatedUser.append('id', params.id)
            dispatch(updateUser(updatedUser))
            goBack()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const goBack = () => {
        try {
            window.history.back()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-5'
        >
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                ФИО:
                <input
                    type='text'
                    value={fio}
                    onChange={(e) => setFio(e.target.value)}
                    placeholder='ФИО'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Дата рождения:
                <input
                    type='date'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder='ДД.ММ.ГГГГ'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Телефон:
                <input
                    type='text'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='+7XXXXXXXXXX'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                E-mail:
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='e-mail'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Обо мне:
                <textarea
                    type='text'
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    placeholder='Хто я?'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs h-40 outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Обновить
                </button>

                <button
                    onClick={goBack}
                    className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}