import { assets } from '../assets/assets'
import { analytics, logEvent } from "../config/firebase";
import { useAppSelector } from '../redux/store/hooks';

const Footer = () => {
  const userRole = useAppSelector((state) => state.login.role);
  const userDetails = useAppSelector((state) => state.userProfile.data) || {};

  const handleLinkClick = (label: string, path: string) => {
    if (analytics) {
      logEvent(analytics, "footer_link_click", {
        link_label: label,
        link_path: path,
        user_role: userRole || "guest",
        user_id: userDetails._id || null,
      });
    }
  };

  const handleContactClick = (type: string, value: string) => {
    if (analytics) {
      logEvent(analytics, "footer_contact_click", {
        contact_type: type,
        contact_value: value,
        user_role: userRole || "guest",
        user_id: userDetails._id || null,
      });
    }
  };


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
              <li><a href="/" onClick={() => handleLinkClick("Home", "/")}>Home</a></li>
              <li><a href="/about" onClick={() => handleLinkClick("About", "/about")}>About</a></li>
              <li><a href="/contact" onClick={() => handleLinkClick("Contact", "/contact")}>Contact</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-5 text-teal">Get in touch</h2>
            <address className="text-sm space-y-2">
              <p onClick={() => handleContactClick("phone", "+1-212-456-7890")}>+1-212-456-7890</p>
              <a className='md:text-sm mb-4' href='mailto:insightlane@example.com' onClick={() =>
                handleContactClick("email", "insightlane@example.com")
              }>insightlane@example.com</a>

              <p className='md:text-sm mt-2' onClick={() =>
                handleContactClick("address", "221b Elementary Avenue, NY")
              }>221b Elementary Avenue, NY</p>
            </address>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright  {new Date().getFullYear()} &copy; InsightLane. All Right Reserved.
      </p>
    </footer >
  )
}

export default Footer