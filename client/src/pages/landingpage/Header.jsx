import React, { useState, useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaFire, FaRegNewspaper, FaWallet, FaPlusCircle, FaRegSun, FaRegMoon } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Modal from 'react-bootstrap/Modal';
import '../../global.css'
import { Store } from '../../context/AistationProvider';
// import WalletConnectProvider from "@walletconnect/web3-provider"
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react'


const Header = () => {
    const [theme, setTheme] = useState('')
    const [toggleHeader, setToggleHeader] = useState(false)
    const [scrool, setScrool] = useState(false)
    const [show, setShow] = useState(false);
    const { connectWallet, currentAccount } = useContext(Store)

    const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

    const handleWallet = () => {
        connectWallet()
        setShow(false)
    }

    const handleWalletConnect = () => {
        setShow(false)
        open()
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        setTheme(theme)
    }, [theme])

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const changeTheme = (event) => {
        if (event === 'light') {
            localStorage.setItem('theme', 'light')
            document.body.className = localStorage.getItem('theme')
            setTheme(localStorage.getItem('theme'))
        } else {
            localStorage.setItem('theme', 'dark')
            document.body.className = localStorage.getItem('theme')
            setTheme(localStorage.getItem('theme'))
        }
    }

    const changeHeaderColor = () => {
        const pageScrool = document.documentElement.scrollTop;
        if (pageScrool > 50) {
            setScrool(true)
        } else {
            setScrool(false)
        }
    }
    // const walletConnect = new WalletConnectProvider({
    //     infuraId: '69aa7894948a506b6bc853a212abfcf4',
    //     supportedWallets: ['trust'],
    // });

    window.addEventListener('scroll', changeHeaderColor)

    return (
        <>
            <div id="header" className={`py-2 py-lg-2 ${scrool ? 'headerbgcolor' : ''}`}>
                <div className="container">
                    <header>
                        <NavLink to={'/'}>
                            <img src="/assets/logo/logo.png" alt="" className="logo" width={'70px'} height={'60px'} />
                            <img src="/assets/logo/logo-text.png" alt="" className="logo-text" width={'140px'} height={''} />
                        </NavLink>
                        <span onClick={() => { setToggleHeader(!toggleHeader) }} className='menu-toggle'><GiHamburgerMenu /></span>
                        <div className={`nav-menu ${toggleHeader ? '' : 'display-none'} `}>
                            <div className="d-flex align-items-center justify-content-between py-3 header_flex">
                                <div className="d-flex align-items-center nav_parnt">
                                    <div className="nav_parnt_1">
                                        <NavLink to={'/'} className="get-started-btn get-started-btn-fill link">
                                            <FaFire />
                                            Projects
                                        </NavLink>
                                        <NavLink
                                            to={'https://sri-guru-saran.gitbook.io/refitplus-ido-platform/'}
                                            className="get-started-btn ml-3 link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaRegNewspaper />
                                            User Manual
                                        </NavLink>
                                    </div>
                                    <div className="nav_parnt_2">
                                        <button className={currentAccount ? "get-started-btn2 a" : "get-started-btn a"} disabled={currentAccount} onClick={() => setShow(true)}>
                                            <FaWallet />
                                            {currentAccount ? currentAccount?.slice(0, 5) + "..." + currentAccount?.slice(-4) : "Connect"}
                                        </button>

                                        <NavLink to={'/create'} className="get-started-btn ml-3 link">
                                            <FaPlusCircle />
                                            Create
                                        </NavLink>
                                        <div className="theme-icon pl-3">
                                            <div className="theme-btn">
                                                <span className={`${theme === 'light' ? 'Active' : ''}`} onClick={() => changeTheme("light")}><FaRegSun /></span>
                                                <span className="px-2 divider">/</span>
                                                <span className={`${theme === 'dark' ? 'Active' : ''}`} onClick={() => changeTheme("dark")}><FaRegMoon /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div >
            </div >
            {/* <Connect show={show} handleClose={handleClose}/> */}
            < Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                backdrop="static"
                keyboard={false}
            >
                <div className='pb-0 modal-header'>
                    <div>
                        <h3 className='sec-head'>Connect to Wallet</h3>
                    </div>
                    <button className='close'>
                        <span onClick={() => setShow(false)}>×</span>
                    </button>
                </div>
                <div className='select-wallet text-center pt-0 modal-body'>
                    <div className='wallet-lists'>
                        <ul>
                            <li onClick={handleWallet}>
                                <div className='img'>
                                    <img src="/assets/images/connect_one.png" alt="" />
                                </div>
                                <div className='wal-option'>
                                    <h3 className='side-head-li mb-0'> Metamask</h3>
                                </div>
                            </li>
                            <li onClick={handleWalletConnect} >
                                <div className='img'>
                                    <img src="/assets/images/connect_two.png" alt="" />
                                </div>
                                <div className='wal-option' >
                                    <h3 className='side-head-li mb-0'>Wallet Connect</h3>
                                </div>
                            </li>
                            <li onClick={handleWallet}>
                                <div className='img'>
                                    <img src="/assets/images/connect_three.png" alt="" />
                                </div>
                                <div className='wal-option'>
                                    <h3 className='side-head-li mb-0'>Trust Wallet</h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default Header