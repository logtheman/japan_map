import React from 'react'

function VisitItem({name, kanji}) {
  return (
    <div>{`${name} (${kanji})`}</div>
  )
}

export default VisitItem
