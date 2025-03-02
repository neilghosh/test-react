import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(null)
  const [preview, setPreview] = useState(null)
  const [downloadProgress, setDownloadProgress] = useState(null)

  const [response, setResponse] = useState(null);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  window.addEventListener('paste', e => {
    setFile(e.clipboardData.files[0]);
  });
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

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", function () {
      setPreview(this.result);
    });


    let formData = new FormData();
    formData.append('img', file);

    //console.log(inputRef.current);
    axios.post('https://idx-simple-node-3987408-b3zzuedwgq-el.a.run.app/api', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        setProgress(((progressEvent.loaded / progressEvent.total) * 100).toFixed(0));
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
    return () => {
      setProgress(null);
      setDownloadProgress(null);
      setResponse(null);
    }
  }, [file]);
  return (
    <>
      <div>
        <h1>Bird Identification - Indian Languages </h1>
        <p>Upload or Paste (Ctrl + V) your bird image here</p>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>

      <div className="card">

        <input type="file" accept="image/*" onChange={handleChangeFile.bind(this)} ref={inputRef}></input>
        {/* 
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {preview &&
          <div>
            <p>Preview</p>

            <img className="images" height="auto" src={preview} alt="Bird Preview" />
          </div>
        }
        {file &&

          <div> <p>Selected file with following details being uploaded...</p>

            <hr />

            <p>Name : {file.name}</p>
            <p>Last Modified : {new Date(file.lastModified).toISOString()}</p>
            <p>Size : {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        }
        {progress &&
          <p>Upload Progress : {progress} %</p>
        }
        {downloadProgress &&
          <p>Download Progress : {downloadProgress} %</p>
        }
        <hr />
        {response &&
          <div className="centre"> {response.message}
            <br/><br/>
            {/* <p>Download  : <a target="_blank" href={response.location}>{response.filename}</a></p> */}
            {response.birdData &&
            <div className="centre"> 
              <table align="left">
                <tbody>
                  <tr>
                    <td className="titles">Bird Name  : </td>
                    <td className="values"><b>{response.birdData.bird_name}</b></td>
                  </tr>
                  <tr>
                    <td className="titles">Scientific  Name  : </td>
                    <td className="values"><b>{response.birdData.scientific_name}</b></td>
                  </tr>

                  {response.birdData.indian_languages.map(lang => (
                    <tr>
                      <td className="titles">{lang.language}:</td>
                      <td className="values"><b>{lang.value}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            }{response.imgBuffer &&
              <img className="images" height="auto" src={`data:image/png;base64,${response.imgBuffer}`} alt="Bird Image" />
            }</div>
        }

      </div>
      <p className="read-the-docs">
        {/* Click on the Vite and React logos to learn more */}
        <a target="_blank" href='https://github.com/neilghosh/test-react'>Code Repo </a>
        <br />
        <a target="_blank" href='https://medium.com/google-cloud/bird-identification-with-gemini-api-c6af7cfc6532'>Medium Article</a>

      </p>
      Copyright Neil Ghosh 2025
    </>
  )
}

export default App
