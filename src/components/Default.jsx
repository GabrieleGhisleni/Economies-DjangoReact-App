import { Row, Col, Container, List, ListInlineItem, Button } from "reactstrap";
import Iframe from "react-iframe";
import LoginModal from "./Login";
import RegisterForm from "./Register";
const Default = () => {
    return (
        <Container
            className="containerImg"
            style={{ backgroundImage: "url(images/home4.jpg)" }}
        >
            <Row>
                <Col xs={12}>
                    <h6>Handle your economies smarter!</h6>
                    <span>
                        Handle your economies smarter! Handle your economies smarter! Handle
                        your economies smarter! Handle your economies smarter! Handle your
                        economies smarter! Handle your economies smarter! Handle your
                        economies smarter! Handle your economies smarter!
                    </span>
                    <Col xs={12} className="text-center" style={{ paddingTop: "20px" }}>
                        <List type="inline">
                            <ListInlineItem>
                                <Button color="success">
                                    <LoginModal />
                                </Button>
                            </ListInlineItem>
                            <ListInlineItem>
                                <Button color="success">
                                    <RegisterForm />
                                </Button>
                            </ListInlineItem>
                        </List>
                    </Col>
                    <span>Controlla come funziona:</span>
                    <div>
                        <Iframe
                            url="http://www.youtube.com/embed/xDMP3i36naA"
                            display="initial"
                            position="relative"
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Default;
