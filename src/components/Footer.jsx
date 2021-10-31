import {Row , Col, List, ListInlineItem, Container } from 'reactstrap';

export const Footer = () => {
    return(
        <Row className='myFooter align-items-center' >
            <Container style={{paddingTop:"10px"}}>
            <Col className='text-center'>
                <span>@Copyright GabrieleGhisleni</span>
            </Col>
            <Col className='text-center Icons'>
            <List type="inline">
                            <ListInlineItem>
                                <a href="https://github.com/GabrieleGhisleni">
                                    <i className="fa fa-github fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/">
                                    <i className="fa fa-linkedin fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.facebook.com/gabriele.ghisleni.125">
                                    <i className="fa fa-facebook fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.instagram.com/g_gabry_/">
                                    <i className="fa fa-instagram fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="mailto:gabriele.ghisleni01@gmail.com">
                                    <i className="fa fa-envelope-o fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="@">
                                    <i className="fa fa-info fa-lg"></i>
                                </a>
                            </ListInlineItem>
                        </List>
            </Col>
        </Container>
        </Row>  
    );
}

export default Footer;