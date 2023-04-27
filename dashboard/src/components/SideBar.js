import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, memo } from 'react';
import Logo from '../assets/images/logo.png'
function SideBar(props) {
    const location = useLocation()
    const [url, setUrl] = useState(location.pathname)
    useEffect(() => {
        setUrl(location.pathname);
    })

    function closeNav() {
        var x = window.matchMedia("(max-width: 768px)")
        if (x.matches) {
            document.getElementById("sidebar").style.width = "0";
        }
        // document.getElementById("sidebar").style.position = "sticky";
    }
    return <>
        <div className="sidebar" id="sidebar">
            <div className="close-nav-section">
                <div className="logo">
                    {/* <img src={Logo} /> */}
                    <h4 className="primary-text">AI STATION</h4>
                </div>
                <i class="fa-solid fa-times close-sidebar-icon" onClick={closeNav}></i>
            </div>

            <div className="sidebar-scroll">
                <ul className="sidebar-ul">
                    <li className={url === "/" ? "active" : ''}>
                        <Link to={"/"} onClick={closeNav}><i className="fa-solid fa-users"></i><span>Dashboard</span></Link>
                    </li>
                    {/* <li className={url === "/users" ? "active" : ''}>
                        <Link to={"/users"} onClick={closeNav}><i className="fa-solid fa-users"></i><span>Users</span></Link>
                    </li>
                    <li className={url === "/blogs" ? "active" : ''}>
                        <Link to={"/blogs"} onClick={closeNav}><i className="fa-solid fa-users"></i><span>Blogs</span></Link>
                    </li> */}
                    {/* <li className={url === "/presales" ? "active" : ''}>
                        <Link to={"/presales"} onClick={closeNav}><i className="fa-solid fa-users"></i><span>Presales</span></Link>
                    </li> */}
                </ul>
            </div>
        </div>
    </>
}
export default memo(SideBar);