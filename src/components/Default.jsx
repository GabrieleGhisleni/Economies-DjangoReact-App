import { Row, Col, Container, List, ListInlineItem, Button } from "reactstrap";
import Iframe from "react-iframe";
import LoginModal from "./Login";
import RegisterForm from "./Register";
import React from "react";

const Default = () => {
    return (
        <Container className="default-container">
            <Row>
                <Col xs={12} sm={6}>
                    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Gestici le tue Economie SMART!</h3>
                    <span className='home-description'>
                        Tieni traccia delle spese quotiadiane e metti a confronto le spese
                        fra diversi periodi dell'anno oppure tieni d'occhio chi, in famiglia,
                        spende di più. <br /><br />

                        {window.innerWidth < 800 ?
                            <Col xs={12} sm={6} className='img-home' >
                                <img src='static/piggy_bank_home.png' className='img-fluid img-home' alt='piggybank' />
                                <div className='login-register-button text-center'>
                                    <List type="inline">
                                        <ListInlineItem>
                                            <Button className='login-register'>
                                                <LoginModal />
                                            </Button>
                                        </ListInlineItem>
                                        <ListInlineItem>
                                            <Button className='login-register'>
                                                <RegisterForm />
                                            </Button>
                                        </ListInlineItem>
                                    </List>
                                </div>      </Col> : null}

                        Con Economies ti sarà possibile monitorare tutte le tue spese etichettate
                        secondo categorie e sotto categorie da te create senza nessuna difficoltà.
                        Inoltre potrai creare fino a un massimo di 5 membri per account sotto il
                        quale assegnare tali spese.<br /><br />

                       
                    </span>
                    {/* <Col className='iframe'>
                        <span> Guarda il video per capire come funziona!</span>
                        <Iframe
                            url="http://www.youtube.com/embed/xDMP3i36naA"
                            display="initial"
                            position="relative"
                            allowFullScreen 
                            width="450px"
                            height="300px"
                        />
                    </Col> */}
                </Col>
                {window.innerWidth > 800 ?
                    <Col xs={12} sm={6} className='img-home' >
                        <img src='static/piggy_bank_home.png' className='img-fluid img-home' alt='piggybank' />
                        <div className='login-register-button text-center'>
                            <List type="inline">
                                <ListInlineItem>
                                    <Button className='login-register'>
                                        <LoginModal />
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <Button className='login-register'>
                                        <RegisterForm />
                                    </Button>
                                </ListInlineItem>
                            </List>
                        </div></Col> : null}
            </Row>
        </Container>
    );
};

export default Default;
