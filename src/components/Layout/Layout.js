import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useLocalStorage from "./useLocalStorage";
import style from "./Layout.module.css";

const Layout = () => {
    const [activeMenu, setActiveMenu] = useState();
    const [burgerNavbar, setBurgerNavbar] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        
    const defaultLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const [theme, setTheme] = useLocalStorage("theme", defaultLight ? "light" : "dark");
    
    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const navbarRef = useRef();

    useEffect(()=> {
        let handler = (e) => {
            if(!navbarRef.current.contains(e.target)) {
                setBurgerNavbar(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        };
    });

    const toggleNavbar = () => {
        setBurgerNavbar(!burgerNavbar);
    };

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    return (
        <main data-theme={theme}>
            <div ref={navbarRef}>
                {(burgerNavbar || screenWidth > 900) &&  
                    (<nav 
                        className={style.navbarContainer}>
                        <button 
                            className={style.themeBtn} 
                            onClick={ () => {toggleNavbar(); changeTheme()}}
                        >
                            {theme === "light" ? 
                                <i className="fas fa-moon fa-2x" style={{color: "#223e42"}}></i> :
                                <i className="fas fa-sun fa-2x" style={{color: "#223e42"}}></i>
                            } 
                        </button>
                        <div className={style.navlinksContainer}>
                            <NavLink
                                className={activeMenu === "home" ? `${style.active}` : `${style.link}`}
                                onClick={ () => {toggleNavbar(); setActiveMenu("home")}}
                                id="home" to="/">
                                    Home
                            </NavLink>
                            <NavLink 
                                className={activeMenu === "studies" ? `${style.active}` : `${style.link}`}
                                onClick={ () => {toggleNavbar(); setActiveMenu("studies")}}
                                id="studies" 
                                to="/studygoals">
                                    Study Goals
                            </NavLink> 
                            <NavLink
                                onClick={ () => {toggleNavbar(); setActiveMenu("daily")}}
                                className={activeMenu === "daily" ? `${style.active}` : `${style.link}`}
                                id="daily"
                                to="/dailygoals">
                                    Daily Goals
                            </NavLink>
                        </div>
                    </nav>
                )} 
                <button onClick={toggleNavbar} 
                    className={style.toggleBtn}>
                        {burgerNavbar ? (
                            <i className="fas fa-times fa-2x"></i>
                            ):(
                            <i className="fas fa-bars fa-2x"></i>
                        )}
                </button>  
            </div>
            <Outlet/>
                {(burgerNavbar || screenWidth > 900) && ( 
                    <footer>
                        <div className={style.phantom}></div>
                        <h3 className={style.signature}>Built by Anna Solovykh for CTD</h3>
                    </footer>
                )} 
        </main>
    );
};

export default Layout;