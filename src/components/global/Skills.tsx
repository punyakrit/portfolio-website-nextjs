import React from 'react'

function Skills({skillTag, skillName}: {skillTag: string, skillName: string}) {
  return (
    <div className='flex flex-wrap gap-2'>
        <span className='text-sm text-gray-500'>{skillTag}</span>
        <span className='text-sm text-gray-500'>{skillName}</span>
    </div>
  )
}

export default Skills