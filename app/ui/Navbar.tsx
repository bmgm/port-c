"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (): void => {
    if (window.innerWidth < 1024) {
      // 1024px is the breakpoint for lg in Tailwind
      toggleMenu();
    }
  };

  const menuVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.3 },
        scale: { duration: 0.3, type: "tween", ease: "easeInOut" },
      },
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        opacity: { duration: 0.3 },
        scale: { duration: 0.3, type: "tween", ease: "easeInOut" },
      },
    },
  };

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
    { href: "/resume", text: "Resume" },
  ];

  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none z-50 relative"
            onClick={toggleMenu}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </motion.div>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="lg:flex lg:space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white hover:text-gray-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-gray-800 z-40 flex items-center justify-center lg:hidden"
            >
              <motion.ul className="text-center" variants={containerVariants}>
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    className="mb-6"
                    variants={linkVariants}
                  >
                    <Link
                      href={link.href}
                      className="text-white hover:text-gray-300 text-2xl"
                      onClick={handleNavLinkClick}
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
