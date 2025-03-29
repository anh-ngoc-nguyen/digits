import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" className="py-5">
      <Row className="text-center">
        <Col>
          <i className="bi bi-people-fill" style={{ fontSize: '100px' }} />
          <h1>User Registration</h1>
          <h5>
            This address book enables any number of users to register and save their business contacts.
            You can only see the contacts you have created.
          </h5>
        </Col>

        <Col>
          <i className="bi bi-file-earmark-text-fill" style={{ fontSize: '100px' }} />
          <h1>Contact Info</h1>
          <h5>
            For each contact, you can save their name, address, and phone number.
          </h5>
        </Col>

        <Col>
          <i className="bi bi-calendar2-check-fill" style={{ fontSize: '100px' }} />
          <h1>Notes & Timestamps</h1>
          <h5>
            Each time you make contact with a contact, you can write a note that summarizes the conversation.
            This note is saved along with a timestamp with the contact.
          </h5>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
