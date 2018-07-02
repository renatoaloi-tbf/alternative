/* 
import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Dimensions, Platform } from 'react-native';
import { navigatorStyle } from '~/config';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');
export default class ModalIn62 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    alert("Modal closed");
                }}
            >
                <Text>Teste para modal!</Text>
            </Modal>
        )
    }
} */