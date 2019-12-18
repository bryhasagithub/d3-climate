import React from 'react'
import { mean, sum } from 'd3-array'

export default (props) => {
  console.log('props.filteredData.',props.allData)

  const filteredLength = props.filteredData.length
  let allSales = mean(props.allData.map(d => sum(d.data)))
  allSales = Math.floor(allSales * 100)/100
  let filteredSales = mean(props.filteredData.map(d => sum(d.data)))
  filteredSales = Math.floor(filteredSales * 100)/100

  return <div>
    <h1><span>Stats: </span>
      <span>{filteredLength} countries - </span>
      <span>Average: </span>
      <span>{filteredSales} ({allSales})</span>
    </h1>
  </div>
}