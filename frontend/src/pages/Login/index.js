import React from "react";
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

export default function Login({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleSubmit = async evt => {
        evt.preventDefault();
        console.log('result of the submit', email, password)

        const response = await api.post('/login', { email, password })
        const userId = response.data._id ||  false;

        if (userId) {
            localStorage.setItemm('user', userId)
            history.push('/dsahboard')
        } else {
            const { message } = response.data
            console.log(message)
        }
    }

    return (
        <Container>
            <h2>Login:</h2>
            <p>Please <strong>Login</strong> into your acount</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}