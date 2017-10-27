import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import {
    Dimensions
} from 'react-native';

import {
    HotelList,
} from "../../components";

const {width} = Dimensions.get('window');

const Container = styled.View`
  width: ${width};
  background-color: #E7E7E7;
  flex: 1;
`;

export default class Main extends PureComponent<{}> {

    render() {
        return (
            <Container>

                <HotelList
                    onPressItem={this._handleOnPressItem.bind(this)}
                />

            </Container>
        );
    }


    _handleOnPressItem = (item) => {
        console.log(`item: ${item.id}`);

        this.props.navigator.push({
            screen: 'HotelScreen',
            title: item.name,
            passProps: { hotel: item }
        });

    }
}