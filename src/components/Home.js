import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function Home({ slides }) {
    return (
        <>
            <div >
                <div class="row" style={{padding:50}}>
                    <Carousel>
                        {slides.map((slide) => (
                            <Carousel.Item key={slide.image}>
                                <img src={slide.image} className="d-block w-100 H-50" alt="New York" />
                                <Carousel.Caption>
                                    <h3>{slide.title}</h3>
                                    <p>{slide.subTile}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div class="row">
Testing
                </div>
            </div>
        </>

    )
}
