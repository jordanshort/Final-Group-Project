import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterMenu extends Component{
    render(){
        return(
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="add" />
                        </Button>
                        <Button vertical >
                            <Icon name="calendar" onPress={() => this.props.openDrawer('footer')} />
                            <Text>Calendar</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.showMenuItem('showModal')}>
                            <Icon name="clipboard" />
                            <Text>Tasks</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.showMenuItem('showModal')} >
                            <Icon name="paper" />
                            <Text>WIP</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="navigate" />
                            <Text>Menu</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        )
    }
}

