import {
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircleMore, // Discord-style icon
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 px-6 py-12">
      <div className="flex justify-around">
        {/* Social Section */}
        <div>
          <div className="mb-4">
            <img src="/images/dark-logo.png" alt="Sheryians Logo" className="h-15" />
          </div>
          <p className="mb-4 text-md">Let’s connect with our socials</p>
          <div className="flex space-x-4 text-gray-600">
            <Instagram className="w-6 h-6" />
            <Linkedin className="w-6 h-6" />
            <MessageCircleMore className="w-6 h-6" />
            <Youtube className="w-6 h-6" />
            <Twitter className="w-6 h-6" />
          </div>
        </div>

        {/* Company Links */}
        <div className="">
          <h3 className="font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer"><a href="#">About Us</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Support</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Privacy Policy</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Terms and Condition</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Pricing and Refund</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Hire From Us</a></li>
            <li className="hover:underline cursor-pointer"><a href="#">Submit Projects</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold mb-4">COMMUNITY</h3>
          <ul className="space-y-2 ">
            <li className="hover:underline cursor-pointer"><a href="#">Discord</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 ">
            <li className="hover:underline cursor-pointer" >9691778470</li>
            <li className="hover:underline cursor-pointer" >8109161752</li>
            <li className="hover:underline cursor-pointer" ><a href="mailto:hello@sheryians.com">hello@sheryians.com</a></li>
            <li className="hover:underline cursor-pointer" >
              23-B, Indrapuri Sector C,<br />
              Bhopal (MP), 462021
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        Copyright © 2025 Sheryians Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}