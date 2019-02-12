import React from 'react'
import { NavBar } from 'antd-mobile';

export default function headerTop(props) {


  return (
   	  <NavBar
      mode="light"
      style= {{fontWeight:'900'}}
    >{props.title}</NavBar>
  )
}