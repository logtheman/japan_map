import React, { Component } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_japanHigh from '@amcharts/amcharts4-geodata/japanHigh'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    // Create map instance
    const map = am4core.create('chartdiv', am4maps.MapChart)
    // Set map definition
    map.geodata = am4geodata_japanHigh
    // Set projection
    map.projection = new am4maps.projections.Miller()
    let polygonSeries = new am4maps.MapPolygonSeries()
    // Create map polygon series
    polygonSeries.useGeodata = true
    map.series.push(polygonSeries)

    polygonSeries.data = [
      {
        'id': 'JP-16',
        'name': 'Toyama',
        'jp_name': '富山',
        'trip': 'Dec 18',
      }
    ]

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name} ({jp_name} - {trip})'
    polygonTemplate.fill = am4core.color('#74B266')

    /* Create a gentle shadow for columns */
    console.log(polygonSeries)

    // Create default state
    const defaultState = polygonTemplate.states.create("default")
    const shadow = defaultState.filters.push(new am4core.DropShadowFilter)
    shadow.opacity = 0.0

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#367B25')
    let hoverShadow = hs.filters.push(new am4core.DropShadowFilter)
    hoverShadow.dx = 6
    hoverShadow.dy = 6
    hoverShadow.opacity = 0.3

    // Create active state
    const activeState = polygonTemplate.states.create("active")
    activeState.properties.fill = map.colors.getIndex(3).brighten(-0.5)

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", function(ev) {
      ev.target.isActive = !ev.target.isActive
    })

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
