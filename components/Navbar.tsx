import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={60} height={30} style={
            {
              filter: 'invert(100%)'
            }
          } />
          <p>MeetHere</p>
        </Link>
        <ul className='list-none'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/join">Join Us</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
