
import { memo } from "react";

function Header() {
return (
    <>
    <div className="header">
            {/* <img src={Logo}/> */}
        <div className="d-flex">
        <div className="head-logo-text">
        <h5 >Galaxy</h5>
             </div>
        </div>
        </div>
    </>
    );
}

export default memo(Header);
