import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, Spinner, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRandomDogImage, fetchRandomCatImage, selectImageURL, selectLoading, setImageURL, setPet
} from '../../store/slice/backgroundSlice';

import './background.css';

function BackgroundImage() {
    const dispatch = useDispatch();
    const imageURL = useSelector(selectImageURL);
    const loading = useSelector(selectLoading);
    const pet = useSelector((state) => state.background.pet);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const storedPet = localStorage.getItem('pet');
        if (storedPet) {
            dispatch(setPet(storedPet));
        } else {
            dispatch(setPet('dog'));
        }
    }, [dispatch]);

    useEffect(() => {
        const storedImageDate = localStorage.getItem('imageDate');
        const currentDate = new Date().toLocaleDateString();

        if (storedImageDate === currentDate) {
            const storedImageURL = localStorage.getItem('imageURL');
            dispatch(setImageURL(storedImageURL));
        } else {
            dispatch(fetchRandomDogImage());
        }
    }, [dispatch]);

    useEffect(() => {
        if (imageURL) {
            saveImageToLocalstorage(imageURL);
        }
    }, [imageURL]);

    useEffect(() => {
        localStorage.setItem('pet', pet);
    }, [pet]);

    const handleImageUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageURL = event.target.result;
            dispatch(setImageURL(imageURL));
            saveImageToLocalstorage(imageURL);
        };

        reader.readAsDataURL(file);
    };

    const handleURLSubmit = (event) => {
        event.preventDefault();
        const imageURL = event.target.elements.imageURL.value.trim();
        if (imageURL) {
            dispatch(setImageURL(imageURL));
            saveImageToLocalstorage(imageURL);
        }
    };

    const saveImageToLocalstorage = (imageURL) => {
        const currentDate = new Date().toLocaleDateString();
        localStorage.setItem('imageURL', imageURL);
        localStorage.setItem('imageDate', currentDate);
    };

    const handleNextImage = () => {
        if (pet === 'dog') {
            dispatch(fetchRandomDogImage());
        } else if (pet === 'cat') {
            dispatch(fetchRandomCatImage());
        }
    };

    const handlePetSelection = (event) => {
        const selectedPet = event.target.value;
        dispatch(setPet(selectedPet));
        if (selectedPet === 'dog') {
            dispatch(fetchRandomDogImage());
        } else if (selectedPet === 'cat') {
            dispatch(fetchRandomCatImage());
        }
    };

    return (
        <div
            className='background-image'
            style={{ backgroundImage: `url(${imageURL})` }}
        >
            <div className='p-3'>
                <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id="dog-lovers"
                    autocomplete="off"
                    value='dog'
                    checked={pet === 'dog'}
                    onChange={handlePetSelection}
                />
                <label className="btn btn-outline-light" htmlFor="dog-lovers">Dog lovers</label>
                <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id="cat-lovers"
                    autocomplete="off"
                    value='cat'
                    checked={pet === 'cat'}
                    onChange={handlePetSelection}
                />
                <label className="btn btn-outline-light" htmlFor="cat-lovers">Cat lovers</label>
            </div>
            <Button variant="dark" onClick={handleShow} className='change-background m-4' size="lg">
                Change Background Image
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Change Background Image</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant="secondary" onClick={handleNextImage}>
                            Next Image
                        </Button>
                    </div>
                    <Row className="my-5">
                        <Form.Label htmlFor="basic-url">Add image from URL</Form.Label>
                        <Form onSubmit={handleURLSubmit}>
                            <InputGroup>
                                <Form.Control type="text" name="imageURL" placeholder="Enter image URL" className="form-control" />
                                <Button variant="secondary" type="submit">
                                    Send
                                </Button>
                            </InputGroup>
                        </Form>
                    </Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Add image from local drive</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload} accept="image/*" />
                    </Form.Group>
                </Offcanvas.Body>
            </Offcanvas>
            {loading && (
                <Spinner animation="border" role="status" variant="primary" className="loading-spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
}

export default BackgroundImage;
