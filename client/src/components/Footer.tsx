import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-gray-50"
      role='contentinfo'>
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img className="h-9" src={assets.logo} alt="InsightLane Logo" />
          <p className="mt-6 text-sm">
            Share your ideas, explore new perspectives, and connect through stories on InsightLane – a platform for all voices.
          </p>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20">
          <nav aria-label="Footer Navigation">
            <h2 className="font-semibold mb-5 text-teal">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-5 text-teal">Get in touch</h2>
            <address className="text-sm space-y-2">
              <p>+1-212-456-7890</p>
              <p className='md:text-sm'>insightlane@example.com</p>
              <p className='md:text-sm'>221b Elementary Avenue, NY</p>
            </address>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright  {new Date().getFullYear()} © InsightLane. All Right Reserved.
      </p>
    </footer >
  )
}

export default Footer