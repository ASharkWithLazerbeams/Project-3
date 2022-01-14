import React from "react";
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import cameraIcon from '../../assets/camera.png';
import "./events.css";

export default function Event() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [sport, setSport] = useState('');
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    console.log(title, description, price, sport)

    const submitHandler = async (evt) => {
        evt.preventDefault()
        const user_id = localStorage.getItem('user');

        const eventData = new FormData();

        eventData.append('thumbnail', thumbnail)
        eventData.append('sport', sport)
        eventData.append('title', title)
        eventData.append('price', price)
        eventData.append('description', description)
        eventData.append('date', date)
        
        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "" &&
                date !== "" &&
                thumbnail !== null
            ) {
                console.log('Event has been sent')
                await api.post('/event', eventData, { headers: { user_id }})
                console.log(eventData)
                console.log("Event has been saved")
            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000)

                console.log('Missing required data')
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    return (
        <Container>
            <h2>Create your Event</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Upload Image</Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon image" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Sport:</Label>
                    <Input id="sport" type="text" value={sport} placeholder={'Sport name'} onChange={(evt) => setSport(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Title:</Label>
                    <Input id="title" type="text" value={title} placeholder={'title name'} onChange={(evt) => setTitle(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Description:</Label>
                    <Input id="description" type="text" value={description} placeholder={'description name'} onChange={(evt) => setDescription(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Price:</Label>
                    <Input id="price" type="text" value={price} placeholder={'price name'} onChange={(evt) => setPrice(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Date:</Label>
                    <Input id="date" type="text" value={date} placeholder={'date name'} onChange={(evt) => setDate(evt.target.value)} />
                </FormGroup>
                <Button type="submit">
                    Create Event
                </Button>
            </Form>
            {errorMessage ? (
                <Alert className="event-validadtion" color="danger">MIssing required information</Alert>
            ) : ""}
        </Container>
    )
}