import styled from "styled-components";

export const ProfilePage = styled.div`
  padding: 15px 0 30px;
  min-height: 100vh;
  background-color: #f3f3f3;
`;

export const ProfileMenu = styled.div`
  background-color: #fff;
  border: 1px solid #dee2e6;
  .profile-top {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
    .profile-avatar {
      position: relative;
      display: inline-block;
      margin: 0 auto;
      .ant-image {
        height: 100%;
      }
      .ant-avatar .ant-image-img {
        object-fit: cover;
        height: 100%;
      }
      .profile-image {
        cursor: pointer;
        overflow: hidden;
        margin: 0;
        width: 150px;
        height: 150px;
        border: 2px solid #eee;
      }
      .avatar-upload {
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        .btn-upload {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
    .btn-avatar {
      display: none;
      width: 100%;
      justify-content: center;
      margin-top: 15px;
      &.active {
        display: flex;
      }
    }
    h3 {
      margin-top: 15px;
      font-size: 18px;
    }
  }
`;

export const ProfilePanel = styled.div`
  background-color: #fff;
  position: relative;
  min-height: 465px;
  padding: 15px;
  border: 1px solid #dee2e6;
  @media screen and (max-width: 767px) {
    padding: 7.5px;
  }
  h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #330867;
    font-weight: 900;
    margin: 0;
    padding: 15px 0 25px;
    text-align: center;
  }
`;
