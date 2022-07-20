import React, { Component, useState, useEffect } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import styled from 'styled-components';

const StyledInputLocalisation = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    .location-search-input{
        height:100%;
        width: 100%;
    }

`

const InputLocalisation = (props) => {

    const [address, setAddress] = useState("");


    const handleChange = (address) => {
        setAddress(address)
      };
     
    const handleSelect = (address) => {
        setAddress(address)
        geocodeByAddress(address)
          .then(results =>
            getLatLng(results[0])
            .then(latLng => {
                props.setLatitude(latLng.lat)
                props.setLongitude(latLng.lng)
                props.setZoom(12)
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error))
          )
      };

    return ( 
        <StyledInputLocalisation>
            <PlacesAutocomplete
                    className="address"
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="address">
                        <input
                        {...getInputProps({
                            placeholder: 'Cherchez une localisation',
                            className: 'location-search-input',
                        })}
                        />
                        <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    )}
            </PlacesAutocomplete>
        </StyledInputLocalisation>
     );
}
 
export default InputLocalisation;