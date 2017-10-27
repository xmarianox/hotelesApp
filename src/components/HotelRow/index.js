import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';


const {width} = Dimensions.get('window');

const Row = styled.TouchableOpacity`
  width: ${width - 16};
  background-color: #FFFFFF;
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;
`;

const RowImage = styled.Image`
  width: ${width - 16};
  height: 200px;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const TitleContainer = styled.View`
  width: ${width - 132};
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

const PriceContainer = styled.View`
  margin-top: 0px;
  margin-bottom: auto;
`;

const PriceLabel = styled.Text`
  font-size: 11px;
  line-height: 17px;
`;

const PriceValue = styled.Text`
  font-size: 15px;
  color: #FDBA12;
  margin-top: 6px;
`;


export default class HotelRow extends PureComponent {

    render() {

        const image_url = `https:${this.props.hotel.image}`;

        return (
            <Row onPress={() => this.props.onPress(this.props.hotel)}>
                <RowImage
                    source={{ uri: image_url }}
                    resizeMode={'cover'}
                />

                <Footer>
                    <TitleContainer>
                        <Title>{this.props.hotel.name}</Title>

                        <StarContainer>
                            { this._renderStars() }
                        </StarContainer>
                    </TitleContainer>

                    <PriceContainer>
                        <PriceLabel>Precio Por Noche</PriceLabel>
                        <PriceValue>{this.props.hotel.price.code} {this.props.hotel.price.amount}</PriceValue>
                    </PriceContainer>
                </Footer>
            </Row>
        )
    }

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

