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
      return (short_name.includes('Prefecture') || short_name === 'Tokyo' || short_name === 'Hokkaido' || short_name === "Kyoto" )
    })
    if (result.length === 0) return
    
    this.props.onSelect(result[0].short_name)
  }

  render() {
    return (
      <Geosuggest 
        onSuggestSelect={this.onSuggestSelect}
      />
      // <Geosuggest
      //   ref={el=>this._geoSuggest=el}
      //   placeholder="Start typing!"
      //   initialValue="Tokyo"
      //   // fixtures={fixtures}
      //   onSuggestSelect={this.onSuggestSelect}
      //   // location={new google.maps.LatLng(35.6868977, 139.7475873)}?
      //   radius="20" 
      // />
    )
  }
 }

 export default SearchInput