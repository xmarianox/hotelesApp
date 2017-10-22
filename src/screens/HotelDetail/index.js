import React, { PureComponent } from 'react';
import { Dimensions, View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';


const pinIcon = require('../../assets/hotel.png');

const {width} = Dimensions.get('window');

const Container = styled.View`
  width: ${width};
  padding: 8px;
  background-color: #E7E7E7;
  flex: 1;
`;

const HotelContainer = styled.View`
  width: ${width - 16};
  background-color: #FFFFFF;
  border-radius: 6px;
  overflow: hidden;
`;

const Header = styled.View`
  width: ${width - 16};
  padding: 8px;
`;

const Title = styled.Text`
  font-size: 15px;
  line-height: 17px;
  font-weight: bold;
`;

const StarContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding-top: 6px;
  
`;

const MapContainer = styled.View`
  width: ${width - 16};
  height: 250px;
  align-items: center;
  justify-content: flex-end;
`;


const ASPECT_RATIO = width / 250;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0021; //LATITUDE_DELTA * ASPECT_RATIO;

export default class HotelDetail extends PureComponent<{}> {

    constructor(props) {
        super(props);

        this.state = {
            // coordinate: new Animated.Region({
            //     latitude: this.props.hotel.position[0],
            //     longitude: this.props.hotel.position[1],
            // }),
        }
    }

    render() {
        return (
            <Container>
                <HotelContainer>
                    <Header>
                        <Title>{this.props.hotel.name}</Title>

                        <StarContainer>
                            { this._renderStars() }
                        </StarContainer>
                    </Header>

                    <MapContainer>
                        <MapView
                            style={{ ...StyleSheet.absoluteFillObject }}
                            region={{
                                latitude: this.props.hotel.position[0],
                                longitude: this.props.hotel.position[1],
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                        >
                            <MapView.Marker.Animated
                                title={this.props.hotel.name}
                                pinColor="#002C77"
                                image={pinIcon}
                                coordinate={{ latitude: parseFloat(this.props.hotel.position[0]), longitude: parseFloat(this.props.hotel.position[1]) }}
                            />
                        </MapView>
                    </MapContainer>

                </HotelContainer>

            </Container>
        );
    }


    // _animate = () => {
    //     const { coordinate } = this.state;
    //
    //     coordinate.timing({
    //         latitude: this.props.hotel.position[0] + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
    //         longitude: this.props.hotel.position[1] + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2))
    //     }).start();
    // }

    _renderStars = () => {
        const stars = this.props.hotel.stars;

        let icons = [];

        for (var i = 0; i < stars; i++) {
            icons.push(this._renderIcon(i));
        }

        return icons;
    }

    _renderIcon = (key) => (<Icon name="ios-star" color="#FDBA12" size={22} key={key} />);
}