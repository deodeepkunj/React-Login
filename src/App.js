import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setShow] = useState(true);
  const [agree, setAgree] = useState(false);
  async function handleSubmit(){
    if (email && password) {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
      const response = await res.json();
      let tok = response.token;
      if(tok && tok.length){
        toast.success("Successfully LoggedIn..");
        const getUser = await fetch(`https://reqres.in/api/${tok}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const userList = await getUser.json();
        console.log("userList", userList);
      }else{
        toast.error("Invalid username /password");
      }
    }
  };
  return (
    <div className="App">
      <Toaster position="top-center" />
      <div className="wrapper p-4">
        <div className="col-md-12 p-6">
          <div className="col-md-6">
            <Card className="border-1">
              <Card.Body className="p-2">
                <div className="text-center">
                  <img
                    src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"
                    alt="logo"
                  />
                  <p className="">Hello There, Sign In to Continue</p>
                </div>
                <div>
                  <Form className="mb-6">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={`${hide ? "password" : "text"}`}
                        name="password"
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    {/* <p>{password}</p> */}
                    {hide ? (
                      <BsFillEyeFill
                        className="custom-eye"
                        onClick={(e) => setShow(false)}
                      />
                    ) : (
                      <BsFillEyeSlashFill
                        className="custom-eye"
                        onClick={(e) => setShow(true)}
                      />
                    )}

                    <Form.Group className="mb-2">
                      <Form.Check
                        type="checkbox"
                        label="By creating or logging into an account, you are agreeing with our Terms and Conditions and privacy policys"
                        onClick={(e) => setAgree(true)}
                      />
                    </Form.Group>
                    <Button
                      className="w-100 text-primary"
                      variant="info"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Next
                    </Button>
                  </Form>
                </div>
                <div className="text-center custom-padding">
                  <p className="text-primary">Signin with company SSO</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
