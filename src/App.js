import React, { Component } from 'react'
import {MapChart} from '@amcharts/amcharts4/core'
import Map from './Map/Map.js'
import VisitedList from './VisitedList/VisitedList'
import SearchBar from './SeachBar/SearchBar'
import './App.css'

class App extends Component {
  state = {
    visitedPrefectures: [],
  }

  handleSelect = (e) => {
      console.log('Target', e.target.dataItem.dataContext)
      console.log('state', this.state)
      const {id, name, jp_name} = e.target.dataItem.dataContext
      if(e.target.isActive) {
        const filterList = this.state.visitedPrefectures.filter((prefecture) => {
          return prefecture.id !== id
        })
        this.setState({
          visitedPrefectures: [...filterList]
        })
      } else {
        this.setState({
          visitedPrefectures: [...this.state.visitedPrefectures, { id, name, jp_name } ]
        })
      }
      e.target.isActive = !e.target.isActive
  }

  render() {

    return (
      <div className='App'>
        <div className='map-wrapper'>
          <div style={{flex:3}}>
            <Map
              onClick={this.handleSelect}
              setMapReference={this.setMapReference}
              visitedPrefectures={this.state.visitedPrefectures}
            />
          </div>
          <div style={{flex:1, marginTop: 12}}>
            <SearchBar />
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
