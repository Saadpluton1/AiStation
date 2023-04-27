import React, { useState, useEffect } from 'react'
import { Button, Col, Table, Container, Form, Modal as CustomModal, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
const Modal = ({ show, handleClose, modalTitle, handleSubmit, data, setData, loader, reqireState }) => {
    // console.log(data, "DATA")
    const [selectedOption, setSelectedOption] = useState(data?.Approval);

    let temp = ["---", "Pending", "Approved", "Rejected", "Banned"]
    // useEffect(() => {
    //     if (modalTitle === 'Create Blog') {
    //         setData({ image: null, title: '', excerpt: '', descrsiption: '', _id: '' })
    //     }
    // }, [modalTitle]);

    const onChangeHandler = (e) => {
        setSelectedOption(e.target.value)
        setData(prevData => ({ ...prevData, Approval: e.target.value }))
    }




    return (
        <CustomModal show={show} onHide={handleClose} centered className='custom-modal'>
            <CustomModal.Header closeButton>
                <CustomModal.Title className='text-color'>{modalTitle}</CustomModal.Title>
            </CustomModal.Header>
            <Form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(data)
            }}>
                <CustomModal.Body>
                    <p className='text-color'>Choose Approval status:</p>
                    <div className="dashboard-box  reward-token-box ">

                        {/* <Form.Group className="mb-3" controlId="exampleForm.SelectCustom">
                            <Form.Label className='text-color'>Change Approval Status to:</Form.Label>
                            <Form.Select className='custom-input' aria-label="Select a category" name="category" onChange={onChangeHandler}>
                                {temp.map(t => { return <option value={t} > {t}</option> })}
                            </Form.Select>
                        </Form.Group> */}

                        <select onChange={onChangeHandler}>
                            {temp.map((val) => { return <option key={val} value={val} eventKey={val} >{val}</option> })}
                            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        </select>
                    </div>
                </CustomModal.Body>
                <CustomModal.Footer>
                    {/* <button className='custom-btn secondary-btn round-btn' style={{backgroundColor:'white' ,color:'black', border:'none'}} onClick={handleClose}>
                    Close
                </button> */}

                    <button className='custom-btn round-btn' type='submit' disabled={loader}>
                        {loader ? "Loading" : "Submit"}
                    </button>
                </CustomModal.Footer>
            </Form>
        </CustomModal >

    )
}

export default Modal;