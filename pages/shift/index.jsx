import withAuth from '@/authentication/withauth'
import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default withAuth(index)