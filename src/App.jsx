import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  // ✅ state for profiles
  const [people, setPeople] = useState(profiles);

  // ✅ state for form input and feedback
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // ✅ handle add form submission
  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    // validation rules
    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    const exists = people.some(
      (p) => p.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError('This name already exists.');
      return;
    }

    // add new profile
    const newProfile = {
      id: people.length + 1,
      name: trimmed,
      likes: 0,
    };
    setPeople([...people, newProfile]);
    setName('');
    setError('');
  };

  // ✅ like button logic
  const handleLike = (id) => {
    setPeople((ps) =>
      ps.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* Add Profile Form */}
      <Form className="mb-4" onSubmit={handleAdd}>
        <Row className="justify-content-center">
          <Col xs={8} md={6} lg={4}>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="success">
              ➕ Add
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Profiles List */}
      <Row xs={1} md={2} lg={3}>
        {people.map((p) => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} />
            <div className="text-center mb-3">
              <Button variant="primary" onClick={() => handleLike(p.id)}>
                👍 Like
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {people.length === 0 && (
        <Alert variant="info" className="text-center">
          No profiles yet.
        </Alert>
      )}
    </Container>
  );
}
