import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#81D8D0] text-black p-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="font-semibold">© 2026 Luxe Jewellery. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
