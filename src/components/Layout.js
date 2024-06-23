import { Badge } from 'antd';
import './Layout.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const userMenu = [
        {
            name: "Home",
            path: '/',
            icon: 'ri-home-office-fill'
        },
        {
            name: "Appointments",
            path: '/appointments',
            icon: 'ri-file-list-3-fill'
        },
        {
            name: "Apply Doctor",
            path: '/apply-doctor',
            icon: 'ri-hospital-fill'
        },
        //can create a profile page later
        // {
        //     name: "Profile",
        //     path: '/profile',
        //     icon: 'ri-profile-fill'
        // },
    ];

    const adminMenu = [
        {
            name: "Home",
            path: '/',
            icon: 'ri-home-office-fill'
        },
        {
            name: "Users",
            path: '/admin/users-list',
            icon: 'ri-id-card-fill'
        },
        {
            name: "Doctors",
            path: '/admin/doctors-list',
            icon: 'ri-user-star-fill'
        },
        // {
        //     name: "Profile",
        //     path: '/profile',
        //     icon: 'ri-user-fill'
        // },
    ];

    const doctorMenu = [
        {
            name: "Home",
            path: '/',
            icon: 'ri-home-office-fill'
        },
        {
            name: "Appointments",
            path: '/doctor/appointments',
            icon: 'ri-file-list-3-fill'
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: 'ri-profile-fill'
        },
    ];

    const renderMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1 className='logo'>DS</h1>
                        <h1 className='role'>{role}</h1>
                    </div>

                    <div className='menu'>
                        {renderMenu.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        })}
                        <div className={`d-flex menu-item`} onClick={() =>{
                            localStorage.clear();
                            navigate('/login');
                        }}>
                            <i className='ri-logout-box-fill'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i 
                                className="ri-close-circle-fill header-action-icon" 
                                onClick={() => setCollapsed(false)}></i>
                            ) : ( 
                            <i 
                                className="ri-menu-fill header-action-icon" 
                                onClick={() => setCollapsed(true)}></i>
                            )
                        }

                        <div className='d-flex align-items-center px-4'>
                            <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                                <i className="ri-notification-3-fill header-action-icon mr-2 px-2"></i>
                            </Badge>
                            <Link className='anchor mx-2' to='/profile'>
                                { user?.name }
                            </Link>
                        </div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;