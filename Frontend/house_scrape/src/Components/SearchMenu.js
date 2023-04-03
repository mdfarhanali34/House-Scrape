import React, { useState } from 'react';
const data = require('./locations.json');

const SearchMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [menuItemPosition, setMenuItemPosition] = useState({});

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setSubMenuOpen(!subMenuOpen);
    setSelectedProvince('');
  };

  const handleSubMenuClick = (province, e) => {
    e.stopPropagation();
    setSubMenuOpen(!subMenuOpen);
    setSelectedProvince(province);
    setMenuItemPosition({ top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight, left: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth + 20});
  };

  const keys = Object.keys(data).slice(1);
  const newKeys = keys.map(key => key.replace(/_/g, ' '));

  const provinces = selectedProvince && data[selectedProvince];
  const provinceKeys = Object.keys(provinces).slice(1);
  
  
  return (
    <div className="menu-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      <button className="menu-trigger" onClick={handleMenuClick} style={{display: 'inline-block', padding: '10px', border: '1px solid #ccc', cursor: 'pointer', hAlign: 'middle' }}>
        Province
      </button>
      {menuOpen && (
        <nav className="menu-dropdown" style={{ position: 'absolute' ,top: '100%', left: '0', zIndex: '999', backgroundColor: '#fff', border: '1px solid #ccc', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {newKeys.map(item => (
             <li style={{ whiteSpace: 'nowrap', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
              <a href="#" style={{ textDecoration: 'none', color: '#333' }} onClick={(e) => handleSubMenuClick(item, e)}>
                {item}
              </a>
             </li>
           ))}
        </nav>
      )}
      {provinceKeys && subMenuOpen && (
        <nav className="menu-dropdown" style={{ position: 'absolute', top: menuItemPosition.top, left: menuItemPosition.left, zIndex: '999', backgroundColor: '#fff', border: '1px solid #ccc', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {provinceKeys.map(city => (
            <li key={city} style={{ whiteSpace: 'nowrap', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
              <a href="#" style={{ textDecoration: 'none', color: '#333' }}>
                {city}
              </a>
            </li>
          ))}
        </nav>
      )}
    </div>
  );
};

export default SearchMenu;
