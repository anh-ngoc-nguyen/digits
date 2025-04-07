'use client';

/* eslint-disable react/prop-types */

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface AddNoteFormProps {
  contactId: number;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ contactId }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: { note: string; owner: string; contactId: number }) => {
    await addNote(data);
    swal('Success', 'Note has been added', 'success', {
      timer: 2000,
    });
    reset();
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="rounded shadow-sm">
            <Card.Header className="text-center">
              <h4 className="mb-0">Add Timestamped Note</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ resize: 'none' }}
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />
                <input type="hidden" {...register('contactId')} value={contactId} />

                <Row className="pt-2">
                  <Col className="d-grid">
                    <Button type="submit" variant="primary" size="lg">
                      Submit
                    </Button>
                  </Col>
                  <Col className="d-grid">
                    <Button type="button" variant="warning" size="lg" onClick={() => reset()}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNoteForm;
