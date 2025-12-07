export default function Loading() {
  return (
    <div className='px-4 sm:px-6 md:px-8 py-8 sm:py-12 mt-8 max-w-5xl mx-auto'>
      <div className='animate-pulse space-y-8'>
        <div className='h-12 bg-muted rounded w-3/4'></div>
        <div className='space-y-4'>
          <div className='h-4 bg-muted rounded'></div>
          <div className='h-4 bg-muted rounded w-5/6'></div>
          <div className='h-4 bg-muted rounded w-4/6'></div>
        </div>
        <div className='space-y-4'>
          <div className='h-4 bg-muted rounded'></div>
          <div className='h-4 bg-muted rounded w-5/6'></div>
          <div className='h-4 bg-muted rounded w-4/6'></div>
        </div>
        <div className='h-64 bg-muted rounded'></div>
        <div className='space-y-4'>
          <div className='h-4 bg-muted rounded'></div>
          <div className='h-4 bg-muted rounded w-5/6'></div>
        </div>
      </div>
    </div>
  )
}

