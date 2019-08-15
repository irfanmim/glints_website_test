import React from 'react'
import Navbar from './Navbar'
import HomeContent from './HomeContent'

class HomePage extends React.Component {
  render () {
    return (
      <div style={{backgroundColor: "#f0f2f5", height:"100vh"}}>
        <Navbar />
        <HomeContent />
      </div>
    )
  }
}

export default HomePage;
