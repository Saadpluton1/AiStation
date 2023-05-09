import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import "../../global.css";
import { GrFormSearch } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
import { FaTwitter, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import ProjectCard from "../../components/projectCard";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { Store } from "../../context/AistationProvider";

const LandingPage = () => {
  // const [data, setData] = useState([])
  // const [loadMore, setLoadMore] = useState(false)
  const [search, setSearch] = useState("");
  const { data, getData } = useContext(Store);
  const [visibleItems, setVisibleItems] = useState(2);

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + data?.length);
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="logo_overlay">
      <Header />
      <div className="home-section">
        <div>
          <div className="container">
            <div className="row my-3">
              <div className="col-lg-4 col-md-12"></div>
              <div className="col-lg-4 col-md-6">
                <p className="banner_title text-center">Projects</p>
              </div>
              <div
                className="col-lg-4 my-auto p-0 col-md-6 search-bar"
                style={{ textAlign: "right" }}
              >
                <span className="input_weap">
                  <input
                    type="text"
                    className="form-control searc_style_1"
                    placeholder="Project Name"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <GrFormSearch />
                </span>
              </div>
              <hr className="hr_yellow mt-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="inner_bg mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-between gy-5 card_row_h">
            {/* <div className='col-12 col-lg-6 col-lg-6-custom mb-4'>
              <Link to={'/sale'}>
                <div className="pool_card">
                  <div className="pool-link">
                    <div className='card-body'>
                      <div className='grid_img_div'>
                        <div>
                          <img src="/assets/images/token.webp" alt="" />
                        </div>
                        <div>
                          <p className='yellow_txt font_20 mb-2'>MATICZ</p>
                          <div className='btn-group btn_grp_yel mb-2'>
                            <ul>
                              <li> <button className='button'><span><TbWorld /></span></button></li>
                              <li> <button className='button'><span><FaTwitter /></span></button></li>
                              <li> <button className='button'><span><FaPaperPlane /></span></button></li>
                            </ul>
                          </div>
                          <div className='d-sm-flex d-block'>
                            <p className='mt-2 mb-0'>
                              <span className='badge dangerbtn badge-green'>
                                <span className='green_dot' style={{ top: '7px' }}></span>
                                <span className='green_txt'>Closed</span>
                              </span>
                            </p>
                          </div>
                          <p>
                            <span className='badge badge-yellow-fill mt-2'>
                              <span className='blk_txt'>refitplus</span>
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className='yellow_txt_sm'>RAP gives the Refit Plus token automatic staking and compounding features, and the highest Fixed APY in the market 383, 025.41%, a ...</p>
                      <div className="row">
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
                          <p className='desc_grey_txt pb-0 mb-0'>1 BNB = 100 refitplus</p>
                        </div>
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
                          <p className='desc_grey_txt pb-0 mb-0'>500.00 BNB</p>
                        </div>
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
                          <p className='desc_grey_txt pb-0 mb-0'>Public</p>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="center-bg"></div>
                  <div className="home-progress up-allocation">
                    <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
                      <span>Progress</span>
                      <span>Participants
                        <b className='pl-2'>1</b>
                      </span>
                    </p>
                    <div className='progress-bar'>
                      <ProgressBar now={60} />
                    </div>
                    <p className='white_txt_sm d-flex justify-content-between mt-3'>
                      <span className='text_black_perc'>0.02 %</span>
                      <span className='text_blue_perc'>0.100</span>
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
              </Link>
            </div> */}
            {/* <div className='col-12 col-lg-6 col-lg-6-custom mb-4'>
              <Link to={'/sale'}>
                <div className="pool_card">
                  <div className="pool-link">
                    <div className='card-body'>
                      <div className='grid_img_div'>
                        <div>
                          <img src="/assets/images/token.webp" alt="" />
                        </div>
                        <div>
                          <p className='yellow_txt font_20 mb-2'>MATICZ</p>
                          <div className='btn-group btn_grp_yel mb-2'>
                            <ul>
                              <li> <button className='button'><span><TbWorld /></span></button></li>
                              <li> <button className='button'><span><FaTwitter /></span></button></li>
                              <li> <button className='button'><span><FaPaperPlane /></span></button></li>
                            </ul>
                          </div>
                          <div className='d-sm-flex d-block'>
                            <p className='mt-2 mb-0'>
                              <span className='badge dangerbtn badge-green'>
                                <span className='green_dot' style={{ top: '7px' }}></span>
                                <span className='green_txt'>Closed</span>
                              </span>
                            </p>
                          </div>
                          <p>
                            <span className='badge badge-yellow-fill mt-2'>
                              <span className='blk_txt'>refitplus</span>
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className='yellow_txt_sm'>RAP gives the Refit Plus token automatic staking and compounding features, and the highest Fixed APY in the market 383, 025.41%, a ...</p>
                      <div className="row">
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
                          <p className='desc_grey_txt pb-0 mb-0'>1 BNB = 100 refitplus</p>
                        </div>
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
                          <p className='desc_grey_txt pb-0 mb-0'>500.00 BNB</p>
                        </div>
                        <div className='col-12 col-lg-4 mb-3'>
                          <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
                          <p className='desc_grey_txt pb-0 mb-0'>Public</p>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="center-bg"></div>
                  <div className="home-progress up-allocation">
                    <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
                      <span>Progress</span>
                      <span>Participants
                        <b className='pl-2'>1</b>
                      </span>
                    </p>
                    <div className='progress-bar'>
                      <ProgressBar now={60} />
                    </div>
                    <p className='white_txt_sm d-flex justify-content-between mt-3'>
                      <span className='text_black_perc'>0.02 %</span>
                      <span className='text_blue_perc'>0.100</span>
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
              </Link>
            </div> */}
            {/* <div className='col-12 col-lg-6 col-lg-6-custom mb-4'>
              <Link to={'/sale'}>
                <div className='card card_style_1 ribbox'>
                  <div className='card-body'>
                    <div className='grid_img_div'>
                      <div>
                        <img src="/assets/images/token.webp" alt="" />
                      </div>
                      <div>
                        <p className='yellow_txt font_20 mb-2'>MATICZ</p>
                        <div className='btn-group btn_grp_yel mb-2'>
                          <button component={Link} to={'/'} className='btn btn-secondary'><TbWorld /></button>
                          <button component={Link} to={'/'} className='btn btn-secondary'><FaTwitter /></button>
                          <button component={Link} to={'/'} className='btn btn-secondary'><FaPaperPlane /></button>
                        </div>
                        <div className='d-sm-flex d-block'>
                          <p className='mt-2 mb-0'>
                            <span className='badge dangerbtn badge-green'>
                              <span className='green_dot' style={{ top: '7px' }}></span>
                              <span className='green_txt'>Closed</span>
                            </span>
                          </p>
                        </div>
                        <p>
                          <span className='badge badge-yellow-fill mt-2'>
                            <span className='blk_txt'>refitplus</span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className='yellow_txt_sm'>RAP gives the Refit Plus token automatic staking and compounding features, and the highest Fixed APY in the market 383, 025.41%, a ...</p>
                    <div className="row">
                      <div className='col-12 col-lg-4 mb-3'>
                        <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
                        <p className='desc_grey_txt pb-0 mb-0'>1 BNB = 100 refitplus</p>
                      </div>
                      <div className='col-12 col-lg-4 mb-3'>
                        <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
                        <p className='desc_grey_txt pb-0 mb-0'>500.00 BNB</p>
                      </div>
                      <div className='col-12 col-lg-4 mb-3'>
                        <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
                        <p className='desc_grey_txt pb-0 mb-0'>Public</p>
                      </div>
                      <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
                        <span>Progress</span>
                        <span>Participants
                          <b className='pl-2'>1</b>
                        </span>
                      </p>
                      <div className='progress-bar'>
                        <ProgressBar now={60} />
                      </div>
                      <p className='white_txt_sm d-flex justify-content-between mt-3'>
                        <span className='text_black_perc'>0.02 %</span>
                        <span className='text_blue_perc'>0.100</span>
                      </p>

                    </div>
                  </div>
                </div>
              </Link>
            </div> */}

            {visibleItems === 2 && (
              <>
                {data.reverse()
                  .slice(0, visibleItems)
                  .map((d, i) => (
                    <ProjectCard data={d} index={i} />
                  ))}
              </>
            )}

            {visibleItems > 2 && (
              <>
                {data?.map((d, i) => (
                  <ProjectCard data={d} index={i} />
                ))}
              </>
            )}
          </div>

          <div className="text-center mt-5">
            {visibleItems < data.length && (
              <button
                className="get-started-btn get-started-btn-load"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
    </div>
  );
};

export default LandingPage;
