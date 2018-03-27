import React, { Component } from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, View } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons'
import IconE from 'react-native-vector-icons/Entypo'
import IconF from 'react-native-vector-icons/Feather'


export default class ModalExample extends Component {
    state = {
        modalVisible: false,
        red: false,
        orange: false,
        green: false,
        yellow: false,
        blue: false,
        pink: false,
        name: '',
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { LabelPadding, headerText, colorMargin, buttonStyle } = styles
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Header style={{ backgroundColor: '#00aeef' }}>
                        <Left>
                            <Button transparent>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <IconI name='ios-close' size={30} color={'#fff'} />
                                </TouchableHighlight>
                            </Button>
                        </Left>
                        <Text style={headerText}>Label</Text>
                        <Right>
                            <Button transparent>
                                <IconE name='dots-three-horizontal' size={20} color={'#fff'} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        {/* <Item disabled style={colorMargin}>
                            <Input onChangeText={(description) => this.setState({ description })} style={{ height: 35, backgroundColor: 'black' }} ></Input>
                        </Item> */}
                        <Content>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'red', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({red:!this.state.red})}>{this.state.red ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'orange', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({orange:!this.state.orange})}>{this.state.orange ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'green', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({green:!this.state.green})}>{this.state.green ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'yellow', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({yellow:!this.state.yellow})}>{this.state.yellow ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'blue', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({blue:!this.state.blue})}>{this.state.blue ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                            <Button block style={{lineHeight:30, width:300, margin:5, backgroundColor:'pink', justifyContent:'flex-end', paddingRight:15}} onPress={(e)=>this.setState({pink:!this.state.pink})}>{this.state.pink ? <IconF name='check' size={25} style={{color:'#fff'}}/>: null }</Button>
                        </Content>
                    </Content>

                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={LabelPadding}>Label...</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = ({
    LabelPadding: {
        paddingTop: 10,
        height: 35,
        marginLeft: 5,
        color: '#C7C7CD'
    },
    headerText: {
        color: '#fff',
        paddingTop: 13
    },
    colorMargin: {
        marginTop: 5
    },
    buttonStyle:{
        lineHeight:30,
        width:300,
        margin:5
    }
})