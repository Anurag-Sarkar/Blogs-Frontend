import {
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircleMore, // Discord-style
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 px-6 py-12">
      <div className="flex flex-wrap justify-around gap-10">
        {/* Social Section */}
        <div>
          <div className="mb-4">
            <img
              src="https://ik.imagekit.io/sheryians/light-logo_lNzGXRRlQ.png?updatedAt=1701272916848"
              alt="Sheryians Logo"
              className="h-12"
            />
          </div>
          <p className="mb-4 text-md">Let’s connect with our socials</p>
          <div className="flex space-x-4 text-gray-600">
            <a
              href="https://www.instagram.com/sheryians_coding_school"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 hover:text-black" />
            </a>
            <a
              href="https://in.linkedin.com/company/the-sheryians-coding-school"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 hover:text-black" />
            </a>
            <a
              href="https://discord.gg/D23JkFqrgz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleMore className="w-6 h-6 hover:text-black" />
            </a>
            <a
              href="https://www.youtube.com/@sheryians"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-6 h-6 hover:text-black" />
            </a>
            <a
              href="https://twitter.com/sheryians_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6 hover:text-black" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.sheryians.com/aboutUs" target="_blank" className="hover:underline">About Us</a></li>
            <li><a href="mailto:hello@sheryians.com" className="hover:underline">Support</a></li>
            <li><a href="https://www.sheryians.com/terms-and-conditions/Terms_and_Conditions.pdf" target="_blank" className="hover:underline">Privacy Policy</a></li>
            <li><a href="https://www.sheryians.com/terms-and-conditions/Terms_and_Conditions.pdf" target="_blank" className="hover:underline">Terms and Condition</a></li>
            <li><a href="https://www.sheryians.com/Pricing&Refund-Policy/Pricing-and-Refund_policy.pdf" target="_blank" className="hover:underline">Pricing and Refund</a></li>
            <li><a href="https://www.sheryians.com/hire" target="_blank" className="hover:underline">Hire From Us</a></li>
            <li><a href="https://www.sheryians.com/projects" target="_blank" className="hover:underline">Submit Projects</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold mb-4">COMMUNITY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://discord.gg/D23JkFqrgz" target="_blank" className="hover:underline">Discord</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+919691778470" className="hover:underline">+91 9691778470</a></li>
            <li><a href="tel:+918109161752" className="hover:underline">+91 8109161752</a></li>
            <li><a href="mailto:hello@sheryians.com" className="hover:underline">hello@sheryians.com</a></li>
            <li>
              <a
                href="https://www.google.com/maps/place/Sheryians+Coding+School/@23.2512609,77.4627502,17z"
                target="_blank"
                className="hover:underline"
              >
                23-B, Indrapuri Sector C,<br />
                Bhopal (MP), 462021
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © 2025 Sheryians Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}