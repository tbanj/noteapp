
// var storageCtrl = require('./NoteStorage.js');
import React from 'react';
import { Link } from 'react-router-dom';
import './content.css';

// is use to class from another into this file
import noteStorage from './NoteStorage';

const getItem = new noteStorage();

// console.log(getItem.getItemsFromStorage());




var titleNoteError = "you are yet to type into it";
var  bodyNoteError ="You didnt input any note";

let noteListA= [
            // {title: 'Welcome home' , content: 'djhdjjkdjkdkdndkkdkdkdkdkdkkdkdkkd'},
            // {title: 'How are you', content: "yedfhfhhfhfhf"},
            // {title: 'Love you so much', content: "fhhfhfhhfhfhhfhfhfhhf"},
            
]
let eachNote;

// if(noteListA === null) {
//       noteListA= [];
// }

// const noteStorage = new storageCtrl();
// console.log(noteStorage.greetings());





    
    // getItemsFromStorage();

    

     



  
  
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;


    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.handleStoreItem = this.handleStoreItem.bind(this);
    
        this.state = {
          
          
          listNote: [],
          titleNote: "",
          bodyNote: "",
          datas: "",
          
          formErrors: {
            titleNote: "",
            bodyNote: "",
            
          },
          errorbodyNote: false,
            errorTitle: false,
        };
      }

      // componentDidMount()
      
      componentWillMount(){
        //   componentWillMount is the method that makes the data
        // available  before the page load finish 
        // in angular its ngOnit()
        
        noteListA =getItem.getItemsFromStorage();
        
        
        
        
      }

      
      handleStoreItem () {
        getItem.storeItem(this.state.listNote);
      }
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
           
            
            Note Title: ${this.state.titleNote}
            Note Body: ${this.state.bodyNote}
          `);
          
          
          
          alert('registration successful')
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    

    
      handleChange = e => {
        this.setState({errorbodyNote: false});
        this.setState({errorTitle: false});
        
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          
          case "titleNote":
            formErrors.titleNote =
              value.length < 3 ? titleNoteError : "";
            break;
        
         
            case "bodyNote":
            formErrors.bodyNote =
            value.length >= 1 && value.length < 10  ? bodyNoteError : "";
            break;
          default:
            break;
        }
        this.setState({listNote: {id: noteListA.length + 1, title: this.state.titleNote, body: this.state.bodyNote}});
        this.setState({ formErrors, [name]: value }, () =>
         console.log(this.state)
        
         );
         
      };

        render() {
            const { formErrors } = this.state;
            return (
                <div>
                  <div style={{marginBottom: '10%'}} className="row  fixed-top">
            <nav  className="navbar navbar-expand-lg  navbar-light bg-light col-md-12 ">
            {/* <a class="navbar-brand" href="#">Navbar</a> */}
                <Link style={{color: 'white'}} className="navbar-brand parentChild" to="/"><span style={{fontSize: '2em',
                  marginRight: '10%'}} className="fa fa-comment iconNote"></span></Link>    
          <button className="navbar-toggler" type="button" data-toggle="collapse"
           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
            
              
            </ul>
            <form className="form-inline my-2 my-lg-0" style={{marginRight: '4%'}}>
            
              {/* <button className="btn btn-outline-primary my-2 my-sm-0 setFontColor" type="submit">Sign in</button> */}
              {/* <button style={{height: '35px'}} data-toggle="modal" data-target="#exampleModal"
                    className="btn btn-outline-primary my-2 my-sm-0 setFontColor">
                        <p className="setFontColor">Sign in</p>
                    </button> */}

                 <button style={{backgroundColor: '#ffb22b'}} type="button"
                  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                              New Notes
                </button>

            </form>
          </div>
        </nav>
          
          </div>


                  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                {/* <h5 className="modal-title" id="exampleModalLabel">Title of Note</h5> */}

                                <form className="container mb-5" onSubmit={this.handleSubmit} noValidate >
                               
                                <div id="parentLast" className="col-md-12 col-sm-12 form-group">
                    <label style={{fontWeight: "bold"}}>Title of Note  <span className="required">*</span> </label>
                    <input type="text" className="form-control"  placeholder="Title of Note" 
                          name="titleNote"  maxLength="20" value={this.state.titleNote}
                          noValidate onChange={this.handleChange} required/>
                       {this.state.errorTitle ?<span id="checkEmployee" className="text-danger">{titleNoteError}</span>: ""}
                      
                      {formErrors.titleNote.length > 1 && (
                         <span className="text-danger">{formErrors.titleNote}</span>
              )}
                   </div>

                                <div className="form-group">
                                  <textarea id= "inputText" name="bodyNote"  type="text" 
                                      className="form-control" noValidate onChange={this.handleChange}
                                      rows="7" placeholder="Input Note" value={this.state.bodyNote} ></textarea>

                                {this.state.errorbodyNote ?<span id="checkEmployee" 
                                className="text-danger">{bodyNoteError}</span>: ""}
                                    
                                    {formErrors.bodyNote.length > 1 && (
                                        <span className="text-danger">{formErrors.bodyNote}</span>
                                    )}
                    </div>
                               </form>

                                {/* <input type="text" placeholder="Input title of your note"/> */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                             


                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                                {formValid(this.state) ?<button type="button" 
                                onClick={()=>{
                                  // eachNote = {title: this.state.titleNote, content: this.state.bodyNote};
                                  // this.getItem.storeItem(this.state.listNote);
                                  // noteListA.push(this.state.listNote);
                                  this.handleStoreItem();
                                  noteListA =getItem.getItemsFromStorage();

                                  // this.setState({listNote: noteListA});
                                    console.log(noteListA);
                                    this.setState({titleNote: ""});
                                    this.setState({bodyNote: ""});
                                    alert('note submitted ');
                                }} className="btn btn-primary" data-dismiss="modal">Save</button>
                                
                                : <button onClick={() => { 
                                    if(this.state.titleNote === null || this.state.bodyNote === null) {

                                      if(this.state.bodyNote === null) {
                                        this.setState({errorbodyNote: true});
                                      }
  
                                      if(this.state.titleNote === null) {
                                        this.setState({errorTitle: true});
                                            
                                      }
                                    }
                                  }
                                } type="button" className="btn btn-primary" >Save changes</button>}
                              </div>
                            </div>
                          </div>
</div>


                      <div  className ="row">
                                <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1">
                                    <div style={{marginLeft: "4%"}} className="row">
                        {
                                      noteListA.map((data, index) => {

                                        return <div style={{marginRight: '3%', marginBottom: '5%'}} key={index}>
                                                <div style={{paddingLeft: '0px', paddingRight: '0px'}} className="card col-md-10 offset-md-1 col-sm-8 offset-sm-2">
                                                <div className="text-center statTitle card-header">
                                                <span style={{fontSize: '4em', color: 'white' }} className="fa fa-file "></span>
                                                
                                                </div>
                                              <div className="card-body">
                                                <div className="card-title">
                                                {data.title}
                                                </div>
                                                <p className="card-text">{data.body}</p>
                                                
                                              </div>
                                            </div>
                                        </div>
                                      })
                                    }
                    </div>
                                </div>
                                    
                      </div>
                
                </div>
            );
        }
}
export default Content;

