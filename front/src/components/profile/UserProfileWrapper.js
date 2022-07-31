import React from 'react'
import {useParams} from 'react-router-dom'
import Intro from '../intro/Intro'
import UserProfile from './UserProfile'
import { useTranslation} from "react-i18next";

const UserProfileWrapper = () => {
  const { t } = useTranslation();
    const {id}=useParams()
  return (
    <div>
      <Intro title={t("votre profile")}/>
      <UserProfile id={id}/>
    </div>
  )
}

export default UserProfileWrapper
