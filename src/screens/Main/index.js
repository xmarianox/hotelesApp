import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import {
    Dimensions
} from 'react-native';

import {
    HotelList,
    Search
} from "../../components";

const {width} = Dimensions.get('window');

const Container = styled.View`
  width: ${width};
  background-color: #E7E7E7;
  flex: 1;
`;

export default class Main extends PureComponent<{}> {

    constructor(props) {
        super(props);

        this.state = {
            search_query: ''
        }
    }

    render() {
        return (
            <Container>

                <Search
                    searchText={this._handleSearchText.bind(this)}
                    value={this.state.search_query}
                />

                <HotelList
                    onPressItem={this._handleOnPressItem.bind(this)}
                    searchQuery={this.state.search_query}
                />

            </Container>
        );
    }

    _handleSearchText = (text) => {
        this.setState({ search_query: text});
    };

    _handleOnPressItem = (item) => {
        console.log(`item: ${item.id}`);

        this.props.navigator.push({
            screen: 'HotelScreen',
            title: item.name,
            passProps: { hotel: item }
        });

    }
}