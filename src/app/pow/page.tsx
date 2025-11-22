import Projects from "@/components/pow/Projects"

function page() {
  return (
    <div className='px-2 md:px-8 md:my-32 my-24'>
      <Projects showAll={true} />
    </div>
  )
}
export default page