import {React,useState} from "react";
import {FormGroup,FormControl,Button,Form} from "react-bootstrap"

const AddCustomer =()=>{
//debugger;
    const [formData,setFormData]= useState({
        FirstName:"",
        LastName:"",
        UserName:"",
        EmailAddress:"",
        DateOfBirth:"",

    })

    const [formError,setFormError]= useState({})

    const onChangeHandler=(event)=>{
        setFormData(()=>({
          ...formData, [event.target.name]: event.target.value,
        }))
    }

    const Validation=()=>{
        let err={}

        if(formData.FirstName==="")
        {
            err.FirstName="Please enter first name"
        }

        if(formData.LastName==="")
        {
            err.LastName="Please enter last name"
        }

        if(formData.UserName==="")
        {
            err.UserName="Please enter username"
        }

        if(formData.EmailAddress==="")
        {
            err.EmailAddress="Please enter email address"
        }
        if(formData.DateOfBirth==="")
        {
            err.DateOfBirth="Date of birth"
        }


        setFormError({...err})

        return Object.keys(err).length<1;

    }

    function SubmitHandler(event)
    {
        event.preventDefault();

        let isValid= Validation();

        if(isValid)
        {
            fetch(process.env.REACT_APP+"Customer/AddCustomer",{
                method:"Post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    FirstName: event.FirstName.value,
                    LastName: event.LastName.value,
                    UserName: event.UserName.value,
                    EmailAddress: event.EmailAddress.value,
                    DateOfBirth: event.DateOfBirth.value,
                })

            })
        }
    }



    return(<div className="container">
            <Form onSubmit={(e)=>SubmitHandler(e)}>
                <div className=""></div>
            <FormGroup controlId="UserName">
                    <FormControl type="text" name="UserName" onChange={onChangeHandler} value={formData.UserName} />
                    <span className="text-danger">{formError.UserName}</span>
                </FormGroup>

                <FormGroup controlId="FirstName">
                    <FormControl type="text" name="FirstName" onChange={onChangeHandler} value={formData.FirstName} />
                    <span className="text-danger">{formError.FirstName}</span>

                </FormGroup>

                <FormGroup controlId="LastName">
                    <FormControl type="text" name="LastName" onChange={onChangeHandler} value={formData.LastName} />
                    <span className="text-danger">{formError.LastName}</span>

                </FormGroup>
                <FormGroup controlId="EmailAddress">
                    <FormControl type="email" name="EmailAddress" onChange={onChangeHandler} value={formData.EmailAddress} />
                    <span className="text-danger">{formError.EmailAddress}</span>

                </FormGroup>
                <FormGroup controlId="DateOfBirth">
                    <FormControl type="date" name="DateOfBirth" onChange={onChangeHandler} value={formData.DateOfBirth} />
                    <span className="text-danger">{formError.DateOfBirth}</span>

                </FormGroup>

                <FormGroup>
                    <Button type="submit" className="primary">Add Customer</Button>
                </FormGroup>

                <h1>Hello</h1>
                
            </Form>

    </div>)
}

export default AddCustomer;