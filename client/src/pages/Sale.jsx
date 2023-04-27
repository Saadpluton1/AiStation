import React, { useContext, useEffect, useState } from 'react'
import Header from './landingpage/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { HiExternalLink } from 'react-icons/hi'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import { SERVER_URL } from '../utils/constants';
import axios from 'axios';
import { Store } from '../context/AistationProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sale = () => {
    const { state } = useLocation();
    const [enteredBnb, setEnteredBnb] = useState('')
    const [token, setToken] = useState('')
    const [info, setInfo] = useState()
    const [allocationData, setAllocationData] = useState()
    const infoId = state.data._id

    const [show, setShow] = useState(false);
    const { currentAccount, connectWallet } = useContext(Store)

    async function getSaleById() {

        // e.preventDefault();
        try {
            const res = await axios.get(
                `${SERVER_URL}/api/getSaleById`,
                {
                    params: {
                        _id: infoId
                    }
                }
            );
            if (res.status == 200) {
                let _data = await res.data
                setInfo(_data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleMax = () => {
        handleBNB(info?.Contribution?.max)
    }


    function formatDate(isoString) {

        const date = new Date(isoString);
        const localDateString = date.toLocaleString();
        // console.log(localDateString)
        return localDateString;
    }

    const handleBNB = async (val) => {
        setEnteredBnb(val)
        // console.log(val)
        if (val >= info?.Contribution?.min && val <= info?.Contribution?.max) {
            const temp = val * info?.Presale_rate
            // console.log(temp)
            setToken(temp)
        } else {
            setToken("")
        }
    }

    const addAlloc = async (_currentAccount, token) => {
        console.log(_currentAccount, "ccc")
        try {
            const post = {
                Project_id: info?._id,
                Address: _currentAccount,
                Allocation: enteredBnb,
                Claimable: token,
                Unlock_time: formatDate(info?.Time?.End)
            }

            console.log(post, "oo")
            const res = await axios.post(`${SERVER_URL}/api/addAllocation`, post)
            // await res.wait()

        } catch (err) {
            console.log(err)
        }
    }

    const getAllocationData = async (_currentAccount) => {
        // console.log(_currentAccount, "heheheh")
        try {

            const res = await axios.get(
                `${SERVER_URL}/api/getAllocationData`,
                {
                    params: {
                        Address: _currentAccount,
                        Project_id: infoId
                    }
                }
            );
            if (res.status == 200) {
                let _data = await res?.data.data
                setAllocationData(_data)
                console.log("inn", _data)
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleBuy = async () => {

        if (token && enteredBnb <= info?.Contribution.max) {
            if (currentAccount !== null) {
                try {
                    // console.log(enteredBnb, "heheh")
                    const post = { _id: info?._id, Total_Funds_Swapped: enteredBnb };
                    const res = await axios.post(
                        `${SERVER_URL}/api/swapFunds`,
                        post
                    );
                    await addAlloc(currentAccount, token)

                    if (res.status == 200) {
                        setShow(false)
                        setToken('')
                        setEnteredBnb('')
                        toast.success('Success',
                            {
                                position: 'top-center',
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                            });
                        // window.location.reload()
                        // alert("Done")
                    }
                } catch (e) {
                    // toast.error(e)
                    console.log(e)
                }
            } else {
                try {
                    const res2 = await connectWallet()

                    // console.log(res2, "erer")
                    if (res2?.code !== 4001) {

                        const post = { _id: info?._id, Total_Funds_Swapped: enteredBnb };
                        const res = await axios.post(
                            `${SERVER_URL}/api/swapFunds`,
                            post
                        );
                        // let temp = currentAccount && currentAccount
                        // console.log(res2, "temp")
                        await addAlloc(res2, token)
                        if (res.status == 200) {
                            setShow(false)
                            setToken('')
                            setEnteredBnb('')
                            toast.success('Success',
                                {
                                    position: 'top-center',
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                });
                            // window.location.reload()
                            // alert("Done")
                        }
                    }
                    else {
                        toast.error('Connect your wallet',
                            {
                                position: 'top-center',
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                            }
                        );
                    }
                } catch (e) {
                    toast.error('Failed',
                        {
                            position: 'top-center',
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                        }
                    );
                    console.log(e)
                }
            }

        }
        else {
            toast.error("invalid amount", {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            })
        }

    }

    function isSaleEnded() {
        const endDate = new Date(formatDate(info?.Time.End));
        const currentDate = new Date();
        // console.log(endDate < currentDate)
        if (endDate < currentDate) {
            return true;

        } else {
            return false
        }
    }

    console.log("fgdddddddddddddddddddddddd", allocationData)
    useEffect(() => {
        if (currentAccount) {
            getAllocationData(currentAccount)
        }
    }, [currentAccount])

    useEffect(() => {
        getSaleById();
        // getAllocationData()
        window.scrollTo(0, 0);
    }, [])


    function handleHide() {
        handleBNB()
        setShow(false)
    }
    return (
        <>
            <div className="logo_overlay">
                <ToastContainer />
                <Header />
                <div className='whole_sec pb-5'>
                    <div className='inner_bg mt-4'>
                        <div className='container container_custom'>
                            <div className="row">
                                <div className='col-12 col-lg-6 mb-4'>
                                    <div>
                                        <img src={`${info?.Logo_URL}`} className='round_img' alt="" />
                                    </div>
                                    <p className="text-white token font_35 mb-0">{info?.Token_info?.Token_Symbol}</p>
                                    <p className="mt-2 mb-0">
                                        <span className={`  mr-3 badge badge-green-big badge-green ${info?.Status === "Open" ? '' : " dangerbtn"}`}>
                                            <span className="green_dot">
                                            </span>
                                            <span className="green_txt">{info?.Status}</span>
                                        </span>
                                        <span className="badge badge-yellow-fill badge-yellow-fill-big mt-2">
                                            <span className="blk_txt" >{info?.Token_info?.Token_Name}</span>
                                        </span>
                                    </p>
                                    <p className='text-white mt-3 line_he_big word_brk_addrs'>
                                        {info?.Description}
                                    </p>
                                    <p className="mt-2 mb-0">

                                        <span className="badge badge-yellow-fill badge-yellow-fill-big mr-3" onClick={() => window.open(`${info?.Links?.Website_Link}`, '_blank')}>
                                            <span className="blk_txt" > Website  </span>
                                        </span>
                                        <span className="badge badge-yellow-fill badge-yellow-fill-big" onClick={() => setShow(true)}>
                                            <span className="blk_txt">Join</span>
                                        </span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="right_ban">
                                        <div className="detail_card_outer">
                                            <div className="detail_card">
                                                <div className={`card_style_1 single_sale_card ${currentAccount ?? "blur"}`}>
                                                    <div className="card-body"><div className="row">
                                                        <div className="col-12 col-lg-6 mb-3">
                                                            <p className="text-uppercase yellow_txt font-weight-500 mb-2">Your Balance</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_20">0 {info?.Token_info?.Token_Symbol}</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_20">0 BNB</p>
                                                        </div>
                                                        <div className="col-12 col-lg-6 mb-3">
                                                            <p className="text-uppercase yellow_txt font-weight-500 mb-2">Your WhiteListed Amount</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_20">0 BNB</p>
                                                            <p className="mt-2 mb-0"><span className="badge badge-green-fill">
                                                                <span className="green_txt pl-0">Public</span></span></p></div>
                                                        <div className="col-12 col-lg-6 mb-3">
                                                            <p className="text-uppercase yellow_txt font-weight-500 mb-2">Swapped</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_20">0 BNB</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_16">0 {info?.Token_info?.Token_Symbol}</p>
                                                        </div><div className="col-12 col-lg-6 mb-3">
                                                            <p className="text-uppercase yellow_txt font-weight-500 mb-2">Total {info?.Token_info?.Token_Symbol} Sold</p>
                                                            <p className="text-white text-uppercase font-weight-800 font_20">0 {info?.Token_info?.Token_Symbol}</p>
                                                        </div>
                                                    </div>
                                                        <p className="text-white d-flex justify-content-between">
                                                            <span>Swap Progress</span>
                                                        </p>

                                                        <div className='progress-bar'>
                                                            <ProgressBar now={(info?.Total_Funds_Swapped / info?.Hardcap) * 100} />
                                                        </div>

                                                        <p className="white_txt_sm d-flex justify-content-between mt-3">
                                                            <span> {((info?.Total_Funds_Swapped / info?.Hardcap) * 100).toFixed(2)}%</span>
                                                            <span>Progress ({info?.Total_Funds_Swapped?.toLocaleString()}/{info?.Hardcap?.toLocaleString()}) BNB</span>
                                                        </p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card card_style_1 single_sale_card blur">
                                        <div className="card-body"><div className="row">
                                            <div className="col-12 col-lg-6 mb-3">
                                                <p className="text-uppercase yellow_txt font-weight-500 mb-2">Your Balance</p>
                                                <p className="text-white text-uppercase font-weight-800 font_20">NaN refitplus</p>
                                                <p className="text-white text-uppercase font-weight-800 font_20">NaN BNB</p>
                                            </div>
                                            <div className="col-12 col-lg-6 mb-3">
                                                <p className="text-uppercase yellow_txt font-weight-500 mb-2">Your WhiteListed Amount</p>
                                                <p className="text-white text-uppercase font-weight-800 font_20">NaN BNB</p>
                                                <p className="mt-2 mb-0"><span className="badge badge-green-fill">
                                                    <span className="green_txt pl-0">Public</span></span></p></div>
                                            <div className="col-12 col-lg-6 mb-3">
                                                <p className="text-uppercase yellow_txt font-weight-500 mb-2">Swapped</p>
                                                <p className="text-white text-uppercase font-weight-800 font_20">NaN BNB</p>
                                                <p className="text-white text-uppercase font-weight-800 font_16">NaN refitplus</p>
                                            </div><div className="col-12 col-lg-6 mb-3">
                                                <p className="text-uppercase yellow_txt font-weight-500 mb-2">Total refitplus Sold</p>
                                                <p className="text-white text-uppercase font-weight-800 font_20">10.00 refitplus</p>
                                            </div>
                                        </div>
                                            <p className="text-white d-flex justify-content-between">
                                                <span>Swap Progress</span>
                                            </p>
                                            
                                                <div className='progress-bar'>
                                                    <ProgressBar now={60} />
                                                </div>
                                            
                                            <p className="white_txt_sm d-flex justify-content-between mt-3">
                                                <span> 0.02 %</span>
                                                <span>0.10/500.00 BNB</span>
                                            </p></div>
                                    </div> */}

                                </div>
                            </div>
                            <div className='mt-5 tab_div sale_tab'>
                                <Tabs
                                    defaultActiveKey="Project Details"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="Project Details" title="Project Details">
                                        <div className="row">
                                            <div className="col-12 col-lg-6 mb-4">
                                                <div className="tble inner_pool_details">
                                                    <h2>Pool Information</h2>
                                                    <div className="tble-outer">
                                                        <div className="table">
                                                            <table cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left"><span>Opens</span></td>
                                                                        <td align="right">{formatDate(info?.Time?.Start)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Closes</span></td>
                                                                        <td align="right">{formatDate(info?.Time?.End)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Swap Rate</span></td>
                                                                        <td align="right">1 BNB = {info?.Presale_rate} {info?.Token_info?.Token_Symbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Hard Cap</span></td>
                                                                        <td align="right">{info?.Hardcap?.toLocaleString()} BNB</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Soft Cap</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Softcap?.toLocaleString()} BNB</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Total Users Participated</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Total_Users_Participated}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Total Funds Swapped</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Total_Funds_Swapped.toLocaleString()} BNB</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Access Type</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Access_type}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 col-lg-6 mb-4'>
                                                <div className="tble inner_pool_details">
                                                    <h2>Token Information</h2>
                                                    <div className="tble-outer">
                                                        <div className="table">
                                                            <table cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left"><span>Name</span></td>
                                                                        <td align="right">{info?.Token_info?.Token_Name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Token Symbol</span></td>
                                                                        <td align="right">{info?.Token_info?.Token_Symbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Token Decimals</span></td>
                                                                        <td align="right">{info?.Token_info?.Token_Decimal}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left"><span>Explorer</span></td>
                                                                        <td align="right"><a target="_blank" href={`https://bscscan.com/token/${info?.Token_info?.Token_Address}`} >{info?.Token_info?.Token_Address} </a></td>
                                                                    </tr>
                                                                    {/* <tr>
                                                                        <td className="border-left-radius" align="left"><span>Pancake Listing</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Liquidity ? "Enabled" : "Disabled"}</td>
                                                                    </tr> */}
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Vested Claim</span></td>
                                                                        <td className="border-right-radius" align="right">{info?.Vesting ? "Enabled" : "Disabled"}</td>
                                                                    </tr>
                                                                    {/* <tr>
                                                                        <td className="border-left-radius" align="left"><span>Total Funds Swapped</span></td>
                                                                        <td className="border-right-radius" align="right">0.10 BNB</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border-left-radius" align="left"><span>Access Type</span></td>
                                                                        <td className="border-right-radius" align="right">Public</td>
                                                                    </tr> */}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="table-responsive">
                                                    <table className="table table-bordered table_style_1">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" colSpan="2">Pool Information </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Opens</td>
                                                                <td>Thursday, September 1, 2022</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Closes</td>
                                                                <td>Saturday, September 10, 2022</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Swap Rate</td>
                                                                <td>1 BNB = 100 refitplus</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Hard Cap</td>
                                                                <td>500.00 BNB</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Soft Cap</td>
                                                                <td>300.00 BNB</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Users Participated</td>
                                                                <td>1</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Funds Swapped</td>
                                                                <td>0.10 BNB</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Access Type</td>
                                                                <td>Public</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> */}
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Your Allocation" title="Your Allocation">

                                        <div className='tab_img mt-5'>
                                            <div className="row">
                                                <div className='col-12 col-lg-12 mb-4'>
                                                    <div className='text-right mb-4'>
                                                        <button className='get-started-btn active'>Add Token to Metamask</button>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table_style_1">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">No.</th>
                                                                    <th scope="col" >Allocation</th>
                                                                    <th scope="col" >Unlock On </th>
                                                                    <th scope="col">Claimable</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {allocationData ? allocationData?.map((data, i) => {

                                                                    return (
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{data.Allocation} BNB</td>
                                                                            <td>{data.Unlock_time}</td>
                                                                            <td style={{ textAlign: 'left' }}>{data.Claimable} {info?.Token_info?.Token_Symbol}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                ) : ""}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Tab>

                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
            <Modal
                show={show}
                onHide={handleHide}
                centered
                size="lg"
                className='sale-modal'
                backdrop="static"
                keyboard={false}>
                <div className='pb-0 modal-header'>
                    <div>
                        <h3 className='sec-head'>Buy {info?.Token_info?.Token_Symbol} Token</h3>
                    </div>
                    <button className='close'>
                        <span onClick={handleHide}>×</span>
                    </button>
                </div>
                <div className="modal-body">

                    <div className="home-progress up-allocation mt-3" style={{ border: 'none', padding: '0px', backgroundColor: 'transparent' }}>
                        <div className='progress-bar'>
                            <ProgressBar now={(info?.Total_Funds_Swapped / info?.Hardcap) * 100} />
                        </div>
                        <p className='white_txt_sm d-flex justify-content-between mt-3'>
                            <span className='text_black_perc'>Progress ({info?.Total_Funds_Swapped?.toLocaleString()}/{info?.Hardcap?.toLocaleString()}) BNB</span>
                            <span className='text_blue_perc'>{((info?.Total_Funds_Swapped / info?.Hardcap) * 100).toFixed(2)}%</span>
                        </p>
                    </div>
                    <div className='card card_toek'>
                        <div className="card-body">
                            <div className="row">
                                <div className='col-12 col-md-6 col-lg-4 mb-3 mb-lg-0'>
                                    <div>
                                        <div>
                                            <div className='coin_desc_li_one'>Your Claimable {info?.Token_info?.Token_Symbol}</div>
                                        </div>
                                        <div>
                                            <div className='coin_name_title'>{token}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-2 mb-3 mb-lg-0'>
                                    <div>
                                        <div>
                                            <div className='coin_desc_li_one'>Max Limit</div>
                                        </div>
                                        <div>
                                            <div className='coin_name_title'>{info?.Contribution?.max} BNB</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-2 mb-3 mb-lg-0'>
                                    <div>
                                        <div>
                                            <div className='coin_desc_li_one'>Min Limit</div>
                                        </div>
                                        <div>
                                            <div className='coin_name_title'>{info?.Contribution?.min} BNB</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 mb-3 mb-lg-0'>
                                    <div>
                                        <div>
                                            <div className='coin_desc_li_one'>{info?.Token_info?.Token_Symbol} Per BNB</div>
                                        </div>
                                        <div>
                                            <div className='coin_name_title'>{info?.Presale_rate}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className='col-12 col-md-6 mb-3 mb-md-0'>
                            <div className='input-groups'>
                                <div className='input-group'>
                                    <input type="number" placeholder='Enter Amount' value={enteredBnb} onChange={e => handleBNB(e.target.value)} style={{ width: '84%' }} />
                                    <span className='doll txt-purple input-group-text' style={{ width: '16%' }}>BNB</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 mb-3 mb-md-0'>
                            <div className='input-groups'>
                                <div className='input-group'>
                                    <input type="number" placeholder='You will get' value={token} style={{ width: '84%' }} disabled />
                                    <span className='doll txt-purple input-group-text' style={{ width: '16%' }}>{info?.Token_info?.Token_Symbol}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-12 col-md-12 mb-3 mb-md-0 btn_row'>
                            <button className='get-started-btn mr-2 mb-2' onClick={handleMax}>Max</button>
                            {/* <button className='get-started-btn-fill text-capitalize mr-2 mb-2' > Sale InActive </button> */}
                            {/* {isSaleEnded() ? <button className='get-started-btn-fill text-capitalize mr-2 mb-2 disabled' disabled > Sale InActive </button> : <button className='get-started-btn-fill text-capitalize mr-2 mb-2' > Buy </button>}
                            {isSaleEnded() ? <button className={`get-started-btn mr-2 mb-2`} >Claim</button> : <button className={`get-started-btn mr-2 mb-2 disabled`} disabled >Claim</button>} */}
                            <button className='get-started-btn-fill text-capitalize mr-2 mb-2' onClick={handleBuy} > Buy </button>
                            <button className={`get-started-btn mr-2 mb-2 disabled`} disabled >Claim</button>
                            <button className='get-started-btn-fill text-capitalize mr-2 mb-2' onClick={handleHide}> Close </button>
                        </div>
                    </div>
                </div>


            </Modal >
        </>

    )
}

export default Sale