import React from 'react'

async function page({params} : {params: Promise<{pollId : string}>}) {
    const pollId = (await params).pollId
  return (
    <div>page: {pollId}</div>
  )
}

export default page