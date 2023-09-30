import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
// import { verifiyAdmin } from "../../helper/axios";
import { Container, Spinner, Alert } from "react-bootstrap";

import { toast } from "react-toastify";
import { PostNewUserVerificationInfo } from "../../helper/axios";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
export const VerifiyUser = () => {
  //get the verification code from verification email
  const [queryStrings] = useSearchParams();
  const navigate = useNavigate();
  const c = queryStrings.get("c");
  const e = queryStrings.get("e");
  const [showSpinner, setShowSpinner] = useState(true);
  const [resp, setResp] = useState({});
  useEffect(() => {
    PostNewUserVerificationInfo({ c, e }).then((resp) => {
      setResp(resp);
      setShowSpinner(false);
      toast[resp.status](resp.message);
      if (resp.status === "success") {
        navigate("/");
      }
    });
  }, [c, e, navigate]);
  return (
    <div>
      <Header />
      <main className="main mt-5">
        <Container>
          {showSpinner ? (
            <div className="mt-5 text-center ">
              <Spinner animation="border" variant="primary" className="fs-1" />
              <br />
              Please wait while account being verified...
            </div>
          ) : (
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};
