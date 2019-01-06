import React from 'react'

function VisitItem({name, jp_name}) {
  return (
    <div>{`${name} (${jp_name})`}</div>
  )
}

export default VisitItem
