import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import apis from "../services";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Presale = () => {
  const [presale, setPresale] = useState({});
  const { id } = useParams();

  function formatDate(isoString) {
    const date = new Date(isoString);
    const localDateString = date.toLocaleString();
    return localDateString;
  }

  const { data, isLoading, refetch } = useQuery(
    ["getPresaleAdmin"],
    () => apis.getPresaleAdmin(),
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: (data) => {
        let presaleData = data?.data;
        const currentPresale = presaleData.find(
          (presaleItem) => presaleItem._id == id
        );
        setPresale(currentPresale);
        // console.log(presaleData)
      },
    }
  );

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
    <>
      <div className="presale p-5">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td scope="col">_id</td>
              <td>{_id}</td>
            </tr>
            <tr>
              <td scope="col">Logo URL</td>
              <td>{Logo_URL}</td>
            </tr>
            <tr>
              <td scope="col">Token Address</td>
              <td><a target="_blank" href={`https://bscscan.com/token/${Token_info?.Token_Address}`} >{Token_info?.Token_Address} </a></td>
            </tr>
            <tr>
              <td scope="col">Token Name</td>
              <td>{Token_info?.Token_Name}</td>
            </tr>
            <tr>
              <td scope="col">Token Symbol</td>
              <td>{Token_info?.Token_Symbol}</td>
            </tr>
            <tr>
              <td scope="col">Token Decimal</td>
              <td>{Token_info?.Token_Decimal}</td>
            </tr>
            <tr>
              <td scope="col">Presale Rate</td>
              <td>{Presale_rate}</td>
            </tr>
            <tr>
              <td scope="col">Min Contirbution</td>
              <td>{Contribution?.min}</td>
            </tr>
            <tr>
              <td scope="col">Max Contirbution</td>
              <td>{Contribution?.max}</td>
            </tr>
            <tr>
              <td scope="col">Start Time</td>
              <td>{formatDate(Time?.Start)}</td>
            </tr>
            <tr>
              <td scope="col">End Time</td>
              <td>{formatDate(Time?.End)}</td>
            </tr>
            <tr>
              <td scope="col">Vesting</td>
              <td>{`${Vesting}`}</td>
            </tr>
            <tr>
              <td scope="col">Vesting Period Days</td>
              <td>{Vesting_Period_Days}</td>
            </tr>
            <tr>
              <td scope="col">Rewards Per Vesting Period</td>
              <td>{Rewards_Per_Vesting_Period}</td>
            </tr>
            <tr>
              <td scope="col">Softcap</td>
              <td>{Softcap?.toLocaleString()}</td>
            </tr>
            <tr>
              <td scope="col">Hardcap</td>
              <td>{Hardcap?.toLocaleString()}</td>
            </tr>
            <tr>
              <td scope="col">Website Link</td>
              <td><a target="_blank" href={Links?.Website_Link}>{Links?.Website_Link}</a></td>
            </tr>
            <tr>
              <td scope="col">Telegram Link</td>
              <td><a href={Links?.Telegram_Link} target="_blank"> {Links?.Telegram_Link}</a></td>
            </tr>
            <tr>
              <td scope="col">Twitter Link</td>
              <td><a href={Links?.Twitter_Link} target="_blank">{Links?.Twitter_Link}</a></td>
            </tr>
            <tr>
              <td scope="col">Facebook Link</td>
              <td><a href={Links?.Facebook_Link} target="_blank">{Links?.Facebook_Link}</a></td>
            </tr>
            <tr>
              <td scope="col">Description</td>
              <td>{Description}</td>
            </tr>
            <tr>
              <td scope="col">Whitelisted Sale</td>
              <td>{`${Whitelisted_sale}`}</td>
            </tr>
            <tr>
              <td scope="col">Status</td>
              <td>{Status}</td>
            </tr>
            <tr>
              <td scope="col">Access Type</td>
              <td>{Access_type}</td>
            </tr>
            <tr>
              <td scope="col">Total Users Participated</td>
              <td>{Total_Users_Participated}</td>
            </tr>
            <tr>
              <td scope="col">Total Funds Swapped</td>
              <td>{Total_Funds_Swapped?.toLocaleString()}</td>
            </tr>
            <tr>
              <td scope="col">Approval</td>
              <td>{Approval}</td>
            </tr>
            {/* <tr>
              <td scope="col">
                {Approval !== "Approved" ? (
                  <Button
                    variant="outline-primary"
                    className="mx-2 my-4 my-md-0 button-size"
                    onClick={() => handleShow(presale, "Edit Presale")}
                  >
                    Edit{" "}
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr> */}
          </tbody>
        </table>
      </div >
    </>
  );
};

export default Presale;
