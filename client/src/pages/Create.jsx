import React, { useEffect, useState } from 'react'
import Header from './landingpage/Header'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from 'react-icons/sl'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { rpc, abi, SERVER_URL } from "../utils/constants.js"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {
    // useEffect(() => {
    //     scroll(0, 0)
    // }, [])

    function formatDate(date) {
        const dateStr = date.toString();
        const _date = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return _date.toLocaleDateString('en-US', options);
    }
    // const [toggle, setToggle] = useState('')
    const [vesting, setvesting] = useState(false)
    // const [liquidity, setLiquidity] = useState(false)
    const [whitelistedsale, setWhitelistedsale] = useState(false)
    const [logoUrl, setLogoUrl] = useState("")
    const [tokenAddress, setTokenAddress] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDecimal, setTokenDecimal] = useState()

    const [presaleRate, setPresaleRate] = useState()

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [minContribution, setMinContribution] = useState()
    const [maxContribution, setMaxContribution] = useState()

    const [vestingPeriodDays, setVestingPeriodDays] = useState()
    const [rewardPerVestingPeriod, setRewardPerVestingPeriod] = useState()
    // const [lockingDays, setLockingDays] = useState()
    // const [liquidityRatePerBnb, setLiquidityRatePerBnb] = useState()
    // const [pancakeswapLiquidity, setPancakeswapLiquidity] = useState()
    const [websiteLink, setWebsiteLink] = useState("")
    const [twitterLink, setTwitterLink] = useState("")
    const [telegramLink, setTelegramLink] = useState("")
    const [facebookLink, setFacebookLink] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Open")
    const [accessType, setAccessType] = useState("Public")

    const [hardCap, setHardCap] = useState('')
    const [softCap, setSoftCap] = useState('')

    const isEndTimeDisabled = !startTime; // Disable end time until start time is set

    //submit Data to db
    async function getTokenDetails(address) {
        const provider = new ethers.providers.JsonRpcProvider(rpc)
        const contract = new ethers.Contract(address, abi, provider)
        const decimal = await contract.decimals()
        const name = await contract.name()
        const symbol = await contract.symbol()
        setTokenDecimal(decimal)
        setTokenName(name)
        setTokenSymbol(symbol)
    }

    useEffect(() => {
        if (tokenAddress.length == 42) {
            getTokenDetails(tokenAddress)
        }
        else {
            setTokenDecimal('')
            setTokenName("")
            setTokenSymbol("")
        }

    }, [tokenAddress])


    async function submitData(e) {
        e.preventDefault();
        try {

            const post = {
                Logo_URL: logoUrl,
                Token_Address: tokenAddress,
                Token_Symbol: tokenSymbol,
                Token_Name: tokenName,
                Token_Decimal: tokenDecimal,
                min: minContribution,
                max: maxContribution,
                startTime: startTime,
                endTime: endTime,
                Website_Link: websiteLink,
                Twitter_Link: twitterLink,
                Telegram_Link: telegramLink,
                Facebook_Link: facebookLink,
                Presale_rate: presaleRate,
                Vesting: vesting,
                Vesting_Period_Days: vestingPeriodDays,
                Rewards_Per_Vesting_Period: rewardPerVestingPeriod,
                // Liquidity: liquidity,
                // Locking_Days: lockingDays,
                // Liquidity_Rate_Per_BNB: liquidityRatePerBnb,
                // Pancakeswap_Liquidity: pancakeswapLiquidity,
                Whitelisted_sale: whitelistedsale,
                Description: description,
                Status: status,
                Access_type: accessType,
                Softcap: softCap,
                Hardcap: hardCap
            }

            const res = await axios.post(
                `${SERVER_URL}/api/create_presale`,
                post
            );

            if (res.status == 200) {
                console.log(res.data);
                toast.success("Submitted for approval",
                    {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                );
                // alert()
                // window.location.reload()
            }
        } catch (e) {
            toast.error(e.response.data,
                {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                }
            );
            // alert(e.response.data)
            // alert(e.Error);
        }
    }

    //handleCap :
    const handleCap = async () => {

    }

    //handle date time
    async function handleDateTime(t, date) {
        // Convert the input date string to a Date object
        const selectedDate = new Date(date);

        // Check if the selected date and time are in the past
        if (selectedDate < new Date()) {
            toast.error("Selected date and time must be in the future",
                {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                }
            );
            // alert("Selected date and time must be in the future");
            return;
        }

        // If the selected date and time are valid, update the start or end time accordingly
        if (t === "st") {
            // Check if the selected time is before the current time
            if (selectedDate < new Date()) {
                toast.error("Selected start time must be in the future",
                    {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                );
                // alert("Selected start time must be in the future");
                return;
            }

            // Check if the selected time is after the end time
            if (endTime && selectedDate >= endTime) {
                toast.error("Selected start time must be before end time",
                    {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                );
                // alert("Selected start time must be before end time");
                return;
            }

            // console.log("Selected start time", selectedDate);
            setStartTime(selectedDate);
        } else {
            // Check if the selected time is before the start time
            if (selectedDate <= startTime) {
                toast.error("Selected end time must be after start time",
                    {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                );
                // alert("Selected end time must be after start time");
                return;
            }

            // console.log("Selected end time", selectedDate);
            setEndTime(selectedDate);
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="logo_overlay">
                <ToastContainer />

                <Header />
                <div className='whole_sec pb-5'>
                    <div className='inner_bg mt-4'>
                        <div className='container container_custom'>
                            <div className='mt-5 tab_div'>
                                <div className="row">
                                    <div className='img_center_lg col-lg-12'>
                                        <div className="image png">
                                            <div className='tab-content mt-5'>
                                                <p className='yellow_txt font_25'>Create Presale</p>
                                                <div className="row">
                                                    <div className='col-12 col-md-4 col-lg-3 mb-4'>
                                                        <div className='card card_style_1 single_sale_card card_img_craete mt-5'>
                                                            <div className='card-body'>
                                                                <div className="img_card_outer">
                                                                    <img src={`${logoUrl == "" ? "/assets/images/create.png" : logoUrl}`} className='img-fluid' alt="" />
                                                                </div>
                                                            </div>
                                                            <div className='card-footer'>
                                                                <p className='mb-0'>{tokenName == "" ? "Token Name" : tokenName}</p>
                                                                <p className='mb-0 font_14 text-right'>{tokenSymbol == "" ? "Token Symbol" : tokenSymbol}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-lg-9 col-md-8 mb-4'>
                                                        <Form onSubmit={submitData}>

                                                            <div className='row mt-5'>
                                                                <div className='col-12 col-md-12 mb-3'>
                                                                    <p className='yellow_txt font_20 mb-2'>Logo Url</p>
                                                                    <p className='input_desc_sm'>Only Cloud Url is Accepted *.</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" required value={logoUrl} onChange={e => setLogoUrl(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p className='yellow_txt font_20 mb-2'>Token Information</p>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Token Address</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" required value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Token Symbol</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input required type="text" disabled value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Token Name</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" required disabled value={tokenName} onChange={e => setTokenName(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Token Decimal</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" disabled placeholder="0" required value={tokenDecimal} onChange={e => setTokenDecimal(e.target.value)} className='form-control' />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p className='yellow_txt font_20 mb-2'>{`Enter Presale cap. Softcap must be >= 50% of Hardcap`}
                                                                    </p>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Soft Cap</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" required value={softCap} onChange={e => setSoftCap(e.target.value)} className='form-control' placeholder='0' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Hard Cap</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" required value={hardCap} onChange={e => setHardCap(e.target.value)} className='form-control' placeholder='0' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p className='yellow_txt font_20 mb-2'>Enter Your Presale Price
                                                                        <span className='font_14 yelow_desc_blk'>(If I pay 1 BNB, how many tokens do I get?)</span>
                                                                    </p>
                                                                </div>
                                                                <div className='col-12 col-md-12 mb-3'>
                                                                    <p className='input_desc_sm'>Presale Rate</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" placeholder="0" required value={presaleRate} onChange={e => setPresaleRate(e.target.value)} className='form-control' />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p className='yellow_txt font_20 mb-2'>Enter minimum and maximum amounts each wallet can contribute
                                                                        <span className='font_14 yelow_desc_blk'>(min, max)</span>
                                                                    </p>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Min Contribution Limit</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" placeholder="0" required value={minContribution} onChange={e => setMinContribution(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Max Contribution Limit</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="number" placeholder="0" required value={maxContribution} onChange={e => setMaxContribution(e.target.value)} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p className='yellow_txt font_20 mb-2'>Please set the start and end time for the following parameters</p>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Start Date & Time</p>
                                                                    <div className='inputs input-groups date_inoput_grps'>
                                                                        <div className='datepicker_input input-group'>
                                                                            <DatePicker
                                                                                required
                                                                                
                                                                                onChange={date => handleDateTime("st", date)}
                                                                                selected={startTime}
                                                                                showTimeSelect
                                                                                dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                                                                                // Set the value of the input field to the selected date
                                                                                defaultTime={new Date()}
                                                                                value={startTime ? startTime.toLocaleString() : ""}
                                                                            />
                                                                        </div>
                                                                        <div className='cur_pointer input-group-append'>
                                                                            <div className='get-started-btn-fill border-r'>
                                                                                <SlCalender />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>End Date & Time</p>
                                                                    <div className='inputs input-groups date_inoput_grps'>
                                                                        <div className={`datepicker_input input-group ${isEndTimeDisabled && 'input-groupsdis'}`}>
                                                                            <DatePicker
                                                                                required
                                                                                onChange={date => handleDateTime("et", date)}
                                                                                selected={endTime}
                                                                                showTimeSelect
                                                                                dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                                                                                // Set the value of the input field to the selected date
                                                                                value={endTime ? endTime?.toLocaleString() : ""}
                                                                                disabled={isEndTimeDisabled}
                                                                                defaultTime={new Date()}
                                                                            />
                                                                        </div>
                                                                        <div className={`cur_pointer input-group-append ${isEndTimeDisabled && 'input-disabled'}`}>
                                                                            <div className='get-started-btn-fill border-r'>
                                                                                <SlCalender />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <div className='yellow_txt font_20 mb-4 toggle_label'> Vesting
                                                                        <div className="toggle-btn" id="_1st-toggle-btn">
                                                                            <input type="checkbox" onChange={() => { setvesting(!vesting) }} />
                                                                            <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {vesting &&
                                                                    <>
                                                                        <div className='col-12 col-md-6 mb-3'>
                                                                            <p className='input_desc_sm'>Vesting Period Days</p>
                                                                            <div className='inputs input-groups'>
                                                                                <div className='input-group'>
                                                                                    <input type="number" placeholder="0" required value={vestingPeriodDays} onChange={e => setVestingPeriodDays(e.target.value)} className='form-control' />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-12 col-md-6 mb-3'>
                                                                            <p className='input_desc_sm'>Rewards % per Vesting Period</p>
                                                                            <div className='inputs input-groups'>
                                                                                <div className='input-group'>
                                                                                    <input type="number" placeholder="%" required value={rewardPerVestingPeriod} onChange={e => setRewardPerVestingPeriod(e.target.value)} className='form-control' />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }

                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <p>
                                                                        <span className='font_14 yelow_desc_blk' style={{ paddingLeft: '0px' }}>Please fill out the additional information below to display it on your presale. (Information in this section is optional, but a description and logo link is recommended)</span>
                                                                    </p>
                                                                    <p>
                                                                        <span className='font_14 yelow_desc_blk' style={{ paddingLeft: '0px' }}>Note the information in this section can be updated at any time by the presale creator while the presale is active. Any links left blank will not be displayed on your sale.</span>
                                                                    </p>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Website Link</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" required value={websiteLink} onChange={e => setWebsiteLink(e.target.value)} className='form-control' placeholder='https://example.com' />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Twitter Link</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" value={twitterLink} onChange={e => setTwitterLink(e.target.value)} className='form-control' placeholder='https://twitter.com/' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Telegram Link</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" value={telegramLink} onChange={e => setTelegramLink(e.target.value)} className='form-control' placeholder='https://telegram.com/' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 mb-3'>
                                                                    <p className='input_desc_sm'>Facebook Link</p>
                                                                    <div className='inputs input-groups'>
                                                                        <div className='input-group'>
                                                                            <input type="text" value={facebookLink} onChange={e => setFacebookLink(e.target.value)} className='form-control' placeholder='https://facebook.com/' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-12 mb-3'>
                                                                    <p className='input_desc_sm'>Project Description</p>
                                                                    <div className='inputs input-groups' >
                                                                        <div className='input-group' style={{ height: ' 67px' }}>
                                                                            <input type="text" required onChange={e => setDescription(e.target.value)} value={description} className='form-control' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='col-12 col-md-12'>
                                                                    <div className='yellow_txt font_20 mb-4 toggle_label'> WhiteListed Sale
                                                                        <div className="toggle-btn" id="_1st-toggle-btn">
                                                                            <input type="checkbox" value={whitelistedsale} onChange={() => { setWhitelistedsale(!whitelistedsale) }} />
                                                                            <span></span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className='col-12 text-right mt-4'>
                                                                    <button className='gett-started-btn-fill' type="submit" >Create</button>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Create