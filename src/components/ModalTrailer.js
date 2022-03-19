import React from "react";
import VideoNotFound from "../videoNotFound.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MovieProperties } from "../UI/MovieDetails/MovieProperties";
import classes from "./ModalTrailer.module.css";

export const ModalTrailer = ({ trailer, handleClose, show }) => {
  return (
    <Modal
      size={"lg"}
      show={show}
      onHide={handleClose}
      className={classes.content}
    >
      <Modal.Body className={classes.body}>
        <Modal.Title className={classes.title}>
          {trailer && trailer.fullTitle}
        </Modal.Title>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {trailer && trailer.linkEmbed !== null ? (
            <iframe
              title={`${trailer.fullTitle}`}
              width="100%"
              height="315px"
              src={`${trailer.linkEmbed}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={VideoNotFound} alt="error" />
          )}
          {trailer && trailer.videoDescription !== null && (
            <MovieProperties data={trailer.videoDescription}></MovieProperties>
          )}
        </div>
        <Button
          variant="primary"
          onClick={handleClose}
          style={{ width: "100%" }}
        >
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
};
