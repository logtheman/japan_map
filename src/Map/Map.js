import React, { Component } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_japanHigh from '@amcharts/amcharts4-geodata/japanHigh'
import './Map.css'

class Map extends Component {
  componentDidMount() {
    // Create map instance
    const map = am4core.create('map', am4maps.MapChart)
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
    polygonTemplate.tooltipText = '{name} ({jp_name})'
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
    hoverShadow.dx = 3
    hoverShadow.dy = 3
    hoverShadow.opacity = 0.3

    // Create active state
    const activeState = polygonTemplate.states.create("active")
    activeState.properties.fill = map.colors.getIndex(3).brighten(-0.5)

    // Create an event to toggle "active" state
    console.log(this)
    polygonTemplate.events.on("hit", this.props.onClick)
  }

  render() {
    return (
      <div id='map' className='Map-large'/>
    )
  }
}

export default Map
