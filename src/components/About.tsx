import React,{Component} from 'react'
import { AboutChild } from './AboutChild';
import { UserContext } from '../common/utils/UserContext';

class About extends Component{
  
  state =  {
    count:0
  };

  intervalId!: number;

  buttonRef:any = React.createRef()
  
  constructor(props: any){
    super(props);
    
    console.log("Parent constructor called!!");
    this.updateCount = this.updateCount.bind(this);

  }

  componentDidMount(){
    console.log("Parent mounted!!");
    
    this.intervalId = setInterval(()=>{
      console.log("parent interval!!");
      
    },3000);
    
  }

  componentDidUpdate(){
    console.log("Parent updated!!");
    
  }

  componentWillUnmount(){
    console.log("Parent unmounted!!!");
    clearInterval(this.intervalId);
    this.buttonRef?.current?.removeEventListener('click',()=>{})
  }

  updateCount(){
    
   

    this.setState({count:this.state.count+1})
  }

  render(){

    console.log("Parent rendered!!");
    
    return(
      <div>
        <UserContext.Consumer>
          {(data) => <div>{data.loggedInUser}</div>}
        </UserContext.Consumer>
        <button ref={this.buttonRef} onClick={this.updateCount}>Click me</button>
        <AboutChild/>
      </div>
    )
  }
}

export {About}
