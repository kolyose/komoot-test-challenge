import React, { useEffect } from 'react'
import { TourData } from '../types/api'
import CardHeader from './CardHeader'

function ActivityCard(props: TourData) {
  const {
    name,
    creator: {
      avatar: { src },
    },
  } = props

  return (
    <div className="m-2 h-full w-9/10 rounded-lg bg-white p-4 shadow-md">
      <CardHeader displayName={name} avatarUrl={src} />
    </div>
  )
}

export default ActivityCard
