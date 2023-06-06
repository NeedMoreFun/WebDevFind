import React from 'react'
import { ProfileItem } from '../components/ProfileItem'
import { useParams } from 'react-router-dom'

export const ProfileIdPage = () => {
    const params = useParams();
  return (
    <ProfileItem userId={params.id}/>
  )
}