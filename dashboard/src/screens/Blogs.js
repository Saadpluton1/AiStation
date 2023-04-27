import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {memo, useEffect, useState} from "react";
import Modal from "../components/Modal";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Blogs = () => {

  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [loader, setLoader] = useState(false);
  const [reqireState, SetreqireState] = useState(true);
  const [isFetching, setFetching] = useState(false);

  const [modalData, setModalData] = useState({image: null, title: '',excerpt:'', description: '', _id: ''})

  const [values, setValues] = useState([]);
  
  const { data, isLoading , refetch } = useQuery(
    ["getUserById"],
    () => apis.getBlogs(),
    {
      onError: function ({ message }) {
        console.log(message);
      },
      onSuccess: (data) => {
        let blogData = data?.data?.blog;
        setValues(blogData);
      },
    }
  );

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(apis.deleteBlog, {
    onError: function ({ message }) {
      console.log(message);
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        refetch()
        console.log(data)
        toast.success(data.message,{id:1})
      }
    },
  });

  const { mutate: mutateEdit, isLoading: isLoadingEdit} = useMutation(apis.editBlogs, {
    onError: function ({ message }) {
      console.log(message);
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        refetch()
        toast.success(data.message,{id:1})
      }
    },
  });
  const { mutate: mutateAddBlog, isLoading: isLoadingAdd} = useMutation(apis.addBlog, {
    onError: function ({ message }) {
      console.log(message);
    },
    onSuccess: ({ data }) => {
      if (data.status) {
        refetch()
        toast.success(data.message,{id:1})
      }
    },
  });

  console.log(values,"VALUES")
  const handleShow = (blog, title) => {
    if (title === 'Edit Blogs') {
      SetreqireState(false)
    }
    if (blog)
      setModalData(blog);
    setTitle(title)
    setShow(true);
  }

  const handleClose = () => setShow(false);

  const handleSubmit = async (blogs) => {
      if (title === "Edit Blogs") {
        const form_data = new FormData();

        for (const [key, value] of Object.entries(blogs)) {
          form_data.append(key, value);
        }
        mutateEdit(form_data)
        setShow(false)
      }
       else {
        const form_data = new FormData();
        for (const [key, value] of Object.entries(blogs)) {
          if(key!=="_id")
          {
            form_data.append(key, value);
          }
        }
        mutateAddBlog(form_data)
        setShow(false)
      }
  }

  const handleDelete = async (id) => {
    mutateDelete(id)
  }

  if (isFetching) return <div
    style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner animation="border" variant="primary"/>
  </div>


  const renderBlogsList = values?.length > 0 && values.map((blog, index) => {
      const {title,excerpt, description, _id , image} = blog;
      return (
        <tbody key={index}>
        <tr>
          <td scope="row">{index + 1}</td>
          <td>
          <img style={{height:50,width:70}} src={image} alt=""/></td>
          <td>{title}</td>
          <td className='line-clamp'>{excerpt}</td>
          
          <td className='line-clamp'>{description}</td>
          <td>
            <Button variant='outline-primary' className='mx-2 my-4 my-md-0 button-size'
                    onClick={() => handleShow(blog, 'Edit Blogs')}>Edit </Button>
            <Button variant="outline-danger" className='mx-2 my-2 button-size'
                    onClick={() => handleDelete(_id)}>Delete</Button>
          </td>
        </tr>
        </tbody>
      )
    }
  );


  return <>
    <Container fluid className="main-height">
      <Row>
        <Col lg={12} md={12}>
          <div className="custom-chart-margin">
            <h5 className="section-title">
              Blogs
            </h5>
            <div className="overflow-auto">
              <table className="table table-striped mt-3">
                <thead>
                <tr>

                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Excerpt</th>
                  <th scope="col">Descriptions</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                {renderBlogsList}
              </table>
            </div>
          </div>
        </Col>
      </Row>
      <Modal modalTitle={title}
             show={show}
             data={modalData}
             setData={setModalData}
             handleClose={handleClose}
             handleSubmit={handleSubmit}
             loader={loader}
             reqireState={reqireState}
      />
    </Container>

    <Button variant="outline-primary" className='rounded-circle add-blog'
            onClick={() => handleShow(null, 'Create Blog')}> <i class="fa-solid fa-plus plusIcon"></i></Button>


  </>
}
export default memo(Blogs);