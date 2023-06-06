import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
    }

    return (
        <div className='flex py-4 px-4 justify-between items-center bg-gray-600 bg-opacity-60'>
            <span className='flex justify-center items-center w-auto h-auto bg-gray-600 text-xs text-white rounded-sm p-2'>
                {isAuth && user?.username}
            </span>
            <span className='flex justify-center items-center w-auto h-auto text-xl text-white'>
                <NavLink to={'/'} href='/'>
                    WebDevFind
                </NavLink>
            </span>
            {isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-lg text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-lg text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои Вакансии
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-lg text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить Вакансию
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/profile/${user?._id}`}
                            href='/'
                            className='text-lg text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Профиль
                        </NavLink>
                    </li>
                </ul>
            )}


            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                {isAuth ? (
                    <button onClick={logoutHandler}>Log Out</button>
                ) : (
                    <Link to={'/login'}> Log In </Link>
                )}
            </div>
        </div>
    )
}
