"use client";

import { FaEnvelope, FaFacebookF, FaShieldAlt, FaWhatsapp, FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

export default function SocialMidea() {

    return (
        <div
            className={
                `fixed top-0 left-0 w-full z-50 text-gray-100 text-sm py-2 px-4
                flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6
                bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg
                transition-all duration-500`
            }
            style={{ minHeight: "40px" }}
        >
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <a
                    href="https://wa.me/51907107807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-green-500 transition-colors duration-200"
                >
                    <FaWhatsapp className="w-4 h-4 text-green-700" />
                    <span className="hidden md:inline text-gray-200">+51 907 107 807</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61572236218259" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-200">
                    <FaFacebookF className="w-4 h-4 text-blue-700" />
                    <span className="hidden md:inline text-gray-200 font-semibold">CTSP Junín</span>
                </a>


                <span className="flex items-center gap-1">
                    <FaEnvelope className="w-4 h-4 text-blue-300" />
                    <span className="hidden md:inline text-gray-200">colegiotsvihyo@gmail.com</span>
                </span>

            </div>

            <div className="flex items-center mt-1 md:mt-0">
                <a href="/login" className="bg-white text-blue-500 font-semibold px-3 py-1 rounded-xl hover:bg-indigo-100 transition-colors duration-300 flex items-center gap-1 shadow-md">
                    <FaShieldAlt className="w-3 h-3 text-orange-300" />
                    <span className="">Intranet</span>
                </a>
            </div>
        </div>
    );
} 