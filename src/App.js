import React, { Component } from 'react'
import Map from './Map/Map.js'
import {findPropertiesByName} from './Map/dataMapping'
import VisitedList from './VisitedList/VisitedList'
import SearchBar from './SeachBar/SearchBar'
import './App.css'

class App extends Component {
  state = {
    visitedPrefectures: [],
    mapRef: undefined,
    polygonSeries: undefined,
    polygonTemplate: undefined,
  }

  setMapReferences = ({mapRef, polygonSeries, polygonTemplate}) => {
    this.setState({mapRef, polygonSeries, polygonTemplate})
  }

  handleSelectPrefecture = (e) => {
      const {id, name, kanji} = e.target.dataItem.dataContext
      console.log(e.target)
      if(e.target.isActive) {
        this.setState({
          visitedPrefectures: [...this.filterIdFromVisited(id)]
        })
      } else {
        this.setState({
          visitedPrefectures: [...this.state.visitedPrefectures, { id, name, kanji } ]
        })
      }
      e.target.isActive = !e.target.isActive
  }

  handleSelectLocation = (prefectureName) => {
    if (!prefectureName) return
    const mapData = findPropertiesByName(prefectureName)
    if (!mapData) return
    const {id, name, kanji} = mapData
    const selectedItem = this.state.polygonSeries.mapPolygons._values.filter(item => item.dataItem.dataContext.name === name)
    console.log('mapData', mapData)
    selectedItem[0].setState('active')
    this.setState({
      visitedPrefectures: [...this.filterIdFromVisited(id), { id, name, kanji } ]
    })
  }

  filterIdFromVisited = (id) => {
    return this.state.visitedPrefectures.filter((prefecture) => prefecture.id !== id)
  }

  render() {
    console.log(this.state)
    return (
      <div className='App'>
        <div className='map-wrapper'>
          <div style={{flex:3, paddingRight: 16, paddingLeft: 16}}>
            <Map
              onClick={this.handleSelectPrefecture}
              visitedPrefectures={this.state.visitedPrefectures}
              setMapReferences={this.setMapReferences}
            />
          </div>
          <div style={{flex:1, marginTop: 12, borderLeft: '2px solid lightgray'}}>
            <SearchBar 
              onSelect={this.handleSelectLocation}
            />
            <VisitedList
              visitedLocations={this.state.visitedPrefectures}
              listTitle='Visited Prefectures'
            />
          </div>

        </div>

      </div>
    )
  }
}

export default App
