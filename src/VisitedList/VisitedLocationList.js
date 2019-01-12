import React from 'react'
import VisitLocation from './VisitedLocation'

function VisitedLocationList({listItems, listTitle}) {
  const visitedLoctionList = listItems.map(item => <VisitLocation key={item.placeId} {...item}/>)
  if(visitedLoctionList.length < 1) return (<div/>)
  return (
    <div>
      <h2>{listTitle}</h2>
      {visitedLoctionList}
    </div>
  )
}

export default VisitedLocationList
