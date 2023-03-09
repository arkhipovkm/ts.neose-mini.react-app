import React, { useState } from 'react';
import type { FC } from 'react';
import { Col, message, Row, Switch, Typography } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const sendRequest = async (path: string) => {
  return fetch(`http://localhost:4567${path}`)
  .then((resp: Response) => {
      if (resp.ok) {
        return
      } else {
        throw resp.text()
      }
    })
}

const Main: FC = () => {

  const [ ledState, setLedState ] = useState(false)
  const [ lcsState, setLcsState ] = useState(false)
  const [ fanState, setFanState ] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  const switchLed = (checked: boolean) =>{
    console.log("Using LED state:", ledState)
    let path: string
    if (checked) {
      path = '/led/on'
    } else {
      path = '/led/off'
    }
    sendRequest(path)
    .then(() => {
      setLedState(checked)
    })
    .catch((e: Error) => {
      console.log(e)
      messageApi.error(e.message)
    })
  }

  const switchLcs = (checked: boolean)=>{
    let path: string
    if (checked) {
      path = '/lcs/on'
    } else {
      path = '/lcs/off'
    }
    sendRequest(path)
    .then(() => {
      setLcsState(checked)
    })
    .catch((e: Error) => {
      console.log(e)
      messageApi.error(e.message)
    })
  }

  const switchFan = (checked: boolean)=>{
    let path: string
    if (checked) {
      path = '/fan/on'
    } else {
      path = '/fan/off'
    }
    sendRequest(path)
    .then(() => {
      setFanState(checked)
    })
    .catch((e: Error) => {
      console.log(e)
      messageApi.error(e.message)
    })
  }

  return <>
  <Row justify="center" align='middle' style={{height: '100vh'}}>
    <Col xs={24} md={12}>
    <div className='paper'>
      <Typography.Title level={3}>Neose Mini Control Interface</Typography.Title>
        <Row justify='start'>
          <Col xs={8} className='col-with-margin' style={{textAlign: 'right'}}>
              <span style={{marginRight: '5px'}}>LED <i>(light)</i>:</span>
          </Col>
          <Col style={{textAlign: 'left'}}>
            <Switch checked={lcsState} onChange={(checked) => {switchLed(checked)}}></Switch>
          </Col>
        </Row>
        <Row justify='start'>
          <Col xs={8} className='col-with-margin' style={{textAlign: 'right'}}>
              <span style={{marginRight: '5px'}}>LCS <i>(polarizer)</i>:</span>
          </Col>
          <Col style={{textAlign: 'left'}}>
            <Switch checked={lcsState} onChange={(checked) => {switchLcs(checked)}}></Switch>
          </Col>
          <Col ><span style={{marginLeft: '5px'}}><i>Currently in <b>{lcsState ? "TM" : "TE"}</b> mode</i></span></Col>
        </Row>
        <Row justify='start'>
          <Col xs={8} className='col-with-margin' style={{textAlign: 'right'}}>
              <span style={{marginRight: '5px'}}>FAN <i>(cooling)</i>:</span>
          </Col>
          <Col style={{textAlign: 'left'}}>
            <Switch checked={lcsState} onChange={(checked) => {switchFan(checked)}}></Switch>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</>
}
const App: FC = () => (
  <div className="App">
    <Main/>
  </div>
);

export default App;