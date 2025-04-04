'use client';

import { Card } from 'react-bootstrap';
import Image from 'next/image';
import { Contact } from '@/lib/validationSchemas';

interface ContactCardProps {
  contact: Contact;
}

const ContactCardAdmin = ({ contact }: ContactCardProps) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        height={75}
      />
      <div>
        <Card.Title className="mb-0">
          {contact.firstName}
          {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
