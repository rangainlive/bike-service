import React, { useState, useEffect, lazy, Suspense } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import adminLogo from "../../resources/admin.png";
import { darkThemeColor } from "../Utils/index";
import axios from "axios";

const Badge = lazy(() => import("../Dashboard/Badge"));
const NewBookings = lazy(() => import("../Dashboard/NewBookings"));
const Completed = lazy(() => import("../Dashboard/Completed"));
const UsersList = lazy(() => import("../Dashboard/UsersList"));
const ListofServices = lazy(() => import("../Dashboard/ListofServices"));

const renderLoader = () => <p>Loading...</p>;

function AdminComponent() {
  const [admin, setAdmin] = useState([]);
  const history = useHistory();

  const [show, setShow] = useState(1);

  useEffect(() => {
    const keyToken = sessionStorage.getItem("user");
    axios
      .get("http://localhost:5050/app/details", {
        headers: { Authorization: `Bearer ${keyToken}` },
      })
      .then((response) => {
        setAdmin(response.data);
        if (response.data.message === "Authentication Failed!") {
          history.push({
            pathname: "/signin",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("refresh");
    history.push({
      pathname: "/",
    });
  };

  
  return (
    <Suspense fallback={renderLoader()}>
      <Container>
        <SideBarNav>
          <ProfileContainer>
            <img
              src={adminLogo}
              alt="admin"
              width="150"
              height="150"
              style={{ borderRadius: "8rem", margin: "1rem" }}
            />
            <Name> {admin.userName} </Name>
            <Badge content="Admin" />
          </ProfileContainer>
          <LinksContainer>
            <Links>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-speedometer"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                  <path
                    fillRule="evenodd"
                    d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"
                  />
                </svg>
                <button onClick={() => setShow(1)}>Booked Services</button>
              </Link>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                </svg>
                <button onClick={() => setShow(3)}>Users</button>
              </Link>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pie-chart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                </svg>
                <button onClick={() => setShow(4)}>Services</button>
              </Link>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-files"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                </svg>
                <button onClick={() => setShow(2)}>Company Details</button>
              </Link>
            </Links>
            <ContactContainer>
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </ContactContainer>
          </LinksContainer>
        </SideBarNav>
        <MainContentDiv>
          {show === 1 && (
            <ShowContainer>
              {" "}
              <NewBookings />
            </ShowContainer>
          )}
          {show === 2 && (
            <ShowContainer>
              {" "}
              <Completed />
            </ShowContainer>
          )}
          {show === 3 && (
            <ShowContainer>
              <UsersList />
            </ShowContainer>
          )}
          {show === 4 && (
            <ShowContainer>
              <ListofServices />
            </ShowContainer>
          )}
        </MainContentDiv>
      </Container>
    </Suspense>
  );
}

const MainContentDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 1rem 0.5rem;
  background-color: #f8f8f8;
  border-radius: 1.5rem;
`;
const Container = styled.div`
  display: flex;
  @media screen and (min-width: 320px) and (max-width: 786px) {
    display: flex;
    flex-direction: column;
  }
`;

const ShowContainer = styled.div`
  margin: 1rem;
`;
const SideBarNav = styled.div`
  margin: 1rem 0.5rem;
  width: 25%;
  height: max-content !important;
  border-radius: 1.5rem;
  background-color: #091322;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  gap: 3rem;

  @media screen and (min-width: 786px) and (max-width: 990px) {
    width: 35%;
    height: max-content !important;
  }
  @media screen and (min-width: 320px) and (max-width: 786px) {
    width: 95%;
    height: max-content !important;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img: {
    border-radius: 4rem;
  }
`;
const Name = styled.div`
  color: white;
  font-weight: 900;
  margin: 0.3rem;
  font-size: 1.5rem;
`;
const LinksContainer = styled.div`
  background-color: ${darkThemeColor};
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;
const Links = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  height: 73%;
`;
const Link = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 30%;
  gap: 1.5rem;
  color: white;
  padding: 0.7rem 0;
  cursor: pointer;
  button {
    text-align: left;
    width: 100%;
    color: white;
    font-weight: 900;
    background-color: transparent;
    border: none;
    outline-style: none;
  }
  svg {
    font-size: 3rem;
  }
`;
const ContactContainer = styled.div`
  width: 70%;
  background-color: #091322;
  color: white;
  margin: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 2rem;
  a {
    color: white;
    text-align: center;
    text-decoration: none;
    font-weight: 900;
  }
  span {
    font-size: 0.9rem;
    text-align: center;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-bottom: 2rem;
  }
`;
export default AdminComponent;
