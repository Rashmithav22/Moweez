'use client';

export default function Header() {
  return (
    <header >
      <div className="flex items-center justify-between">
        <nav>
          <ul className="flex ">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
