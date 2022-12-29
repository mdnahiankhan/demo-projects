import React, { useContext, } from 'react';
import { Link } from 'react-router-dom';
import TaskSvg from '../assets/TaskSvg.png'
import { AuthContext } from '../contexts/Authprovider';
const Navbar = () => {

    const { user, LogOut, handledark } = useContext(AuthContext);
    const handleLogOut = () => {
        LogOut()
            .then(() => { })
            .catch(err => console.error(err))
    }


    const menuitems = <React.Fragment>
        <li className="flex">
            <Link to='/' rel="noopener noreferrer" href="" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ">AddTask</Link>
        </li>
        <li className="flex">
            <Link to='/mytask' rel="noopener noreferrer" href="" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">MyTask</Link>
        </li>
        <li className="flex">
            <Link to='/completedTask' rel="noopener noreferrer" href="" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Completed Task</Link>
        </li>
        <label onClick={handledark} htmlFor="Toggle1" className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
            <span>Left</span>
            <span className="relative">
                <input id="Toggle1" type="checkbox" className="hidden peer" />
                <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
            </span>
            <span>Right</span>
        </label>
    </React.Fragment>
    return (
        <div>
            <header className="p-4 dark:bg-white dark:text-gray-100">
                <div className="container flex justify-between h-16 mx-auto">
                    <Link to='/' rel="noopener noreferrer" href="" aria-label="Back to homepage" className="flex items-center p-2">
                        <img alt="" className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-700" src={TaskSvg} />
                    </Link>
                    <ul className="items-stretch hidden space-x-3 lg:flex text-black">
                        {menuitems}
                    </ul>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {user?.uid ? <button onClick={handleLogOut} className="self-center px-8 py-3 rounded text-black">Sign Out</button> : <Link to='/login' className="self-center px-8 py-3 rounded text-black">Sign in</Link>}
                    </div>
                    <button className="p-4  lg:hidden">
                        <ul className="items-stretch aria-expanded: hidden space-x-3 lg:flex text-black">
                            {menuitems}
                        </ul>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-900">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Navbar;