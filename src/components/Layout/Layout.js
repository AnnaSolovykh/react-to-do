import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import style from "./Layout.module.css"

const Layout = () => {
    const [activeMenu, setActiveMenu] = useState();

    return (
        <main>
            <nav className={style.navbarContainer}>
                <NavLink
                        className={activeMenu === "home" ? `${style.active}` : `${style.link}`}
                        onClick={() => { setActiveMenu("home") }} 
                        id="home" to="/">Home
                </NavLink>
                <NavLink 
                        className={activeMenu === "studies" ? `${style.active}` : `${style.link}`}
                        onClick={() => { setActiveMenu("studies") }} 
                        id="studies" 
                        to="/studygoals">Study Goals
                </NavLink> 
                <NavLink
                    className={activeMenu === "daily" ? `${style.active}` : `${style.link}`}
                    onClick={() => { setActiveMenu("daily") }}
                    id="daily"
                    to="/dailygoals">Daily Goals
                </NavLink>
            </nav>
        <Outlet />
        <footer>
            <div className={style.phantom}></div>
            <h3 className={style.signature}>Built by Anna Solovykh for CTD</h3>
        </footer>
        </main>
    );
};

export default Layout;