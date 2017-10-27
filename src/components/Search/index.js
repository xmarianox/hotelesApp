import React, {PureComponent} from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const {width} = Dimensions.get('window');

const SearchContainer = styled.View`
  width: ${width - 16};
  padding-left: 8px;
  padding-right: 8px;
  margin: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-radius: 4px;
  overflow: hidden;
`;

const SearchInput = styled.TextInput`
  width: ${width - 52};
  height: 40px;
  color: #000000;
`;

export default class HotelsSearch extends PureComponent {

    render() {
        return (
            <SearchContainer>
                <SearchInput
                    onChangeText={(text) => this.props.searchText(text)}
                    value={this.props.value}
                    autoCorrect={false}
                    onSubmitEditing={() => this.props.onSubmit()}
                />

                {this._renderIcon()}
            </SearchContainer>
        )
    }


    _renderIcon = () => (<Icon name="ios-search" color="#FDBA12" size={22}/>);

}