import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Contact } from '@/lib/validationSchemas';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
import type { Note } from '@prisma/client';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const owner = session?.user!.email ?? '';

  // ✅ Fetch all contacts
  const contacts: Contact[] = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  // ✅ Fetch all notes associated with this user
  const notes: Note[] = await prisma.note.findMany({
    where: {
      owner,
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Contacts</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCard
                    contact={contact}
                    notes={notes.filter(note => note.contactId === contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
