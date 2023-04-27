import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { FaPaperPlane, FaTwitter } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
// import { Store } from '../context/AistationProvider';


const ProjectCard = ({ data, index }) => {

    const navigate = useNavigate()

    const funtion = () => {
        navigate("/sale", { state: { data: data, index: index } })
    }

    return (
        <>
            <div className='col-12 col-lg-6 col-lg-6-custom mb-4' style={{ cursor: "pointer" }} >
                {/* <Link to='/sale' state={{ data: { data } }} > */}
                <div className="pool_card" onClick={funtion}>
                    <div className="pool-link">
                        <div className='card-body'>
                            <div className='grid_img_div'>
                                <div>
                                    <img src={`${data.Logo_URL}`} alt="" />
                                </div>
                                <div>
                                    <p className='yellow_txt font_20 mb-2'>{data.Token_info.Token_Symbol}</p>
                                    <div className='btn-group btn_grp_yel mb-2' onClick={(e) => e.stopPropagation()}>
                                        {/* <a target="_blank" href="#" className='btn btn-secondary'><TbWorld /></a>
                                        <a target="_blank" href="#" className='btn btn-secondary'><FaTwitter /></a> */}
                                        {/* <a target="_blank" href="#" className='btn btn-secondary'><FaPaperPlane /></a> */}
                                        {/* <button component={Link} to={data.Links.Website_Link} className='btn btn-secondary'><TbWorld /></button>
                                            <button component={Link} to={data.Links.Twitter_Link} className='btn btn-secondary'><FaTwitter /></button>
                                            <button component={Link} to={data.Links.Telegram_Link} className='btn btn-secondary'><FaPaperPlane /></button> */}
                                        <ul>
                                            <li> <a className='button' href={`${data.Links.Website_Link.slice(0, 8) == "https://" ? `${data.Links.Website_Link}` : `https://${data.Links.Website_Link}`}`} target='_blank' ><TbWorld /></a></li>
                                            <li> <a className='button' href={`${data.Links.Twitter_Link.slice(0, 8) == "https://" ? `${data.Links.Twitter_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank' ><FaTwitter /></a></li>
                                            <li> <a className='button' href={`${data.Links.Telegram_Link.slice(0, 8) == "https://" ? `${data.Links.Telegram_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank'><FaPaperPlane /></a></li>

                                        </ul>
                                    </div>
                                    <div className='d-sm-flex d-block'>
                                        <p className='mt-2 mb-0'>
                                            {data.Status === "Open" ? <span className='badge badge-green'>
                                                <span className='green_dot' style={{ top: '7px' }}></span>
                                                <span className='green_txt'>{data.Status}</span>
                                            </span> : <span className='badge dangerbtn badge-green'>
                                                <span className='green_dot' style={{ top: '7px' }}></span>
                                                <span className='red_txt'>{data.Status}</span>
                                            </span>}

                                        </p>
                                    </div>
                                    <p>
                                        <span className='badge badge-yellow-fill mt-2'>
                                            <span className='blk_txt'>{data.Token_info.Token_Name}</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <p className='yellow_txt_sm'>{data.Description.split(" ").slice(0, 20).join(" ")}...</p>
                            <div className="row">
                                <div className='col-12 col-lg-4 mb-3'>
                                    <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
                                    <p className='desc_grey_txt pb-0 mb-0'>{data.Hardcap?.toLocaleString()} BNB</p>
                                </div>
                                <div className='col-12 col-lg-4 mb-3'>
                                    <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
                                    <p className='desc_grey_txt pb-0 mb-0'> 1 BNB = {data.Presale_rate} {data.Token_info.Token_Symbol}</p>
                                </div>
                                <div className='col-12 col-lg-4 mb-3'>
                                    <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
                                    <p className='desc_grey_txt pb-0 mb-0'>{data.Access_type}</p>
                                </div>
                                {/* <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
                                        <span>Progress</span>
                                        <span>Participants
                                            <b className='pl-2'>1</b>
                                        </span>
                                    </p> */}
                            </div>
                            {/* <div className='progress-bar'>
                                        <ProgressBar now={60} />
                                    </div>
                                    <p className='white_txt_sm d-flex justify-content-between mt-3'>
                                        <span className='text_black_perc'>0.02 %</span>
                                        <span className='text_blue_perc'>0.100</span>
                                    </p> */}

                        </div>
                    </div>
                    <div className="center-bg"></div>
                    <div className="home-progress up-allocation">
                        <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
                            <span>Progress</span>
                            <span>Participants
                                <b className='pl-2'>{data.Total_Users_Participated}</b>
                            </span>
                        </p>
                        <div className='progress-bar'>
                            <ProgressBar now={(data.Total_Funds_Swapped / data.Hardcap) * 100} />
                        </div>
                        <p className='white_txt_sm d-flex justify-content-between mt-3'>
                            <span className='text_black_perc'>{((data.Total_Funds_Swapped / data.Hardcap) * 100).toFixed(2)}%</span>
                            <span className='text_blue_perc'>{data.Total_Funds_Swapped?.toLocaleString()} BNB</span>
                        </p>
                    </div>
                    <div>
                    </div>
                </div>
                {/* </Link > */}
            </div >
        </>
    )
    // if (loadMore == false) {
    //     if (index < 2) {
    //         // console.log(index)

    //         return (
    //             <>
    //                 <div className='col-12 col-lg-6 col-lg-6-custom mb-4' style={{ cursor: "pointer" }} >
    //                     {/* <Link to='/sale' state={{ data: { data } }} > */}
    //                     <div className="pool_card" onClick={funtion}>
    //                         <div className="pool-link">
    //                             <div className='card-body'>
    //                                 <div className='grid_img_div'>
    //                                     <div>
    //                                         <img src={`${data.Logo_URL}`} alt="" />
    //                                     </div>
    //                                     <div>
    //                                         <p className='yellow_txt font_20 mb-2'>{data.Token_info.Token_Symbol}</p>
    //                                         <div className='btn-group btn_grp_yel mb-2' onClick={(e) => e.stopPropagation()}>
    //                                             {/* <a target="_blank" href="#" className='btn btn-secondary'><TbWorld /></a>
    //                                             <a target="_blank" href="#" className='btn btn-secondary'><FaTwitter /></a> */}
    //                                             {/* <a target="_blank" href="#" className='btn btn-secondary'><FaPaperPlane /></a> */}
    //                                             {/* <button component={Link} to={data.Links.Website_Link} className='btn btn-secondary'><TbWorld /></button>
    //                                                 <button component={Link} to={data.Links.Twitter_Link} className='btn btn-secondary'><FaTwitter /></button>
    //                                                 <button component={Link} to={data.Links.Telegram_Link} className='btn btn-secondary'><FaPaperPlane /></button> */}
    //                                             <ul>
    //                                                 <li> <a className='button' href={`${data.Links.Website_Link.slice(0, 8) == "https://" ? `${data.Links.Website_Link}` : `https://${data.Links.Website_Link}`}`} target='_blank' ><TbWorld /></a></li>
    //                                                 <li> <a className='button' href={`${data.Links.Twitter_Link.slice(0, 8) == "https://" ? `${data.Links.Twitter_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank' ><FaTwitter /></a></li>
    //                                                 <li> <a className='button' href={`${data.Links.Telegram_Link.slice(0, 8) == "https://" ? `${data.Links.Telegram_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank'><FaPaperPlane /></a></li>

    //                                             </ul>
    //                                         </div>
    //                                         <div className='d-sm-flex d-block'>
    //                                             <p className='mt-2 mb-0'>
    //                                                 {data.Status === "Open" ? <span className='badge badge-green'>
    //                                                     <span className='green_dot' style={{ top: '7px' }}></span>
    //                                                     <span className='green_txt'>{data.Status}</span>
    //                                                 </span> : <span className='badge dangerbtn badge-green'>
    //                                                     <span className='green_dot' style={{ top: '7px' }}></span>
    //                                                     <span className='red_txt'>{data.Status}</span>
    //                                                 </span>}

    //                                             </p>
    //                                         </div>
    //                                         <p>
    //                                             <span className='badge badge-yellow-fill mt-2'>
    //                                                 <span className='blk_txt'>{data.Token_info.Token_Name}</span>
    //                                             </span>
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                                 <p className='yellow_txt_sm'>{data.Description.split(" ").slice(0, 20).join(" ")}...</p>
    //                                 <div className="row">
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'>{data.Hardcap?.toLocaleString()} BNB</p>
    //                                     </div>
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'> 1 BNB = {data.Presale_rate} {data.Token_info.Token_Symbol}</p>
    //                                     </div>
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'>{data.Access_type}</p>
    //                                     </div>
    //                                     {/* <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
    //                                             <span>Progress</span>
    //                                             <span>Participants
    //                                                 <b className='pl-2'>1</b>
    //                                             </span>
    //                                         </p> */}
    //                                 </div>
    //                                 {/* <div className='progress-bar'>
    //                                             <ProgressBar now={60} />
    //                                         </div>
    //                                         <p className='white_txt_sm d-flex justify-content-between mt-3'>
    //                                             <span className='text_black_perc'>0.02 %</span>
    //                                             <span className='text_blue_perc'>0.100</span>
    //                                         </p> */}

    //                             </div>
    //                         </div>
    //                         <div className="center-bg"></div>
    //                         <div className="home-progress up-allocation">
    //                             <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
    //                                 <span>Progress</span>
    //                                 <span>Participants
    //                                     <b className='pl-2'>{data.Total_Users_Participated}</b>
    //                                 </span>
    //                             </p>
    //                             <div className='progress-bar'>
    //                                 <ProgressBar now={(data.Total_Funds_Swapped / data.Hardcap) * 100} />
    //                             </div>
    //                             <p className='white_txt_sm d-flex justify-content-between mt-3'>
    //                                 <span className='text_black_perc'>{((data.Total_Funds_Swapped / data.Hardcap) * 100).toFixed(2)}%</span>
    //                                 <span className='text_blue_perc'>{data.Total_Funds_Swapped?.toLocaleString()} BNB</span>
    //                             </p>
    //                         </div>
    //                         <div>
    //                         </div>
    //                     </div>
    //                     {/* </Link > */}
    //                 </div >
    //             </>
    //         )
    //     }
    // }
    // else {
    //     return (
    //         <>
    //             <div className='col-12 col-lg-6 col-lg-6-custom mb-4' style={{ cursor: "pointer" }} >
    //                 <div className="pool_card" onClick={funtion}>
    //                     <div className="pool_card">
    //                         <div className="pool-link">
    //                             <div className='card-body'>
    //                                 <div className='grid_img_div'>
    //                                     <div>
    //                                         <img src={`${data.Logo_URL}`} alt="" />
    //                                     </div>
    //                                     <div>
    //                                         <p className='yellow_txt font_20 mb-2'>{data.Token_info.Token_Symbol}</p>
    //                                         <div className='btn-group btn_grp_yel mb-2' onClick={(e) => e.stopPropagation()}>
    //                                             {/* <a target="_blank" href="#" className='btn btn-secondary'><TbWorld /></a>
    //                                         <a target="_blank" href="#" className='btn btn-secondary'><FaTwitter /></a> */}
    //                                             {/* <a target="_blank" href="#" className='btn btn-secondary'><FaPaperPlane /></a> */}
    //                                             {/* <button component={Link} to={data.Links.Website_Link} className='btn btn-secondary'><TbWorld /></button>
    //                                             <button component={Link} to={data.Links.Twitter_Link} className='btn btn-secondary'><FaTwitter /></button>
    //                                             <button component={Link} to={data.Links.Telegram_Link} className='btn btn-secondary'><FaPaperPlane /></button> */}
    //                                             <ul>
    //                                                 <li> <a className='button' href={`${data.Links.Website_Link.slice(0, 8) == "https://" ? `${data.Links.Website_Link}` : `https://${data.Links.Website_Link}`}`} target='_blank' ><TbWorld /></a></li>
    //                                                 <li> <a className='button' href={`${data.Links.Twitter_Link.slice(0, 8) == "https://" ? `${data.Links.Twitter_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank' ><FaTwitter /></a></li>
    //                                                 <li> <a className='button' href={`${data.Links.Telegram_Link.slice(0, 8) == "https://" ? `${data.Links.Telegram_Link}` : `https://${data.Links.Twitter_Link}`}`} target='_blank'><FaPaperPlane /></a></li>
    //                                             </ul>
    //                                         </div>
    //                                         <div className='d-sm-flex d-block'>
    //                                             <p className='mt-2 mb-0'>
    //                                                 {data.Status === "Open" ? <span className='badge badge-green'>
    //                                                     <span className='green_dot' style={{ top: '7px' }}></span>
    //                                                     <span className='green_txt'>{data.Status}</span>
    //                                                 </span> : <span className='badge dangerbtn badge-green'>
    //                                                     <span className='green_dot' style={{ top: '7px' }}></span>
    //                                                     <span className='red_txt'>{data.Status}</span>
    //                                                 </span>}

    //                                             </p>
    //                                         </div>
    //                                         <p>
    //                                             <span className='badge badge-yellow-fill mt-2'>
    //                                                 <span className='blk_txt'>{data.Token_info.Token_Name}</span>
    //                                             </span>
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                                 <p className='yellow_txt_sm'>{data.Description.split(" ").slice(0, 20).join(" ")}...</p>
    //                                 <div className="row">
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'>{data?.Hardcap?.toLocaleString()} BNB</p>
    //                                     </div>
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'> 1 BNB = {data.Presale_rate} {data.Token_info.Token_Symbol}</p>
    //                                     </div>
    //                                     <div className='col-12 col-lg-4 mb-3'>
    //                                         <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
    //                                         <p className='desc_grey_txt pb-0 mb-0'>{data.Access_type}</p>
    //                                     </div>
    //                                     {/* <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
    //                                         <span>Progress</span>
    //                                         <span>Participants
    //                                             <b className='pl-2'>1</b>
    //                                         </span>
    //                                     </p> */}
    //                                 </div>
    //                                 {/* <div className='progress-bar'>
    //                                         <ProgressBar now={60} />
    //                                     </div>
    //                                     <p className='white_txt_sm d-flex justify-content-between mt-3'>
    //                                         <span className='text_black_perc'>0.02 %</span>
    //                                         <span className='text_blue_perc'>0.100</span>
    //                                     </p> */}

    //                             </div>
    //                         </div>
    //                         <div className="center-bg"></div>
    //                         <div className="home-progress up-allocation">
    //                             <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
    //                                 <span>Progress</span>
    //                                 <span>Participants
    //                                     <b className='pl-2'>{data.Total_Users_Participated?.toLocaleString()}</b>
    //                                 </span>
    //                             </p>
    //                             <div className='progress-bar'>
    //                                 <ProgressBar now={(data.Total_Funds_Swapped / data.Hardcap) * 100} />
    //                             </div>
    //                             <p className='white_txt_sm d-flex justify-content-between mt-3'>
    //                                 <span className='text_black_perc'>{((data.Total_Funds_Swapped / data.Hardcap) * 100).toFixed(2)}%</span>
    //                                 <span className='text_blue_perc'>{data.Total_Funds_Swapped?.toLocaleString()} BNB</span>
    //                             </p>
    //                         </div>
    //                         <div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div >
    //         </>
    //     )
    // }

}

export default ProjectCard