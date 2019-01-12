/*global google*/
import React, {PureComponent} from 'react'
import Geosuggest from 'react-geosuggest'
import './geosuggest.css'

class SearchInput extends PureComponent {
  onSuggestSelect = (suggest) => {
    console.log(suggest)
    if (!suggest) return
    const {gmaps: {address_components: components}} = suggest
    const result = components.filter(component => {
      const {short_name} = component
      if(!short_name) return false
      return this.parsePrefecture(short_name)
    })
    if (result.length === 0) return
    this._geoSuggest.clear()
    this.props.onSelect(result[0].short_name)
  }

  parsePrefecture = (shortName => {
    // Standard cases
    if(shortName.includes('Prefecture') || shortName.includes('-ken')) { return true }
    // Tokyo special case
    if(shortName === 'Tokyo' || shortName === 'Tōkyō-to') { return true }
    // Kyoto special case
    if(shortName === 'Kyoto' || shortName === 'Kyōto-fu') { return true }
    // Hokkaido special case
    if(shortName === 'Hokkaido') { return true }
    return false
  })

  japanCountrycheck = (components) => {
    if (!components) return false
    components.map(component => component.type.includes('country') && component.short_name === 'JP')
  }

  render() {
    return (
      <Geosuggest 
        ref={el=>this._geoSuggest=el}
        placeholder="Add a place you've been!"
        onSuggestSelect={this.onSuggestSelect}
        location={new google.maps.LatLng(35.6693076,139.6711697)}
        radius="400"
        country='JP'
        // ignoreTab={true}
      />
    )
  }
 }

 export default SearchInput