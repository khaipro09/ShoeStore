import styled from "styled-components";

export const ShowUploadImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  background-image: url(${(props)=>props.uploadImages ? props.uploadImages :null});
  background-size: 100% 100%;
`