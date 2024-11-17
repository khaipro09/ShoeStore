import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1600px;
  flex-direction: row-reverse;
  @media screen and (max-width: 920px) {
    flex-direction: column;
  }
  @media screen and (max-width: 400px) {
    min-height: unset;
  }
`;

export const LoginPage = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(45deg, #30cfd0 0%, #330867 100%);
  @media screen and (max-width: 920px) {
    padding: 1rem;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 2rem;
    box-shadow: 0px 1px 5px rgb(0 0 0 / 10%);
    border-radius: 5px;
    transition: 0.8s ease;
    background: #fff;
    .login-title {
      h1 {
        font-size: 18px;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(to right, #30cfd0 0%, #330867 50%);
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 10px;
      }
      h2 {
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        color: transparent;
        line-height: 1.4;
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(to right, #30cfd0 0%, #330867 90%);
      }
    }
    .form-redirect {
      a {
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(to right, #0f5a5a 0%, #330867 90%);
        font-weight: 500;
      }
    }
    @media screen and (max-width: 920px) {
      padding: 1rem;
      gap: 15px;
      .login-title {
        h1 {
          margin-bottom: 20px;
        }
      }
    }
    @media screen and (max-width: 450px) {
      .form-redirect {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
  @media screen and (max-width: 400px) {
    padding: 0rem;
    .login-form {
      box-shadow: unset;
      border-radius: unset;
      padding: 15px 10px;
    }
  }
`;

export const LoginWallpaper = styled.div`
  flex: 3;
  display: flex;
  height: 100vh;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.05);
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1200px) {
    flex: 2;
  }
  @media screen and (max-width: 920px) {
    display: none;
    img {
      display: none;
    }
  }
`;
