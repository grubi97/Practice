import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'



export default function Navbar(){
return(

    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to='/' exact header>
                <img src="/assets/logo.png" alt="logo"/>Slike
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' exact name='Activities'/>
            <Menu.Item>
                <Button as={NavLink} to='/createActivity' exact  positive content='Create activity'/>
            </Menu.Item>
        </Container>
    </Menu>
)

}