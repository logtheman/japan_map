import React, {Fragment} from 'react'
import VisitedItem from './VisitedItem'

function VisitedList({visitedLocations, listTitle}) {
  const visitedItemList = visitedLocations.map(item => <VisitedItem {...item}/>)

  return (
    <div>
      <h2>{listTitle}</h2>
      {visitedItemList}
    </div>
  )
}

export default VisitedList