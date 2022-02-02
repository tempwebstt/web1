import React, { Component } from 'react'
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import QrReader from 'react-camera-qr'
import * as Papa from 'papaparse';
import logo from './eu.png';
import './App.css';

class App extends Component {
  state = {
    result: 'No result',
    loaded: false,
    values: [],
  }

  handleScan = data => {
    if (data) { this.setState({ result: data }) }
  }

  handleError = err => {
    console.error(err)
    alert(err)
  }

  sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    return true;
  }

  loadInformation = () => {
    fetch("https://docs.google.com/spreadsheets/d/1KnK5cVAQfUWzNE-fxsU_Gs2MtS5U4HfTSxByr2tb5zI/export?format=csv&gid=0")
      .then( response => response.text() )
      .then( responseText => {
          var data = Papa.parse(responseText);
          if (!this.state.loaded) this.setState({ values: data.data, loaded: true })
      });
    var canshow = false;
    var id = this.state.result.includes("::") ? this.state.result.split("::")[1] : this.state.result
    var person = this.state.values.map(a => a[0]).indexOf(id);
    var index = (person > -1 ? Number(this.state.values[person][4]) : -1);
    if (this.state.loaded) canshow = true;
    let vac = [
        {'name': 'Sputnik V', 'sars': 'SARS-CoV-2 antigen vaccine', 'prod': 'Sputnik V', 'market': 'Gamaleya Research Institute'},
        {'name': 'Pfizer', 'sars': 'SARS-CoV-2 mRNA vaccine', 'prod': 'Comirnaty', 'market': 'Biontech Manufacturing GmbH'},
        {'name': 'Janssen', 'sars': 'SARS-CoV2 antigen vaccine', 'prod': 'COVID-19 Vaccine Janssen', 'market': 'Janssen-Cilag International'},
        {'name': 'Sinopharm', 'sars': 'Covid-19 vaccines', 'prod': 'BBIBP-CorV', 'market': 'China Sinopharm International Corp. - Beijing location'},
        {'name': 'AstraZeneca', 'sars': 'Covid-19 vaccines', 'prod': 'Vaxzevria', 'market': 'AstraZeneca AB'},
        {'name': 'Moderna', 'sars': 'SARS-CoV-2 mRNA vaccine', 'prod': 'COVID-19 Vaccine Moderna', 'market': 'Moderna Biotech Spain S.L.'},

        {'name': 'Moderna-Spikevax', 'sars': 'SARS-CoV-2 mRNA vaccine', 'prod': 'Spikevax', 'market': 'Moderna Biotech Spain S.L.'},
        {'name': 'Sputnik-Light', 'sars': 'covid-19 vaccines', 'prod': 'Sputnik-Light', 'market': 'Gamaleya Research Institute'},
        {'name': 'Vero-Cell', 'sars': 'covid-19 vaccines', 'prod': 'Inactivated SARS-CoV-2 Vero-Cell', 'market': 'Sinopharm Weiqida Europe Ph. - Prague location'},
        {'name': 'CoronaVac', 'sars': 'covid-19 vaccines', 'prod': 'CoronaVac', 'market': 'Sinovac Biotech'},
        {'name': 'Covaxin', 'sars': 'covid-19 vaccines', 'prod': 'Covaxin', 'market': 'Bharat Biotech'},
        {'name': 'Covishield', 'sars': 'covid-19 vaccines', 'prod': 'Covishield', 'market': 'Serum Institute Of India Private Limited'},
        {'name': 'Hayat-Vax', 'sars': 'covid-19 vaccines', 'prod': 'Hayat-Vax', 'market': 'Gulf Pharmaceutical Industries'},
        {'name': 'Abdala', 'sars': 'covid-19 vaccines', 'prod': 'Abdala', 'market': 'Center for Genetic Engineering and Biotechnology'},
        {'name': 'Convidecia', 'sars': 'covid-19 vaccines', 'prod': 'Convidecia', 'market': 'CanSino Biologics'},
        {'name': 'EpiVacCorona', 'sars': 'covid-19 vaccines', 'prod': 'EpiVacCorona', 'market': 'Vector Institute'},
    ];
    let countrycodes = {
      "Hungary":        "HU",
      "Czech Republic": "CZ",
      "Germany":        "DE",
      "Estonia":        "EE",
      "Spain":          "ES",
      "Ireland":        "IE",
      "Poland":         "PL",
      "Sweden":         "SE",
    }
    let countrycode = (person > -1 ? countrycodes[this.state.values[person][1]] : "")
    return (
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title className="text-center">
              <b>EU Digital COVID Certificate</b>
              <br /> <b>Vaccination Proof</b>
            </Card.Title>
          </Card.Header>
          {person > -1 ?
          <Card.Body>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-check-circle centered text-success" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
            <hr />
            <Container fluid>
              <Row>
                <Col sm={6} className="text-left"><b>Certificate Validity</b></Col>
                <Col sm={6} className="text-left text-success"><b>Valid</b></Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Name:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][2]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Date of birth:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][3]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Unique certificate identifier:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][0]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Disease or agent targeted:</b></Col>
                <Col sm={6} className="text-left">COVID-19</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>COVID-19 vaccine or prophylaxis:</b></Col>
                <Col sm={6} className="text-left">{vac[index]['sars']}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>COVID-19 vaccine product:</b></Col>
                <Col sm={6} className="text-left">{vac[index]['prod']}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>COVID-19 vaccine marketing authorisation holder or manufacturer:</b></Col>
                <Col sm={6} className="text-left">{vac[index]['market']}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Number in a series of doses - The overall number of doses in the series:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][5]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Date of vaccination:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][6]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Member State or third country in which the vaccine was administered:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][7]}</Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Certificate issuer:</b></Col>
                <Col sm={6} className="text-left">{this.state.values[person][8]}</Col>
              </Row>
            </Container>
          </Card.Body>
          :
          <Card.Body>
            {canshow ?
            <Container>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-octagon centered text-danger" viewBox="0 0 16 16">
              <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            <hr />
            <Container fluid>
              <Row>
                <Col sm={6} className="text-left"><b>Certificate Validity</b></Col>
                <Col sm={6} className="text-left text-danger"><b>Invalid</b></Col>
              </Row>
              <Row>
                <Col sm={6} className="text-left"><b>Description</b></Col>
                <Col sm={6} className="text-left">The following certificate cannot be validated as EU Digital COVID Certificate.</Col>
              </Row>
            </Container>
            </Container> : "" }
          </Card.Body>
          }
        </Card>

        <Card className="mt-4">
          {person > -1 ?
            <Card.Body className="col-12 col-md-6 mx-auto text-center">
              <Card className="bg-dark text-white d-flex">
                <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1599px-Flag_of_Europe.svg.png" alt="Card image" />
                <Card.ImgOverlay className="text-center d-flex flex-column justify-content-center">
                  <h1>{countrycode}</h1>
                </Card.ImgOverlay>
              </Card>
              <h2>{this.state.values[person][1]}</h2>
              <p>This certificate is not a travel document. The scientific evidence on COVID-19 vaccination, testing and recovery continues to evolve, also in view of new variants of concern of the virus. Before traveling, please check the applicable public health measures and related restrictions applied at the point of destination.</p>
              <p>Relevant information can be found here:</p>
              <a href="https://reopen.europa.eu/en">https://reopen.europa.eu/en</a>
            </Card.Body>
            :
            <Card.Body className="w-50 mx-auto text-center">
              {canshow ?
              <Container>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-triangle centered text-warning" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
              </svg>
              <p>Failed to get any information according to the provided code. Please check if the appropriate QR-Code was scanned!</p>
              <p>Relevant information can be found here:</p>
              <a href="https://reopen.europa.eu/en">https://reopen.europa.eu/en</a>
              </Container>:""}
            </Card.Body>
          }
        </Card>
      </Container>
    );
  }

  render() {
    return (
      <Container fluid className="m-0 p-0 bg-info">
        <Container fluid className="bg-light p-4">
          <img src={logo} alt="logo" />
        </Container>
        <br />
        {this.state.result === 'No result' ?
          <Container fluid className="p-10 m-10">
            <Card fluid>
              <Card.Header className="text-center">
                <h2>EUDCC Scanner</h2>
              </Card.Header>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%',padding: '10px' }}
              />
              <Card.Footer>
                <b>Which QR codes can you scan?</b> <br />
                Tests, Vaccination and Recovery certificates
              </Card.Footer>
            </Card>
            <br />
            <Card fluid>
              <Card.Body>
                <Card.Title>Certificate Verification</Card.Title>
                <Card.Text>
                  Third parties can use the Online Validation service to reliably determine whether the vaccination certificate, certificate of recovery, or test certificate is valid.
                </Card.Text>
                <Card.Text>
                  Please note that third parties in other countries may use different apps to verify the certificates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
          :
          <Container fluid>
            {this.loadInformation()}
          </Container>
        }
        <br />
        <Container fluid className="bg-light p-4">
          <Table borderless className="mx-auto">
            <tbody>
              <tr>
                <th className="vert"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg></th>
                <th className="vert"><h4>Országos Kórházi Főigazgatóság</h4></th>
              </tr>
              <tr>
                <th><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16"><path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/></svg></th>
                <th><h4>+36 1 950 1050</h4></th>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Container>
    )
  }
}

export default App;
