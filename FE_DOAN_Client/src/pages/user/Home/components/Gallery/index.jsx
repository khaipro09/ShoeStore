import React, { useEffect } from "react";

import gallery1 from "../../../../../assets/images/gallery1.jpg";
import gallery2 from "../../../../../assets/images/gallery2.jpg";
import gallery3 from "../../../../../assets/images/gallery3.jpg";
import gallery4 from "../../../../../assets/images/gallery4.jpg";
import gallery5 from "../../../../../assets/images/gallery5.jpg";
import gallery6 from "../../../../../assets/images/gallery6.jpg";

import * as Style from "./style";

function GalleryHome() {
  const galleryList = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ];
  useEffect(() => {
    //preload image
    galleryList.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  function renderGallery() {
    return galleryList.map((image, index) => (
      <Style.GalleryItem key={index}>
        <figure>
          <img src={image} alt="" />
        </figure>
      </Style.GalleryItem>
    ));
  }

  return <Style.GalleryList>{renderGallery()}</Style.GalleryList>;
}

export default GalleryHome;
