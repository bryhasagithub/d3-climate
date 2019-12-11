import React, { Component } from 'react'
import './App.css'
import WorldMap from './Components/WorldMap'
import BarChart from './Components/BarChart'
import worlddata from './Components/world.js'
import StreamGraph from './Components/StreamGraph'
import Brush from './Components/Brush'
import StatLine from './Components/StatLine'
import { range } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import { geoCentroid } from 'd3-geo'

const appdata = worlddata.features.filter(d => geoCentroid(d)[0] < -20)

appdata.forEach((d,i) => {
    const offset = Math.random()
    d.x_axis = i
    d.data = range(30).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
    console.log('data',d.data)
    console.log('x_axis',d.x_axis)
    console.log('d',d)
  })

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {
  constructor(props){
    super(props)
    this.onResize = this.onResize.bind(this)
    this.onHover = this.onHover.bind(this)
    this.onBrush = this.onBrush.bind(this)
    this.state = { screenWidth: 1000, screenHeight: 500, hover: "none", brushExtent: [0,40] }

  }

  onResize() {
    this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
  }

  onHover(d) {
    this.setState({ hover: d.id })
  }

  onBrush(d) {
    this.setState({ brushExtent: d })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  render() {
    const filteredAppdata = appdata.filter((d,i) => d.x_axis >= this.state.brushExtent[0] && d.x_axis <= this.state.brushExtent[1])
    return (
      <div className="App">
        <div className="App-header">
          <h2>D3 Climate Dashboard</h2>
        </div>
        <div>
          <StatLine allData={appdata} filteredData={filteredAppdata} />
            <p>Using this x-axis of values, highlight a section to view stats on that particular subset.</p>
          <Brush changeBrush={this.onBrush} size={[this.state.screenWidth, 50]} />
          <StreamGraph hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} size={[this.state.screenWidth, this.state.screenHeight / 2]} />
          <WorldMap hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} size={[this.state.screenWidth / 2, this.state.screenHeight / 2]} />
          <BarChart hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} size={[this.state.screenWidth / 2, this.state.screenHeight / 2]} />
        </div>
      </div>
    )
  }
}

export default App