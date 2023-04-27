import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { memo } from "react";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";

function Home() {
  const [values, setValues] = useState({ user: "", blog: "" });

  const { data, isLoading, refetch } = useQuery(
    ["getAnalytics"],
    () => apis.getAnalytics(),
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: (data) => {
        let blog = data?.data?.blog;
        let user = data?.data?.user;
        setValues({ user: user, blog: blog });
      },
    }
  );

  return (
    <>
      <Container fluid className="main-height">
        <Row>
          <Col lg={12} md={12}>
            <div className="custom-chart-margin">
              {/* <FinancialChartStockIndexChart/> */}
              <h3 className="section-title">Dashboard</h3>
              <div className="analytics">
                <div class="dashboard-box">
                  <h3>{values?.user}</h3>
                  <hr />
                  <span>Total Users</span>
                </div>
                <div class="dashboard-box">
                  <h3>{values?.blog}</h3>
                  <hr />
                  <span>Total Blogs</span>
                </div>
                {/* <div class="dashboard-box">
                                <hr />
                                <span>Monthly Raised</span>
                            </div>
                            <div class="dashboard-box">
                                <hr />
                                <span>Weekly Raised</span>
                            </div>
                            <div class="dashboard-box">
                                <hr />
                                <span>Daily Raised</span>
                            </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default memo(Home);
