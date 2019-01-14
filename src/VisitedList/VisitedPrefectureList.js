import React from 'react'
import VisitedPrefecture from './VisitedPrefecture'

function VisitedPrefectureList({listItems, listTitle}) {
  const visitedPrefectureList = listItems.map(item => <VisitedPrefecture key={item.name} {...item}/>)
  if(visitedPrefectureList.length < 1) return (<div/>)
  return (
    <div>
      <h2>{`${listTitle} (${visitedPrefectureList.length}/47)`}</h2>
      {visitedPrefectureList}
    </div>
  )
}

export default VisitedPrefectureList
