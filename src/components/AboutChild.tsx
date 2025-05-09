import React from "react"

class AboutChild extends React.Component{

    constructor(props){
        super(props);
        console.log("Child constructor called!!");
        
    }

    componentDidMount(){
        console.log("Child Mounted!!");
        
    }

    componentDidUpdate(){
        console.log("Child updated!!");
        
      }
    
      componentWillUnmount(){
        console.log("Child unmounted!!!");
        
      }
      

    render(){
        console.log("Child rendered!!");
        
        return(
            <div>Child About</div>
        )
    }
}

export {AboutChild}