import { assets } from '../assets/assets'

const Footer = () => {
  return (
<footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-gray-50">
  <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
    <div className="md:max-w-96">
      <img className="h-9" src={assets.logo} alt="logo" />
      <p className="mt-6 text-sm">
       Share your ideas, explore new perspectives, and connect through stories on InsightLane – a platform for all voices.
      </p>
    </div>
    <div className="flex-1 flex items-start md:justify-end gap-20">
      <div>
        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
        <ul className="text-sm space-y-2">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
        <div className="text-sm space-y-2">
          <p>+1-212-456-7890</p>
          <p>insightlane@example.com</p>
        </div>
      </div>
    </div>
  </div>
  <p className="pt-4 text-center text-xs md:text-sm pb-5">
    Copyright  {new Date().getFullYear()} © InsightLane. All Right Reserved.
  </p>
</footer>

  )
}

export default Footer