import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(null)
  const [downloadProgress, setDownloadProgress] = useState(null)

  const [response, setResponse] = useState(null);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const handleChangeFile = (event) => {
    console.log("Set the selected file");
    setFile(event.target.files[0]);
    //Make a request to server and send formData
  }
  //Replacement of  onChange={handleChangeFile.bind(this)} 
  // React.useEffect(() => {
  //   const inputElement = inputRef.current;
  //   console.log(inputElement);
  //   inputElement.addEventListener('onChange', handleChangeFile);
  //   return () => inputElement.removeEventListener('onChange', handleChangeFile);
  // }, []);

  useEffect(() => {
    console.log('current file selected to', file);
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);



    //console.log(inputRef.current);
    axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
      },
      onDownloadProgress: progressEvent => {
        setDownloadProgress((progressEvent.loaded / progressEvent.total) * 100);
      }
    }).then(response => {
      setResponse(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [file]);
  return (
    <>
      <div>
        <h1>Bird ID - Indian Languages </h1>
        <p>Upload or Paste your bird image here</p>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>

      <div className="card">

        <input type="file" onChange={handleChangeFile.bind(this)} ref={inputRef}></input>
        {/* 
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        {file &&
          <div> Selected file with following details being uploaded...
            <p>Name : {file.name}</p>
            <p>Last Modified : {file.lastModified}</p>
            <p>Size : {file.size}</p>
          </div>
        }
        {progress &&
          <p>Upload Progress : {progress} %</p>
        }
        {downloadProgress &&
          <p>Download Progress : {downloadProgress} %</p>
        }
        {response &&
          <div> Response from server ...
            <p>Download  : <a target="_blank" href={response.location}>{response.filename}</a></p>
          </div>

        }
        {/* <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul> */}
      </div>
      <p className="read-the-docs">
        {/* Click on the Vite and React logos to learn more */}
        <a target="_blank" href='https://github.com/neilghosh/birds-id-indian-lang '>Code Repo </a>
        <br />
        <a target="_blank" href='https://medium.com/google-cloud/bird-identification-with-gemini-api-c6af7cfc6532'>Medium Article</a>
      </p>
    </>
  )
}

export default App
