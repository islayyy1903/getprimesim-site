import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/logo.png" 
                alt="PrimeSim - eSim Services Logo" 
                width={384} 
                height={256}
                className="h-auto"
              />
            </Link>
            <p className="text-sm">
              Stay connected worldwide with reliable eSim services.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/esim" className="hover:text-cyan-400 transition-colors">
                  eSim Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@getprimesim.com" className="hover:text-cyan-400 transition-colors">
                  info@getprimesim.com
                </a>
              </li>
              <li className="text-sm">getprimesim.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PrimeSim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

