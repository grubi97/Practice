import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../app/layouts/LoadingComponents'

export default function HomePage() {

    return (
      <Segment inverted textAlign='center' vertical className='masthead'>

          <Container text>
            <Header as='h1' inverted>

                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom:12}}/>
                REactivities
            </Header>

            <Header as='h2' inverted content='Welcome to Reactivities'/>
            <Button as={Link} to='/activities' size='huge' inverted>Dashboard</Button>

          </Container>
      </Segment>
    )
}