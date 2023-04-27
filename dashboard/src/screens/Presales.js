import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import Modal from "../components/Modal";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Users = () => {
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [reqireState, SetreqireState] = useState(true);
  const [isFetching, setFetching] = useState(false);

  const [modalData, setModalData] = useState({ Approval: "" });

  const [values, setValues] = useState([]);

  const { data, isLoading, refetch } = useQuery(
    ["getPresaleAdmin"],
    () => apis.getPresaleAdmin(),
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: (data) => {
        let presaleData = data?.data;
        setValues(presaleData);
        // console.log(presaleData)
      },
    }
  );

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    apis.deleteUser,
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: ({ data }) => {
        if (data.status) {
          refetch();
          console.log(data);
          toast.success(data.message, { id: 1 });
        }
      },
    }
  );

  // const { mutate: mutateEdit, isLoading: isLoadingEdit } = useMutation(apis.updatePresaleStatus, {
  //   onError: function ({ message }) {
  //     console.log(message);
  //   },
  //   onSuccess: ({ data }) => {
  //     if (data.status) {
  //       refetch()
  //       toast.success(data.message, { id: 1 })
  //     }
  //   },
  // });
  const { mutate: mutateEdit, isLoading: isLoadingEdit } = useMutation(
    apis.updatePresaleStatus,
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: ({ data }) => {
        if (data.status) {

          toast.success(data.message, { id: 1 });
          refetch();
          handleClose();
        }
      },
    }
  );
  const { mutate: mutateAddBlog, isLoading: isLoadingAdd } = useMutation(
    apis.addBlog,
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: ({ data }) => {
        if (data.status) {
          refetch();
          toast.success(data.message, { id: 1 });
        }
      },
    }
  );

  // console.log(values, "VALUES")
  const handleShow = (presale, title) => {
    if (title === "Edit Presale") {
      SetreqireState(false);
    }
    if (presale) setModalData(presale);
    setTitle(title);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = async (Presale) => {
    console.log(Presale, "aaaa");
    if (title === "Edit Presale") {
      const form_data = new FormData();
      console.log("formdaaa", form_data);
      console.log("presaleasdasd", Presale.Approval);
      // console.log("heheh", Presale?.Approval)
      mutateEdit({ _id: Presale?._id, Approval: Presale?.Approval });
      // setShow(false);
      // window.location.reload();
    } else {
      const form_data = new FormData();
      for (const [key, value] of Object.entries(blogs)) {
        if (key !== "_id") {
          form_data.append(key, value);
        }
      }
      mutateAddBlog(form_data);
      // setShow(false);
    }
    setShow(false)
  };

  const handleDelete = async (id) => {
    mutateDelete(id);
  };

  if (isLoading || isLoadingDelete)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  function formatDate(isoString) {
    const date = new Date(isoString);
    const localDateString = date.toLocaleString();
    console.log(localDateString);
    return localDateString;
  }

  const renderPresaleList =
    values?.length > 0 &&
    values.map((presale, index) => {
      const {
        _id,
        Logo_URL,
        Token_info,
        Presale_rate,
        Contribution,
        Time,
        Vesting,
        Vesting_Period_Days,
        Rewards_Per_Vesting_Period,
        Softcap,
        Hardcap,
        Links,
        Description,
        Whitelisted_sale,
        Status,
        Access_type,
        Total_Users_Participated,
        Total_Funds_Swapped,
        Approval,
      } = presale;
      return (
        <tr key={_id}>
          <td>
            <Link to={`/presale/${_id}`}>
              <button className="table-button">View</button>
            </Link>
          </td>
          {/* <td>{_id}</td>
          <td>{Logo_URL}</td> */}
          <td>{Token_info.Token_Address}</td>
          <td>{Token_info.Token_Name}</td>
          <td>{Token_info.Token_Symbol}</td>
          {/* <td>{Token_info.Token_Decimal}</td> */}
          {/* <td>{Presale_rate}</td>
          <td>{Contribution.min}</td>
          <td>{Contribution.max}</td> */}
          <td>{formatDate(Time.Start)}</td>
          <td>{formatDate(Time.End)}</td>
          {/* <td>{`${Vesting}`}</td>
          <td>{Vesting_Period_Days}</td>
          <td>{Rewards_Per_Vesting_Period}</td>
          <td>{Softcap?.toLocaleString()}</td>
          <td>{Hardcap?.toLocaleString()}</td> */}
          {/* <td >{`${Liquidity}`}</td>
          <td >{Locking_Days}</td>
          <td >{Liquidity_Rate_Per_BNB}</td>
          <td >{Pancakeswap_Liquidity}</td> */}
          {/* <td>{Links.Website_Link}</td>
          <td>{Links.Telegram_Link}</td>
          <td>{Links.Twitter_Link}</td>
          <td>{Links.Facebook_Link}</td>
          <td style={{ textAlign: "left" }}>{Description}</td>
          <td>{`${Whitelisted_sale}`}</td>
          <td>{Status}</td>
          <td>{Access_type}</td>
          <td>{Total_Users_Participated}</td>
          <td>{Total_Funds_Swapped?.toLocaleString()}</td> */}
          <td>{Approval}</td>

          <td>
              <Button
                variant="outline-primary"
                className="mx-2 my-4 my-md-0 button-size"
                onClick={() => handleShow(presale, "Edit Presale")}
              >
                Edit{" "}
              </Button>
            
            {/* <Button variant="outline-danger" className='mx-2 my-2 button-size'
              onClick={() => handleDelete(_id)}>Delete</Button> */}
          </td>
        </tr>
      );
    });

  return (
    <>
      <Container fluid className="main-height">
        <Row>
          <Col lg={12} md={12}>
            <div className="custom-chart-margin">
              <h5 className="section-title">Presales</h5>
              {/* <div className="overflow-auto"> */}
              <div>
                <table className="table table-striped mt-3 fixed-table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      {/* <th scope="col">_id</th>
                      <th scope="col">Logo URL</th> */}
                      <th scope="col">Token Address</th>
                      <th scope="col">Token Name</th>
                      <th scope="col">Token Symbol</th>
                      {/* <th scope="col">Token Decimal</th>
                      <th scope="col">Presale Rate</th>
                      <th scope="col">Min Contirbution</th>
                      <th scope="col">Max Contirbution</th> */}
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      {/* <th scope="col">Vesting</th>
                      <th scope="col">Vesting Period Days</th>
                      <th scope="col">Rewards Per Vesting Period</th>
                      <th scope="col">Softcap</th>
                      <th scope="col">Hardcap</th> */}

                      {/* <th scope="col">Liquidity</th>
                    <th scope="col">Locking Days</th>
                    <th scope="col">Liquidity Rate per BNB</th>
                    <th scope="col">Pancake Swap Liquidity</th> */}
                      {/* <th scope="col">Website Link</th>
                      <th scope="col">Telegram Link</th>
                      <th scope="col">Twitter Link</th>
                      <th scope="col">Facebook Link</th>
                      <th scope="col">Description</th>
                      <th scope="col">Whitelisted Sale</th>
                      <th scope="col">Status</th>
                      <th scope="col">Access Type</th>
                      <th scope="col">Total Users Participated</th>
                      <th scope="col">Total Funds Swapped</th> */}
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>{renderPresaleList}</tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          modalTitle={title}
          show={show}
          data={modalData}
          setData={setModalData}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          loader={isLoadingEdit}
          reqireState={reqireState}
        />
      </Container>

      {/* <Button variant="outline-primary" className='rounded-circle add-blog'
            onClick={() => handleShow(null, 'Create Blog')}> <i class="fa-solid fa-plus plusIcon"></i></Button> */}
    </>
  );
};
export default memo(Users);
