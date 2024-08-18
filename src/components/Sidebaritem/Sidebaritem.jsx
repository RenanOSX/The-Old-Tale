import React from 'react';
import './SidebarItem.css';

function SidebarItem({ icon, text }) {
  return (
    <div className="sidebar-item">
      <img loading="lazy" src={icon} alt="" className="sidebar-item-icon" />
      <div className="sidebar-item-text">{text}</div>
    </div>
  );
}

export default SidebarItem;
