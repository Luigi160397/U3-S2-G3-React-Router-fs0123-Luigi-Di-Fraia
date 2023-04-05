import { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";

const CommentArea = props => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.params, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzOWZmOWM1NmIzNjAwMTMzZmU1NWEiLCJpYXQiOjE2ODA1MDIyMDEsImV4cCI6MTY4MTcxMTgwMX0.fig-8rFCTFRY2yqHXAH6TirDOGQ_4zSo2BeVwq0XAj0"
        }
      });

      if (response.ok) {
        const commentsArr = await response.json();
        setComments(commentsArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.params]);

  return (
    <>
      {comments.length > 0 ? (
        <>
          <h5 className="display-6 text-white">Commenti:</h5>
          <ListGroup className="mt-3">
            {comments.map(comment => (
              <ListGroup.Item className="bg-black text-white" key={comment._id}>
                <Row>
                  <Col className="text-truncate" xs={12}>
                    <strong>Autore:</strong> {comment.author}
                  </Col>
                  <Col xs={12}>
                    <strong>Commento:</strong> {comment.comment}
                  </Col>
                  <Col xs={12}>
                    <strong>Rate:</strong> <Badge bg="danger">{comment.rate}</Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h5 className="text-center">Non ci sono commenti per questo film.</h5>
      )}
    </>
  );
};

export default CommentArea;
