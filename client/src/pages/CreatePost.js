import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router'

// copied from documentation..for react-quilll...not need to understand this,.
const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image','video'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','video'
  ]

const CreatePost = () => {
    const [title , setTitle] = useState("")
    const [summary , setSummary] = useState("")
    const [content , setContent] = useState("")
    const [files , setFiles] = useState("")
    const navigate = useNavigate();
    const createNewPost=async(e)=>{
      e.preventDefault();
      
      const data = new FormData();
      data.append('title',title)
      data.append('summary',summary)
      data.append('content',content)
      data.set('file',files[0])
      
      const response = await fetch("http://localhost:4000/post",{
        method: "POST",
        body: data,
        credentials: 'include'
      })

      if(response.status === 200){
        alert('Post Created Successfully')
        navigate("/")
      }
      else{
          alert('Creation Failed , try again')
      }
      // console.log("FormData:", Object.fromEntries(data))
    }
  return (
    <>
        <div>
            <form className='create-postContainer' method='POST' onSubmit={createNewPost} encType='multipart/form-data'>
                <img src={files} className=''/>
                <div className='post-class'>
                    <label>Blog Title</label>
                    <button className='create-btn'>Create Post</button>
                </div>
                <input type='text' placeholder='Your Post Title'  className='' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <label>Summary</label>
                <input type='text' placeholder='Summary' value={summary} className='' onChange={(e)=>setSummary(e.target.value)}/>
                <input id="file-upload" type="file" className='file-upload' name='file' onChange={(e)=>setFiles(e.target.files)}/>
                {/* Problem: URL.createObjectURL which was creating the objectURL of the uploaded file. but multer only requires the file and not the URL.*/}
                <ReactQuill className='' value={content} modules={modules} formats={formats} onChange={newValue=>setContent(newValue)}/>
            </form>
            {/* <form onSubmit={createNewPost}>
              <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
              <input type="summary"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} />
              <input type="file"
                    onChange={ev => setFiles(ev.target.files)} />
              <button style={{marginTop:'5px'}}>Create post</button>
            </form> */}
          </div>
      </>
    )
}

export default CreatePost