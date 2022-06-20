import React from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import {Button,Col, Container, Row} from "react-bootstrap";
import Image from 'react-bootstrap/Image'



const GetForeCastCards = ({weatherData, currentDate}) => {
    currentDate = new Date(currentDate * 1000).toLocaleDateString('en-Us')
    let forecastCards = [];
    weatherData.list.forEach(function (item) {
        if (new Date(item.dt * 1000).toLocaleDateString("en-US", ) !== currentDate) {
            const Card = CreateWeatherForecastCard(item)
            forecastCards.push(Card)

        }
        currentDate = new Date(item.dt * 1000).toLocaleDateString("en-US", )

    })

    return (
        <div id={'ForeCastCardDiv'}>
            <Container fluid className='gx-0'>
                <Row className='gx-0' md={5}>
                    <Col>{forecastCards[0]}</Col>
                    <Col>{forecastCards[1]}</Col>
                    <Col>{forecastCards[2]}</Col>
                    <Col>{forecastCards[3]}</Col>
                    <Col>{forecastCards[4]}</Col>

                </Row>
            </Container>
        </div>
    )
}

const GetCurrentWeatherCard = ({weatherData, triggerParentUpdate}) => {
    const currentDate = new Date(weatherData.dt * 1000).toLocaleDateString("en-US", )
    const curTemp = parseFloat(weatherData.main.temp).toFixed(1)
    const feelsLike = parseFloat(weatherData.main.feels_like).toFixed(1)
    const minTemp = parseFloat(weatherData.main.temp_min).toFixed(1)
    const maxTemp = parseFloat(weatherData.main.temp_max).toFixed(1)
    const weatherDescription = () => {
        return weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)
    }

    return (
                        <Card style={{width:'50%', margin:"auto"}}>
                            <Card.Header>{weatherData.name}{"\n"}{currentDate}</Card.Header>
                            <Card.Body>
                                <Image src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                                <Card.Title>Current: {curTemp}°c</Card.Title>
                                <Card.Subtitle>Feels like: {feelsLike}°c. {weatherDescription()}</Card.Subtitle>
                                    <ul>
                                        <li>Wind: {weatherData.wind.speed}km/h{"\t\t"}Pressure: {weatherData.main.pressure}hPa</li>
                                        <li>Humidity: {weatherData.main.humidity}%{"\t\t"}Visibility: {weatherData.visibility / 1000}km</li>
                                        <li>Min Temp: {minTemp}°c{"\t"}Max Temp: {maxTemp}°c</li>
                                    </ul>
                            </Card.Body>
                            <Card.Footer>
                                <Form>
                                <Form.Control id='cityInput' type='text' placeholder='Enter City' />
                                <Button style={{marginTop:5}} variant="primary" type="submit" onClick = {(event) =>{
                                    event.preventDefault();
                                    triggerParentUpdate(document.getElementById('cityInput').value)
                                }
                                }>
                                    Submit
                                </Button>
                                </Form>
                            </Card.Footer>
                        </Card>
    )
}

function CreateWeatherForecastCard(weatherData) {
    const currentDate = new Date(weatherData.dt_txt)
    const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon.slice(0,2)}`
    const maxTemp = parseFloat(weatherData.main.temp_max).toFixed(1)
    const minTemp = parseFloat(weatherData.main.temp_min).toFixed(1)
    const weatherDescription = () => {
        return weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)
    }
    return (
        <Card id='ForecastCards'>
            <Card.Header>{currentDate.toLocaleDateString('en-US', {weekday: 'long'})}</Card.Header>
            <Card.Body>
                <Image src={`${weatherIcon}d@2x.png`}/>
                <Card.Text>
                    {maxTemp} / {minTemp}°c{"\n"}
                    {weatherDescription()}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export {GetForeCastCards, GetCurrentWeatherCard};