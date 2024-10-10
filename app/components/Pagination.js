'use client'

import { useRouter } from 'next/navigation'
import { Pagination } from '@nextui-org/react'

export default function BottomPagination ({ week }) {
  const router = useRouter()
  const handlePagination = (newWeek) => {
    router.push(`/loppemarkeder?week=/${newWeek}`)
  }

  return (
    <div>
      <Pagination total={52} initialPage={week} onChange={handlePagination} />
    </div>
  )
}
