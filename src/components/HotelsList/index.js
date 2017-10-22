import React, {PureComponent} from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import styled from 'styled-components/native';

import { Navigation } from 'react-native-navigation';

import * as api from '../../api';
import _ from 'lodash';

import HotelRow from '../HotelRow';


const {width} = Dimensions.get('window');

const Container = styled.View``;

const IndicatorContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default class HotelsList extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            offset: 0,
            limit: 30,
            loading: false,
            refreshing: false
        };
    }

    render() {
        return (
            <Container>
                <FlatList
                    key={'hotelsflatlist'}
                    style={{ width: width, paddingHorizontal: 8, paddingTop: 8 }}
                    data={this.state.hotels}
                    renderItem={({item}) => (
                        <HotelRow hotel={item} onPress={this._handleOnPressItem.bind(this)} />
                    )}
                    keyExtractor={(item, index) => item.id}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    refreshing={this.state.refreshing}
                    onRefresh={this._handleRefresh}
                    onEndReached={this._handleLoadMore}
                    onEndThreshold={this.state.limit}
                />
            </Container>
        )
    }

    componentDidMount() {
        this._fetchHotels();
    }


    /**
     * List methods
     * */
    _handleRefresh = () => this.setState({ refreshing: true }, () => this._fetchHotelsFromTop());

    _handleLoadMore = () => this._fetchHotelsFromBottom();

    _renderFooter = () => (<IndicatorContainer><ActivityIndicator animating={true} size={'small'} color={'#df6800'} /></IndicatorContainer>);


    _handleOnPressItem = (item) => {
        this.props.onPressItem(item);
    }


    /**
     * API methods
     * */
    _getQueryParams = (offset) => `?offset=${offset}&limit=${this.state.limit}`;

    _fetchHotels = () => {
        const query = this._getQueryParams(this.state.offset);
        api.fetchHotelsFromApi(query)
            .then(data => {
                const dataset = this._setHotels(null, data.hotels, this.state.hotels);
                this.setState({ hotels: dataset });
            })
            .catch(error => console.log(`_fetchHotels -> error: ${error}`));
    }

    _fetchHotelsFromTop = () => {
        const query = this._getQueryParams(this.state.offset);

        api.fetchHotelsFromApi(query)
            .then(data => {
                const dataset = this._setHotels('ADD_HOTEL_TO_TOP', data.hotels, this.state.hotels);
                this.setState({ hotels: dataset, refreshing: false });
            })
            .catch(error => console.log(`_fetchHotelsFromTop -> error: ${error}`));
    }

    _fetchHotelsFromBottom = () => {
        const offset = this.state.hotels ? this.state.hotels.length : 0;
        const query = this._getQueryParams(offset);

        api.fetchHotelsFromApi(query)
            .then(data => {
                const dataset = this._setHotels('ADD_HOTEL_TO_BOTTOM', data.hotels, this.state.hotels);
                this.setState({ hotels: dataset });
            })
            .catch(error => console.log(`_fetchHotelsFromBottom -> error: ${error}`));
    }

    _setHotels = (type, hotels, state) => {
        switch (type) {
            case 'ADD_HOTEL_TO_TOP':
                return _.uniqBy([...hotels, ...state], 'id');
                break;
            case 'ADD_HOTEL_TO_BOTTOM':
                return _.uniqBy([...state, ...hotels], 'id');
                break;
            default:
                return hotels;
        }
    }

}

