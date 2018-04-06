import React, { Component } from 'react';
import './style.css';
import FileUploadProgress  from 'react-fileupload-progress';
import axios from 'axios';
const uuidv4 = require('uuid/v4');





// export class ImageVideoUpload extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {file: '', imagePreviewUrl: ''};
//     }
  
//     _handleSubmit(e) {
//         e.preventDefault();
//         // TODO: do something with -> this.state.file
//         //console.log('handle uploading-', this.state.file);
//         console.log('handle uploading-', this.state.imagePreviewUrl);
//     }
  
//     _handleImageChange(e) {
//         e.preventDefault();
  
//         let reader = new FileReader();
//         let file = e.target.files[0];
  
//         reader.onloadend = () => {
//             this.setState({
//             file: file,
//             imagePreviewUrl: reader.result
//             });
//         }120:28-44 '../share/ImageGallery/ImageVideoUpload' does not contain an export named 'ImageVideoUpload'.

  
//         reader.readAsDataURL(file)
//     }
  
//     render() {
//         let {imagePreviewUrl} = this.state;
//         let $imagePreview = null;
//         if (imagePreviewUrl) {
//             $imagePreview = (<img src={imagePreviewUrl} />);
//         } else {
//             $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
//         }
  
//         return (
//             <div className="previewComponent">
//                 <form onSubmit={(e)=>this._handleSubmit(e)}>
//                     <input className="fileInput"
//                         type="file" 
//                         onChange={(e)=>this._handleImageChange(e)} />
//                     <button className="submitButton" 
//                         type="submit" 
//                         onClick={(e)=>this._handleSubmit(e)}>Upload Image
//                     </button>
//                 </form>
//                 {/* <div className="imgPreview">
//                     {$imagePreview}
//                 </div> */}
//             </div>
//         )
//     }
// }
  

export class ImageVideoUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        imageURL: '',
        imageName: ''
      };
  
      this.handleUploadImage = this.handleUploadImage.bind(this);
    }
  
    handleUploadImage(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.props.file_name || uuidv4());
        fetch(this.props.upload_uri, {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
            var jsonState = { 
                imageURL: `${this.props.base_uri}/${body.file}`, 
                imageName: `${body.file}`,
                UploadImageDescription : "success"
            };
            
            this.props.Onchange(jsonState);
            // console.log(`${this.props.base_uri}/${body.file}`);
            // console.log(`${body.file}`);
            });
        }).catch((e) => {
           
            this.props.Onchange({UploadImageDescription: "fail"});
        });
        // axios.post(this.props.upload_uri, data, {
        //     onUploadProgress: progressEvent => {
        //         console.log(progressEvent.loaded);
        //         console.log(progressEvent.total);
        //         console.log(progressEvent.loaded / progressEvent.total);
        //     }
        // })
        // value=
    }
  
    render() {
      return (
          
        <form onSubmit={this.handleUploadImage}>
        {/* this.state.imageURL = {this.props.value}; */}
            <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>
            <br />
            <div>
                <button>Upload</button>
                {this.props.UploadImageDescription}
            </div>
          {/* <img src={this.state.imageURL} alt="img" /> */}
        </form>
      );
    }
  }