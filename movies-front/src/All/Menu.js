import React, { useEffect, useState } from 'react';
import { signout } from '../auth/user'
import "./style.css";

const Menu = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    // Check local storage for the user and token
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // If user and token exist in local storage, set signed-in status to true
    setIsUserSignedIn(!!(user && token));
  }, []);

  const menuItems = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Movies', link: '/movies' },
    { id: 3, title: 'SignIn', link: '/signin' },
    { id: 4, title: 'SignUp', link: '/signup' },
    { id: 5, title: 'SignOut', link: '/signout' },
  ];

  // Filter the menu items based on the user's sign-in status
  const filteredMenuItems = isUserSignedIn
    ? menuItems.filter(item => item.title === 'Home' || item.title === 'Movies' || item.title === 'SignOut')
    : menuItems.filter(item => item.title === 'Home' || item.title === 'SignIn' || item.title === 'SignUp');

  const handleSignOut = () => {
    signout(() => {
  
      setIsUserSignedIn(false);
    });
  };

  return (
    <nav className="menu">
      <ul>
        {filteredMenuItems.map(item => (
          <li className='nav-item' key={item.id}>
          {/* if signout */}
            {item.title === 'SignOut' ? (
              <a href="#" onClick={handleSignOut}>
                {item.title}
              </a>
            ) : (
              <a href={item.link}>{item.title}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
