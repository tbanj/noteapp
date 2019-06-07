import React from 'react';
import { Link } from 'react-router-dom';
import './content.css';
// is use to class from another into this file
import noteStorage from './NoteStorage';
const getItem = new noteStorage();
var titleNoteError = "you are yet to type into it";
var  bodyNoteError ="You didnt input any note";
let noteListA= [ ];
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
          editTitle: "",
          editBody: "",
          editId:"",
          datas: "",
          formErrors: {
            titleNote: "",
            bodyNote: "",
          },
          errorbodyNote: false,
            errorTitle: false,
        };
      }

      
      // componentDidMount()    react life cycle
      componentWillMount(){
        //   componentWillMount is the method that makes the data
        // available  before the page load finish 
        // in angular its ngOnit()
        
        noteListA =getItem.getItemsFromStorage();
      }

      
      handleStoreItem () {
        getItem.storeItem(this.state.listNote);
      }

      handleDeleteItem(id) {
        const deleNote = noteListA.filter((value)=> value.id !== id);
        noteListA = deleNote;
        this.setState({listNote: noteListA});
        getItem.deleteItemFromStorage(id);
      }

      handleEditItem(data,index) {
        this.setState({editId: data.id,editTitle: data.title, editBody: data.body});
      }

      saveEditItem(updatedItem) {
        const editNote = noteListA.filter((value)=> value.id === updatedItem.id);
        if(editNote[0].id=== updatedItem.id) {
        editNote[0].id =updatedItem.id;
        editNote[0].title =updatedItem.title;
        editNote[0].body =updatedItem.body;
        }
        getItem.updateItemStorage(updatedItem);
        this.setState({editTitle: ""});
        this.setState({editBody: ""});
        this.setState({editId: ""});
      }
      
      
      
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {  
          
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
        
        
       
        this.setState({ formErrors, [name]: value });
         
        this.setState({listNote: {id: noteListA.length + 1, title: this.state.titleNote, body: this.state.bodyNote}});
      };

        render() {
            const { formErrors } = this.state;
            return (
                <div>
                        <div className="row  fixed-top">
                            <nav  className="navbar navbar-expand-lg  navbar-light bg-light col-md-12 ">
                                  <Link style={{color: 'white'}} className="navbar-brand parentChild" to="/"><span style={{fontSize: '2em',
                                    marginRight: '10%'}} className="fa fa-comment iconNote"></span></Link>    
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                  data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                                  aria-expanded="false" aria-label="Toggle navigation">
                                  <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 "></ul>
                                  <form className="form-inline my-2 my-lg-0" style={{marginRight: '4%'}}>
                                      <button style={{backgroundColor: '#ffb22b'}} type="button"
                                        className="btn btn-primary" data-toggle="modal" data-target="#noteModal">  New Notes</button>
                                  </form>
                                </div>
                            </nav>
                
                          </div>






                          <div className="container">
                            <div className="py-5"></div>
                            <div className="row py-5">
                              { noteListA.map((data, index) => {
                                return  <div className="col-sm-12 col-md-4 col-lg-3"  style={{marginBottom:'20px'}} key={index}>
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                              <div className="px-1" style={{whiteSpace: 'nowrap',
                                                  fontWeight: 'bold', 
                                                  width: '190px', 
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis'}}>{data.title}</div>
                                                  <h6 className="card-title">
                                                <i  className="float-right fa fa-trash px-2 deleteCursor"  onClick={()=>{this.handleDeleteItem(data.id);}}></i>&nbsp;
                                                <i data-toggle="modal"  data-target="#editModal" className="float-right fas fa-pencil-alt editCursor" onClick={()=>{this.handleEditItem(data, index)}}
                                                
                                                ></i>
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="card-body">
                                        
                                          <p className="card-text">
                                          {data.body}
                                          </p>
                                          
                                        </div>
                                      </div>
                              </div>
                              })}
                            
                            </div> 
                          </div>  





                              {/* modal to insert Note */}
                          < div className="modal fade" id="noteModal" tabIndex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">

                                  <form className="container mb-5" onSubmit={this.handleSubmit} noValidate >
                                
                                    <div id="parentLast" className="col-md-12 col-sm-12 form-group">
                                      <label style={{fontWeight: "bold"}}>Title of Note  <span className="required">*</span> </label>
                                      <input type="text" className="form-control"  placeholder="Title of Note" 
                                            name="titleNote"  maxLength="50" value={this.state.titleNote}
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
                                      this.handleStoreItem();
                                      noteListA =getItem.getItemsFromStorage();
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
                      

                                    {/* modal to edit Note */}
                        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog"  aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                            <input name="editTitle" value={this.state.editTitle} onChange={this.handleChange} 
                              style={{width: '40%'}} className="form-control"  />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                              <input className="form-control" style={{height: '60px' }} value={this.state.editBody} 
                              name="editBody" onChange={this.handleChange} />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                    (!this.state.editTitle.length || !this.state.editBody.length) ?  '' : 
                                    <button type="button"  data-dismiss="modal" onClick={()=>{
                                      this.saveEditItem({id: this.state.editId, title: this.state.editTitle, body:this.state.editBody})
                                        
                                        alert('note submitted ');
                                        
                                    }}  className="btn btn-success">Save
                                  </button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>

</div>
            );
        }
}
export default Content;

