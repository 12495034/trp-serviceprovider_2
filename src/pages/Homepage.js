import React from 'react'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import StatisticElement from '../components/StatisticElement'
import { Container, Row, Col } from 'react-bootstrap'
import { UserAuth } from '../context/AuthContext'
import { MdDone, MdOutlinePersonOff, MdOutlineGroups,} from "react-icons/md";
import {FaDoorOpen, FaDoorClosed} from 'react-icons/fa'


//TODO: Add footer
export default function Homepage() {
  const { user } = UserAuth()

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <Row className='page-content-text'>
          <div className="Home-message">
            <h1>Welcome {user.email}</h1>
            <h5>to the Rapid HIV & syphillis clinic management portal  </h5>
            {/* <p>Statistics shown below shall be pulled from an online database and dynamically rendered</p> */}
          </div>
        </Row>

        <Row md={1} sm={1} xs={1} className='page-content-cards'>
          <Col  className='Statistic-card-container'>
          <StatisticElement icon=<FaDoorOpen size={30} color='purple'/> title="" number="1" description="Number of open clinics" />
            <StatisticElement icon=<FaDoorClosed size={30} color='purple'/> title="" number="4" description="Total count of Clinics held to date" />
            <StatisticElement icon=<MdDone size={30} color='green'/> title="" number="30" description="Total count of tests administered" />
            <StatisticElement icon=<MdOutlinePersonOff size={30} color='red'/> title="" number="5" description="Total count of missed appointments" />
            <StatisticElement icon=<MdOutlineGroups size={30} color='orange' /> title="" number="2" description="Average Queue size per clinic" />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
