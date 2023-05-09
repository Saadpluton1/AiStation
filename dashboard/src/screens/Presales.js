import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import Modal from "../components/Modal";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Users = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [reqireState, SetreqireState] = useState(true);
 
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
      },
    }
  );

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    apis.deletePresale,
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
    if (title === "Edit Presale") {
      if(Presale.Approval === "Banned")
      {
       mutateDelete(Presale._id)
      }
      else{
        mutateEdit({ _id: Presale?._id, Approval: Presale?.Approval });
      }
    } 
    setShow(false)
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
    values.map((presale) => {
      const {
        _id,
        Token_info,
        Time,  
        Approval,
      } = presale;
      return (
        <tr key={_id}>
          <td>
            <Link to={`/presale/${_id}`}>
              <button className="table-button">View</button>
            </Link>
          </td>
 
          <td>{Token_info.Token_Address}</td>
          <td>{Token_info.Token_Name}</td>
          <td>{Token_info.Token_Symbol}</td>
    
          <td>{formatDate(Time.Start)}</td>
          <td>{formatDate(Time.End)}</td>
          <td>{Approval}</td>

          <td>
              <Button
                variant="outline-primary"
                className="mx-2 my-4 my-md-0 button-size"
                onClick={() => handleShow(presale, "Edit Presale")}
              >
                Edit{" "}
              </Button>
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
